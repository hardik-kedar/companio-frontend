"use client";

export default function PageContainer({ children }: any) {
  return (
    <div className="max-w-5xl mx-auto px-6 mt-28 pb-24">
      {children}
    </div>
  );
}