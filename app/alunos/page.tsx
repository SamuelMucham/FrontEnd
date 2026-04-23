import AlunoItem from "@/components/AlunoItem";
import { getAlunos } from "./actions";

export default async function AlunosPage() {
  const alunos = await getAlunos();

  return (
    <div className="justify-center flex flex-col gap-100">
      <h1 className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black text-4xl font-bold ">
        Lista de alunos
      </h1>
      <div className="flex flex-col flex-1 items-center justify-center ">
        <ul className=" justify-center flex flex-col gap-10 ">
          {alunos.map(aluno => (
            <AlunoItem key={aluno.id} nome={aluno.nome} id={aluno.id}/>
          ))}
        </ul>
      </div>
    </div>
  );
}
