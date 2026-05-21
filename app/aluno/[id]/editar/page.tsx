"use client";
import { useParams, useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";
import { Aluno } from "@/interfaces/alunos";
import { Curso } from "@/interfaces/cursos";
import { getAluno, updateAluno } from "../actions";
import { getCursos } from "@/app/cursos/actions";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

export default function AlunoPage() {
  const { id } = useParams();
  const [aluno, setAluno] = useState<Aluno>({} as Aluno);
  const [cursos, setCursos] = useState([] as Curso[]);
  const [matriculado, setMatriculado] = useState([] as Curso[]);
  const [NaoMatriculado, setNaoMatriculado] = useState([] as Curso[]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchAluno() {
      const response = await getAluno(Number(id));
      setAluno(response);
      getCursos().then((response) => setCursos(response));
      setLoading(false);
    }
    if (id) fetchAluno();
  }, [id]);

  useEffect(() => {
    if (aluno.cursos) {
      const matriculadoTemp = [] as Curso[];
      const naoMatriculadoTemp = [] as Curso[];

      for (const curso of cursos) {
        if (aluno.cursos.find((c) => c.id === curso.id)) {
          matriculadoTemp.push(curso);
        } else {
          naoMatriculadoTemp.push(curso);
        }
      }

      setMatriculado(matriculadoTemp);
      setNaoMatriculado(naoMatriculadoTemp);
    }
  }, [cursos, aluno]);

  function handleChange(value: string | number, key: keyof Aluno) {
    setAluno({
      ...aluno,
      [key]: value,
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800">
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

  function matricular(curso: Curso) {
    setMatriculado((oldState) => [...oldState, curso]);
    setNaoMatriculado((oldState) => oldState.filter((c) => c.id !== curso.id));
  }

  function desmatricular(curso: Curso) {
    setMatriculado((oldState) => oldState.filter((c) => c.id !== curso.id));
    setNaoMatriculado((oldState) => [...oldState, curso]);
  }

  return (
    <div className="min-h-screen flex flex-col dap-10 items-center justify-center bg-linear-to-br from-red-400 to-red-1000">
      <button
        type="button"
        onClick={() => router.push("/alunos")}
        className="mb-6 text-white bg-black/40 hover:bg-black/60 px-4 py-2 rounded-lg transition"
      >
        Voltar para alunos
      </button>

      <form onSubmit={handleUpdate}>
        <div className="flex items-center justify-center">
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl w-87.5">
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

            <button
              type="submit"
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
              onClick={() => router.push("/alunos")}
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
      <div className="bg-white rounded-xl h-[40%] overflow-y-auto flex text-black p-4 gap-1 w-[50%]">
        <ul className="w-[50%]">
          <h2 className="text-center">Matriculado</h2>
          {matriculado.map((curso) => (
            <li key={curso.id} className="underline w-full px-2">
              {curso.nome}
              <button
                onClick={() => desmatricular(curso)}
                className="cursor-pointer"
              >
                <ArrowRightCircle />
              </button>
            </li>
          ))}
        </ul>

        <ul className="w-px h=full bg-black" />

        <ul className=" w-[50%] text-end">
          <h2 className="text-center">Não Matriculado</h2>
          {NaoMatriculado.map((curso) => (
            <li key={curso.id} className="underline w-full px-2">
              {curso.nome}
              <button
                onClick={() => matricular(curso)}
                className="cursor-pointer"
              >
                <ArrowLeftCircle />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className="bg-white text-black rounded-x1 px-10 py-2 cursor-pointer">Salvar Matriculas</button>
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
