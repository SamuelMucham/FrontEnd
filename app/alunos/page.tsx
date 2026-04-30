import AlunoItem from "@/components/AlunoItem";
import { getAlunos } from "./actions";
import Link from "next/link";

export default async function AlunosPage() {
  const alunos = await getAlunos();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 to-red-1000">
      <div className="w-screen h-screen flex flex-col items-center p-80 from-red-450 to-red-1000">
        <h1 className="text-4xl font-bold mb-10 font-sans ">Lista de alunos</h1>

        <div className="w-[90%] h-100 bg-white rounded-md shadow-md shadow-white text-black p-2 overflow-auto">
          <ul className="flex flex-col items-center gap-2">
            {alunos.map((aluno) => (
              <AlunoItem key={aluno.id} nome={aluno.nome} id={aluno.id} />
            ))}
          </ul>
        </div>

        <Link
          href="/aluno/cadastro"
          className="px-5 py-2 bg-black text-white dark:bg-white dark:text-black items-center justify-center rounded-lg hover:opacity-80 transition-opacity"
        >
          Cadastrar aluno
        </Link>
      </div>
    </div>
  );
}
