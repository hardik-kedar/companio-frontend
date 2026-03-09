"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { socket } from "@/lib/socket";

interface Message {
  _id: string;
  sender: string;
  text: string;
  conversation: string;
  createdAt: string;
  isRead: boolean;
}

interface User {
  _id: string;
  name: string;
}

export default function ChatPage() {

  const params = useParams();
  const conversationId =
    params?.conversation as string | undefined;

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [input, setInput] =
    useState("");

  const [userId, setUserId] =
    useState("");

  const [otherUser, setOtherUser] =
    useState<User | null>(null);

  const [chatAllowed, setChatAllowed] =
    useState(true);

  const [onlineUsers, setOnlineUsers] =
    useState<string[]>([]);

  const [lastSeenMap, setLastSeenMap] =
    useState<Record<string,string>>({});

  const [loading, setLoading] =
    useState(true);

  const bottomRef =
    useRef<HTMLDivElement>(null);


  /*
  ============================
  LOAD CURRENT USER
  ============================
  */
  useEffect(() => {

    const loadUser = async () => {

      try {

        const res =
          await apiFetch("/api/users/me");

        const data =
          await res.json();

        setUserId(data._id);

      }
      catch {

        console.error("Users load failed");

      }

    };

    loadUser();

  }, []);


  /*
  ============================
  LOAD CONVERSATION
  ============================
  */
  useEffect(() => {

    if (!conversationId || !userId) return;

    const loadConversation = async () => {

      try {

        const res =
          await apiFetch(`/api/conversations/${conversationId}`);

        const data =
          await res.json();

        if (!data?.conversation) return;

        const conversation =
          data.conversation;

        const other =
          conversation.renter._id === userId
            ? conversation.companion
            : conversation.renter;

        setOtherUser(other);

      }
      catch {

        console.error("Conversation load failed");

      }

    };

    loadConversation();

  }, [conversationId, userId]);


  /*
  ============================
  LOAD MESSAGES
  ============================
  */
  useEffect(() => {

    if (!conversationId) return;

    const loadMessages = async () => {

      try {

        await apiFetch(
          `/api/messages/read/${conversationId}`,
          { method: "PATCH" }
        );

        const res =
          await apiFetch(`/api/messages/${conversationId}`);

        if (res.status === 403) {

          setChatAllowed(false);
          return;

        }

        const data =
          await res.json();

        setMessages(data.messages || []);
        setChatAllowed(true);

      }
      catch {

        setChatAllowed(false);

      }
      finally {

        setLoading(false);

      }

    };

    loadMessages();

  }, [conversationId]);


  /*
  ============================
  JOIN SOCKET ROOM
  ============================
  */
  useEffect(() => {

    if (!conversationId) return;

    socket.emit(
      "join_conversation",
      conversationId
    );

  }, [conversationId]);


  /*
  ============================
  RECEIVE SOCKET MESSAGE
  ============================
  */
  useEffect(() => {

    const handler = (message: Message) => {

      if (message.conversation !== conversationId)
        return;

      setMessages(prev => {

        const exists =
          prev.find(m => m._id === message._id);

        if (exists) return prev;

        return [...prev, message];

      });

    };

    socket.on("receive_message", handler);

    return () => {

      socket.off("receive_message", handler);

    };

  }, [conversationId]);


  /*
  ============================
  ONLINE STATUS
  ============================
  */
  useEffect(() => {

    socket.on("user_online", ({ userId }) => {

      setOnlineUsers(prev =>
        [...new Set([...prev, userId])]
      );

    });

    socket.on("user_offline", ({ userId, lastSeen }) => {

      setOnlineUsers(prev =>
        prev.filter(id => id !== userId)
      );

      setLastSeenMap(prev => ({
        ...prev,
        [userId]: lastSeen
      }));

    });

    return () => {

      socket.off("user_online");
      socket.off("user_offline");

    };

  }, []);


  /*
  ============================
  AUTO SCROLL
  ============================
  */
  useEffect(() => {

    setTimeout(() => {

      bottomRef.current?.scrollIntoView({
        behavior: "smooth"
      });

    }, 50);

  }, [messages]);


  /*
  ============================
  SEND MESSAGE
  ============================
  */
  const sendMessage = async () => {

    if (!input.trim()) return;

    try {

      const res =
        await apiFetch(
          "/api/messages/send",
          {
            method: "POST",
            body: JSON.stringify({
              conversationId,
              text: input
            })
          }
        );

      const data =
        await res.json();

      setMessages(prev => {

        const exists =
          prev.find(m => m._id === data.message._id);

        if (exists) return prev;

        return [...prev, data.message];

      });

      setInput("");

    }
    catch {

      alert("Failed to send message");

    }

  };


  /*
  ============================
  LOADING
  ============================
  */
  if (loading) {

    return (
      <div className="p-6">
        Loading chat...
      </div>
    );

  }


  /*
  ============================
  CHAT BLOCKED
  ============================
  */
  if (!chatAllowed) {

    return (
      <div className="p-6 text-red-500">
        Chat unavailable for this booking.
      </div>
    );

  }


  /*
  ============================
  UI
  ============================
  */
  return (

    <div className="max-w-2xl mx-auto p-6">

      {/* HEADER */}

      {otherUser && (

        <div className="border rounded-xl p-4 mb-4 bg-white">

          <div className="font-semibold">
            {otherUser.name}
          </div>

          {onlineUsers.includes(otherUser._id)
            ? (
              <div className="text-green-500 text-xs">
                Online
              </div>
            )
            : (
              <div className="text-gray-400 text-xs">
                Last seen {
                  lastSeenMap[otherUser._id]
                    ? new Date(
                        lastSeenMap[otherUser._id]
                      ).toLocaleTimeString()
                    : "recently"
                }
              </div>
            )}

        </div>

      )}


      {/* CHAT MESSAGES */}

      <div className="h-[calc(100vh-200px)] overflow-y-auto border rounded-xl p-4 mb-4 bg-white space-y-2">

{messages.map((m, index) => {

  const isMine = m.sender === userId;

  return (

    <div
      key={m._id || `${m.sender}-${m.createdAt}-${index}`}
      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
    >

      <div
        className={`
          max-w-xs px-4 py-2 rounded-2xl text-sm
          ${isMine
            ? "bg-black text-white"
            : "bg-gray-200 text-black"}
        `}
      >

        <div>{m.text}</div>

        <div className="flex justify-end mt-1 text-[10px] opacity-70">

          {m.createdAt
  ? new Date(m.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  : ""}

        </div>

      </div>

    </div>

  );

})}

        <div ref={bottomRef} />

      </div>


      {/* MESSAGE INPUT */}

      <div className="flex gap-2">

        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter")
              sendMessage();

          }}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-4 py-2"
        />

        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="bg-black text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Send
        </button>

      </div>

    </div>

  );

}