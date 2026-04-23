import Link from "next/link";

interface Props {
  id: number;
  nome: string;
}

export default function AlunoItem({ id, nome }: Props) {
  return (
    <Link href={`/aluno/${id}`}>
      <li className="bg-indigo-500 opacity-50 flex h-12 w-full items-center justify-center gap-5 px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5 outline-2 outline-offset-2 outline-pink-500">
        {nome}
      </li>
    </Link>
  );
}
