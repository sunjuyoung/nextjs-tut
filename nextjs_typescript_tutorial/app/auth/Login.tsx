"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  return (
    <li className="list-none">
      <button
        onClick={() => signIn()}
        className="text-sm bg-gray-700 rounded text-white py-2 px-3"
      >
        Sign in
      </button>
    </li>
  );
}
