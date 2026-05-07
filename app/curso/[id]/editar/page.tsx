"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { getCurso, updateCurso } from "../actions";
import { Curso } from "@/interfaces/cursos";

export default function CursoPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [curso, setCurso] = useState<Curso>({
    nome: "",
    professor: "",
    cargaHoraria: 0,
    descricao: "",
  } as Curso);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCurso() {
      try {
        const response = await getCurso(id);

        if (response) {
          setCurso(response);
        }
      } catch (error) {
        console.error("Erro ao buscar curso:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCurso();
    }
  }, [id]);

  function handleChange(key: keyof Curso, value: string | number) {
    setCurso((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await updateCurso(id, curso);

      if (response) {
        alert(response);
        return;
      }

      router.push(`/curso/${id}`);
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar curso");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 to-red-1000">
        <span className="text-white text-lg tracking-widest animate-pulse">
          CARREGANDO DADOS...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-400 to-red-1000 p-4">
      <button
        type="button"
        onClick={() => router.push("/cursos")}
        className="mb-6 px-4 py-2 rounded-lg bg-black/40 text-white hover:bg-black/60 transition"
      >
        Voltar para cursos
      </button>

      <form onSubmit={handleUpdate}>
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-[380px] shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Editar Curso
          </h1>

          <div className="space-y-4">
            <InputRow
              label="Nome"
              type="text"
              value={curso.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
            />

            <InputRow
              label="Professor"
              type="text"
              value={curso.professor}
              onChange={(e) => handleChange("professor", e.target.value)}
            />

            <InputRow
              label="Carga Horária"
              type="number"
              value={curso.cargaHoraria}
              onChange={(e) =>
                handleChange("cargaHoraria", Number(e.target.value))
              }
            />

            <InputRow
              label="Descrição"
              type="text"
              value={curso.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}

function InputRow({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-cyan-300 text-sm mb-1 font-semibold">
        {label}
      </label>

      <input
        type={type}
        value={value ?? ""}
        onChange={onChange}
        className="
          bg-black/40
          text-white
          p-3
          rounded-xl
          border border-white/10
          focus:outline-none
          focus:ring-2
          focus:ring-cyan-400
          transition
        "
      />
    </div>
  );
}
