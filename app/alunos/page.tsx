import AlunoItem from "@/components/AlunoItem";
import { getAlunos } from "./actions";
import Link from "next/link";

export default async function AlunosPage() {
  const alunos = await getAlunos();

  return (
    <div className="w-screen h-screen flex flex-col items-center p-8 bg-zinc-50 dark:bg-black">
      
      <h1 className="text-4xl font-bold mb-10 font-sans">
        Lista de alunos
      </h1>

      <div className="flex-1 w-full max-w-2xl overflow-y-auto mb-5">
        <ul className="flex flex-col gap-6 items-center">
          {alunos.map((aluno) => (
            <AlunoItem key={aluno.id} nome={aluno.nome} id={aluno.id} />
          ))}
        </ul>
      </div>

      <Link
        href={"/aluno/cadastro"}
        className="px-5 py-2 bg-black text-white dark:bg-white dark:text-black items-center justify-center rounded-lg hover:opacity-80 transition-opacity"
      >
        Cadastro
      </Link>
    </div>
  );
}