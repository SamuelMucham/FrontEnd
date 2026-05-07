"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAluno } from "./actions";
import { Aluno } from "@/interfaces/alunos";
import Link from "next/link";
import { PenBox } from "lucide-react";

export default function AlunoPage() {
    const { id } = useParams();
    const [aluno, setAluno] = useState<Aluno>({} as Aluno);
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchAluno() {
      const response = await getAluno(Number(id));
      setAluno(response);
      setLoading(false);
    }
    if (id) fetchAluno();
  }, [id]);

  if (loading) {
    return (
      <div className="relative flex items-center justify-center h-screen bg-black overflow-hidden">
        <div className="animate-pulse text-cyan-400 text-xl tracking-widest z-10 font-mono">
          CARREGANDO DADOS...
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 to-red-1000">
    <div className="relative flex items-center justify-center h-screen">
      <div className="absolute w-[500px] h-[500px] "></div>

      <div
        className="relative z-10 backdrop-blur-2xl bg-white/5 border border-white/10 
        shadow-[0_0_50px_rgba(0,255,255,0.1)] 
        rounded-3xl p-8 w-[350px]
        transition-all duration-500 hover:border-cyan-500/30"
      >
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 
            flex items-center justify-center text-3xl font-black text-black shadow-[0_0_20px_rgba(6,182,212,0.5)] mb-4"
          >
            {aluno?.nome?.charAt(0).toUpperCase()}
            <Link href={`/aluno/${id}/editar`}>
              <PenBox />
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight text-center">
            {aluno?.nome}
          </h1>
          <span className="text-cyan-400/60 text-xs font-mono mt-1 tracking-widest">
            REGISTRO #{id}
          </span>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>

        <div className="space-y-4 text-left">
          <InfoRow label="Idade" value={`${aluno?.idade} anos`} />
          <InfoRow label="CPF" value={aluno?.cpf} />
          <InfoRow label="E-mail" value={aluno?.email} isEmail />
        </div>

        <div className="mt-8 pt-4 border-t border-white/5 text-center">
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">
            Sistema de Gerenciamento Acadêmico
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  isEmail = false,
}: {
  label: string;
  value?: string | number;
  isEmail?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-wider text-cyan-500 font-bold mb-1 opacity-70">
        {label}
      </span>
      <span
        className={`text-gray-200 text-sm font-medium ${isEmail ? "break-all" : ""}`}
      >
        {value || "Não informado"}
      </span>
    </div>
  );
}
