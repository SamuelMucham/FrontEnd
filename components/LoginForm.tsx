"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface Props {
  onSend: (email: string, password: string) => Promise<void | string>;
}

export default function LoginForm({ onSend }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubimit() {
    const response = await onSend(email, password);

    if (response) {
      alert(response);
      return;
    }
    router.push("/");
  }

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        className="w-full border border-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className=" flex h-12 w-full items-center justify-center text-4xl font-bold gap-12 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5 cursor-pointer hover:opacity-80"
        onClick={handleSubimit}
      >
        Entrar
      </button>
    </div>
  );
}
