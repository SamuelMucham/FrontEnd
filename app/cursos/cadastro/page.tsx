"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCurso } from "./actions";

export default function CadastroPage() {
  const router = useRouter();
  const [name, setNome] = useState("");
  const [professor, setProfessor] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [descricao, setDescricao] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await createCurso({
      nome: name,
      professor: professor,
      cargaHoraria: Number(cargaHoraria),
      descricao: descricao,
    });
    if (!response) {
      setNome("");
      setProfessor("");
      setCargaHoraria("");
      setDescricao("");
      router.push("/cursos");
      return;
    }
    alert(response);
  }

  return (    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-300 to-red-1000">
      <div className="relative perspective-[1000px] w-65 group">
        <div
          className="
          relative w-full h-20
          bg-linear-to-br from-[#ff3366] to-[#ff6b35]
          border-4 border-black
          shadow-[8px_8px_0_#000,16px_16px_0_rgba(255,51,102,0.3)]
          cursor-pointer overflow-hidden
          transition-all duration-500
          transform-3d

          group-hover:h-90
          group-hover:translate-z-5
          group-hover:rotate-x-[5deg]
          group-hover:-rotate-y-[5deg]
        "
        >
          <div className="absolute top-0 left-0 w-full h-20 flex items-center justify-center">
            <span
              className="
              text-black font-extrabold text-[16px]
              uppercase tracking-[2px]
              transition-all duration-300
              group-hover:opacity-0
              group-hover:-translate-y-6
            "
            >
              Cadastro de Curso
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="
              absolute top-0 left-0 w-full h-full
              flex flex-col items-center justify-center
              p-4 gap-3
              opacity-0 scale-75 translate-y-6
              transition-all duration-500
              group-hover:opacity-100
              group-hover:scale-100
              group-hover:translate-y-0
            "
          >
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setNome(e.target.value)}
              className="
                w-full px-3 py-2
                bg-white/80 border-[3px] border-black
                font-bold text-black
                shadow-[4px_4px_0_#000]
                focus:outline-none
                focus:translate-x-0.5 focus:translate-y-0.5
                focus:shadow-[2px_2px_0_#000]
              "
            />

            <input
              type="text"
              placeholder="Professor"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
              className="
                w-full px-3 py-2
                bg-white/80 border-[3px] border-black
                font-bold text-black
                shadow-[4px_4px_0_#000]
                focus:outline-none
                focus:translate-x-0.5 focus:translate-y-0.5
                focus:shadow-[2px_2px_0_#000]
              "
            />

            <input
              type="number"
              placeholder="Carga Horária"
              value={cargaHoraria}
              onChange={(e) => setCargaHoraria(e.target.value)}
              className="
                w-full px-3 py-2
                bg-white/80 border-[3px] border-black
                font-bold text-black
                shadow-[4px_4px_0_#000]
                focus:outline-none
                focus:translate-x-0.5 focus:translate-y-0.5
                focus:shadow-[2px_2px_0_#000]
              "
            />

            <input
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="
                w-full px-3 py-2
                bg-white/80 border-[3px] border-black
                font-bold text-black
                shadow-[4px_4px_0_#000]
                focus:outline-none
                focus:translate-x-0.5 focus:translate-y-0.5
                focus:shadow-[2px_2px_0_#000]
              "
            />

            <button
              type="submit"
              className="
                w-full py-2
                bg-black text-white
                font-extrabold uppercase
                shadow-[4px_4px_0_rgba(255,255,255,0.3)]
                hover:translate-x-0.5 hover:translate-y-0.5
                hover:shadow-[2px_2px_0_rgba(255,255,255,0.3)]
                transition
              "
              >
                Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
