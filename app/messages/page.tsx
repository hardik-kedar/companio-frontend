"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { socket } from "@/lib/socket";

/*
====================================
TYPES
====================================
*/

interface Conversation {
  _id: string;

  booking?: string;

  otherUser: {
    _id: string;
    name: string;
  };

  lastMessage?: string;

  lastMessageAt?: string;

  updatedAt?: string;

  unreadCount?: number;
}

/*
====================================
COMPONENT
====================================
*/

export default function MessagesHome() {

  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [userId, setUserId] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  /*
  ==================================
  LOAD CURRENT USER
  ==================================
  */

  useEffect(() => {

    const loadUser = async () => {

      try {

        const res =
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/me`, {
  credentials: "include"
});

        const data =
          await res.json();

        setUserId(data._id);

      }
      catch {

        console.error(
          "Failed to load user"
        );

      }

    };

    loadUser();

  }, []);


  /*
  ==================================
  LOAD CONVERSATIONS
  ==================================
  */

  useEffect(() => {

    const loadConversations =
      async () => {

        try {

          const res =
            await apiFetch(
              "/api/conversations"
            );

          const data =
            await res.json();

          setConversations(
            data.conversations || []
          );

        }
        catch {

          console.error(
            "Failed to load conversations"
          );

        }
        finally {

          setLoading(false);

        }

      };

    loadConversations();

  }, []);


  /*
  ==================================
  SOCKET: RECEIVE MESSAGE
  ==================================
  */

  useEffect(() => {

    const handleNewMessage =
      (message: any) => {

        setConversations(prev => {

          const updated =
            prev.map(c => {

              if (
                c._id ===
                message.conversation
              ) {

                const isIncoming =
                  message.sender !==
                  userId;

                return {

                  ...c,

                  lastMessage:
                    message.text,

                  updatedAt:
                    new Date().toISOString(),

                  unreadCount:
                    isIncoming
                      ? (c.unreadCount || 0) + 1
                      : c.unreadCount

                };

              }

              return c;

            });

          /*
          SORT CONVERSATIONS
          */

          updated.sort(
            (a, b) =>
              new Date(
                b.updatedAt ||
                b.lastMessageAt ||
                0
              ).getTime()
              -
              new Date(
                a.updatedAt ||
                a.lastMessageAt ||
                0
              ).getTime()
          );

          return [...updated];

        });

      };

    socket.on(
      "receive_message",
      handleNewMessage
    );

    return () => {

      socket.off(
        "receive_message",
        handleNewMessage
      );

    };

  }, [userId]);


  /*
  ==================================
  JOIN SOCKET ROOMS
  ==================================
  */

  useEffect(() => {

    if (!conversations.length)
      return;

    conversations.forEach(c => {

      socket.emit(
        "join_conversation",
        c._id
      );

    });

  }, [conversations]);


  /*
  ==================================
  UI
  ==================================
  */

  if (loading) {

    return (
      <div className="p-6">
        Loading conversations...
      </div>
    );

  }

  return (

    <div className="max-w-xl mx-auto p-6 pt-18">

      <h1 className="text-2xl font-semibold mb-6">
        Messages
      </h1>


      {conversations.length === 0 && (

        <div className="text-gray-500">
          No conversations yet
        </div>

      )}


      {conversations.map(c => {

        const other =
          c.otherUser || {
            _id: "",
            name: "User"
          };

        return (

          <Link
            key={c._id}
            href={`/messages/${c._id}`}
          >

            <div
              className="
              border
              rounded-xl
              p-4
              mb-3
              hover:bg-gray-50
              cursor-pointer
              transition
            "
            >

              {/* NAME + UNREAD */}

              <div className="flex justify-between items-center">

                <div className="font-semibold">
                  {other.name}
                </div>

                {c.unreadCount &&
                  c.unreadCount > 0 && (

                  <span
                    className="
                    bg-red-500
                    text-white
                    text-xs
                    px-2
                    py-1
                    rounded-full
                  "
                  >
                    {c.unreadCount}
                  </span>

                )}

              </div>


              {/* LAST MESSAGE */}

              <div className="text-sm text-gray-500 truncate">

                {c.lastMessage ||
                  "Start conversation"}

              </div>


              {/* TIME */}

              <div className="text-xs text-gray-400 mt-1">

                {c.updatedAt
                  ? new Date(
                      c.updatedAt
                    ).toLocaleString()
                  : ""}

              </div>

            </div>

          </Link>

        );

      })}

    </div>

  );

}