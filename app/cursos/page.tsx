import CursosItem from "@/components/CursosItem";
import { getCursos } from "./actions";
import Link from "next/link";

export default async function CursosPage() {
  const cursos = await getCursos();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 to-red-900">
      <div className="w-full max-w-4xl flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold mb-10 font-sans text-white">
          Lista de cursos
        </h1>

        <div className="w-full max-h-[400px] bg-white rounded-md shadow-md text-black p-4 overflow-auto">
          <ul className="flex flex-col items-center gap-2">
            {cursos.map((curso) => (
              <CursosItem key={curso.id} nome={curso.nome} id={curso.id} />
            ))}
          </ul>
        </div>

        <Link
          href="/cursos/cadastro"
          className="mt-6 px-5 py-2 bg-black text-white dark:bg-white dark:text-black flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity"
        >
          Cadastrar curso
        </Link>
      </div>
    </div>
  );
}
