"use client";
import { useState } from "react";
import { creatreAluno } from "./actions";
import { useRouter } from "next/navigation";

export default function AlunoCadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await creatreAluno({
      nome,
      idade: Number(idade),
      cpf : Number(cpf),
      email,
    });
    if (!response) {
      setNome("");
      setIdade("");
      setCpf("");
      setEmail("");
      router.push("/alunos");
      return;
    }
    alert(response);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-300 to-red-1000">
      <div className="relative perspective-[1000px] w-[260px] group">
        <div
          className="
          relative w-full h-[80px]
          bg-gradient-to-br from-[#ff3366] to-[#ff6b35]
          border-4 border-black
          shadow-[8px_8px_0_#000,16px_16px_0_rgba(255,51,102,0.3)]
          cursor-pointer overflow-hidden
          transition-all duration-500
          [transform-style:preserve-3d]

          group-hover:h-[360px]
          group-hover:translate-z-[20px]
          group-hover:rotate-x-[5deg]
          group-hover:-rotate-y-[5deg]
        "
        >
          <div className="absolute top-0 left-0 w-full h-[80px] flex items-center justify-center">
            <span
              className="
              text-black font-extrabold text-[16px]
              uppercase tracking-[2px]
              transition-all duration-300
              group-hover:opacity-0
              group-hover:-translate-y-6
            "
            >
              Cadastro de Aluno
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="
              absolute top-0 left-0 w-full h-full
              flex flex-col items-center justify-center
              p-4 gap-3
              opacity-0 scale-75 translate-y-6
              transition-all duration-500
              group-hover:opacity-100
              group-hover:scale-100
              group-hover:translate-y-0
            "
          >
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="
                w-full px-3 py-2
                bg-white/80 border-[3px] border-black
                font-bold text-black
                shadow-[4px_4px_0_#000]
                focus:outline-none
                focus:translate-x-[2px] focus:translate-y-[2px]
                focus:shadow-[2px_2px_0_#000]
              "
            />

            <input
              type="number"
              placeholder="Idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              className="
                w-full px-3 py-2
                bg-white/80 border-[3px] border-black
                font-bold text-black
                shadow-[4px_4px_0_#000]
                focus:outline-none
                focus:translate-x-[2px] focus:translate-y-[2px]
                focus:shadow-[2px_2px_0_#000]
              "
            />

            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="
                w-full px-3 py-2
                bg-white/80 border-[3px] border-black
                font-bold text-black
                shadow-[4px_4px_0_#000]
                focus:outline-none
                focus:translate-x-[2px] focus:translate-y-[2px]
                focus:shadow-[2px_2px_0_#000]
              "
            />

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full px-3 py-2
                bg-white/80 border-[3px] border-black
                font-bold text-black
                shadow-[4px_4px_0_#000]
                focus:outline-none
                focus:translate-x-[2px] focus:translate-y-[2px]
                focus:shadow-[2px_2px_0_#000]
              "
            />

            <button
              type="submit"
              className="
                w-full py-2
                bg-black text-white
                font-extrabold uppercase
                shadow-[4px_4px_0_rgba(255,255,255,0.3)]
                hover:translate-x-[2px] hover:translate-y-[2px]
                hover:shadow-[2px_2px_0_rgba(255,255,255,0.3)]
                transition
              "
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
