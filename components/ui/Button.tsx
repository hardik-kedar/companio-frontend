"use client";

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled
}: any) {

  const base =
    "px-5 py-2 rounded-lg text-sm font-medium transition";

  const styles: any = {
    primary:
      "bg-primary text-white hover:opacity-90",

    secondary:
      "border border-gray-300 hover:bg-gray-50",

    danger:
      "bg-red-500 text-white hover:bg-red-600"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant]} disabled:opacity-50`}
    >
      {children}
    </button>
  );
}