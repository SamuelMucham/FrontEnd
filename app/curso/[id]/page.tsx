"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { PenBox, BookOpen } from "lucide-react";

import { getCurso } from "./actions";
import { Curso } from "@/interfaces/cursos";

export default function CursoPage() {
  const params = useParams();
  const id = Number(params.id);

  const [curso, setCurso] = useState<Curso | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCurso() {
      try {
        const response = await getCurso(id);
        setCurso(response);
      } catch (error) {
        console.error("Erro ao carregar curso:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCurso();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-cyan-400 text-lg font-semibold animate-pulse tracking-widest">
          CARREGANDO CURSO...
        </div>
      </div>
    );
  }

  if (!curso) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-red-400 text-lg font-semibold">
          Curso não encontrado.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center px-4 py-10">
      <div
        className="
          w-full max-w-md
          rounded-3xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          shadow-2xl
          p-8
        "
      >
        <div className="flex flex-col items-center text-center">
          <div
            className="
              w-24 h-24
              rounded-2xl
              bg-gradient-to-br from-cyan-400 to-blue-600
              flex items-center justify-center
              shadow-lg shadow-cyan-500/30
              mb-5
            "
          >
            <BookOpen size={40} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white">{curso.nome}</h1>

          <p className="text-cyan-400 text-sm tracking-widest mt-2">
            CURSO #{id}
          </p>
        </div>

        <div className="mt-6">
          <Link
            href={`/curso/${id}/editar`}
            className="
              flex items-center justify-center gap-2
              w-full
              bg-cyan-500 hover:bg-cyan-400
              transition-all duration-300
              text-black
              font-bold
              py-3
              rounded-xl
            "
          >
            <PenBox size={18} />
            Editar Curso
          </Link>
        </div>

        <div className="w-full h-px bg-white/10 my-8" />

        <div className="space-y-6">
          <InfoRow label="Professor" value={curso.professor} />

          <InfoRow
            label="Carga Horária"
            value={`${curso.cargaHoraria} horas`}
          />

          <InfoRow label="Descrição" value={curso.descricao} />
        </div>

        <div className="mt-10 pt-5 border-t border-white/10 text-center">
          <p className="text-xs text-slate-400 tracking-[0.2em] uppercase">
            Sistema de Cursos
          </p>
        </div>
      </div>
    </div>
  );
}

type InfoRowProps = {
  label: string;
  value?: string | number;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex flex-col">
      <span className="text-cyan-400 text-xs uppercase tracking-widest mb-2 font-semibold">
        {label}
      </span>

      <div
        className="
          bg-white/5
          border border-white/10
          rounded-xl
          px-4 py-3
          text-white
        "
      >
        {value || "Não informado"}
      </div>
    </div>
  );
}
