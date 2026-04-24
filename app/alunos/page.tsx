import AlunoItem from "@/components/AlunoItem";
import { getAlunos } from "./actions";
import Link from "next/link";

export default async function AlunosPage() {
  const alunos = await getAlunos();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className=" text-4xl font-bold mt-10 mb-50 bg-zinc-50 font-sans dark:bg-black ">
        Lista de alunos
      </h1>
      <div className="flex flex-col flex-1 items-center justify-center ">
        <ul className=" justify-center flex flex-col gap-10 ">
          {alunos.map((aluno) => (
            <AlunoItem key={aluno.id} nome={aluno.nome} id={aluno.id} />
          ))}
        </ul>
      </div>
      <Link
        href={"/aluno/cadastro"}
        className="px-5 py-2 bg-white text-black mt-5  items-center justify-center rounded-lg"
      >
        Cadastro
      </Link>
    </div>
  );
}
