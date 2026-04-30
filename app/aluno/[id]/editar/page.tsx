"use client";
import { useParams, useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";
import { Aluno } from "@/interfaces/alunos";
import { getAluno, updateAluno } from "../actions";

export default function AlunoPage() {
  const { id } = useParams();
  const [aluno, setAluno] = useState<Aluno>({} as Aluno);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchAluno() {
      const response = await getAluno(Number(id));
      setAluno(response);
      setLoading(false);
    }
    if (id) fetchAluno();
  }, [id]);

  function handleChange(value: string | number, key: keyof Aluno) {
    setAluno({
      ...aluno,
      [key]: value,
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <span className="text-white tracking-widest animate-pulse">
          CARREGANDO DADOS...
        </span>
      </div>
    );
  }

  async function handleUpdate(e: SubmitEvent) {
    e.preventDefault();
    const response = await updateAluno(Number(id), aluno);
    if (response) {
      alert(response);
      return;
    }

    router.push(`/aluno/${id}`);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-400 to-red-1000">
      
      {/* BOTÃO VOLTAR */}
      <button
        type="button"
        onClick={() => router.push("/alunos")}
        className="mb-6 text-white bg-black/40 hover:bg-black/60 px-4 py-2 rounded-lg transition"
      >
        ← Voltar para alunos
      </button>

      <form onSubmit={handleUpdate}>
        <div className="flex items-center justify-center">
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl w-[350px]">
            <h1 className="text-white text-xl mb-6 font-semibold">
              {aluno?.nome}
            </h1>

            <div className="space-y-4">
              <InputRow
                label="nome"
                value={aluno?.nome}
                onChange={(e) => handleChange(e.target.value, "nome")}
              />

              <InputRow
                label="Idade"
                value={aluno?.idade}
                onChange={(e) => handleChange(Number(e.target.value), "idade")}
              />

              <InputRow
                label="CPF"
                value={aluno?.cpf}
                onChange={(e) => handleChange(Number(e.target.value), "cpf")}
              />

              <InputRow
                label="E-mail"
                value={aluno?.email}
                onChange={(e) => handleChange(e.target.value, "email")}
              />
            </div>

            {/* BOTÃO SALVAR */}
            <button
              type="submit"
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
            >
              💾 Salvar
            </button>

          </div>
        </div>
      </form>
    </div>
  );
}

function InputRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-cyan-400 text-xs mb-1">{label}</label>
      <input
        className="bg-black/40 text-white p-2 rounded border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        value={value ?? ""}
        onChange={onChange}
      />
    </div>
  );
}