import AlunoItem from "@/components/AlunoItem";
import { getAlunos } from "./actions";

export default async function AlunosPage() {
  const alunos = await getAlunos();

  console.log(alunos);
  
  return (
    <div className="justify-center flex flex-col gap-100">
      <h1 className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black text-4xl font-bold ">
        Lista de alunos
      </h1>
      <div className="flex flex-col flex-1 items-center justify-center ">
        <ul className=" justify-center flex flex-col gap-10 ">
          <AlunoItem id={1} nome="Samuel" />
          <AlunoItem id={2} nome="pedro" />
          <AlunoItem id={3} nome="kauan" />
          <AlunoItem id={4} nome="alexandre" />
          <AlunoItem id={5} nome="anthony" />
          <AlunoItem id={6} nome="vinicius" />
          <AlunoItem id={7} nome="victor" />
          <AlunoItem id={8} nome="juan" />
          <AlunoItem id={9} nome="eduardo" />
          <AlunoItem id={10} nome="marcos" />
        </ul>
      </div>
    </div>
  );
}
