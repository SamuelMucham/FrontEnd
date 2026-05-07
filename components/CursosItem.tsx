"use client";

import Link from "next/link";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  nome: string;
}

export default function CursosItem({ id, nome }: Props) {
  const router = useRouter();

  async function handleDelete() {
    try {
      router.refresh();
    } catch (error) {
      console.error("Erro ao deletar curso:", error);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Link href={`/curso/${id}`} className="flex-1">
        {nome}
      </Link>

      <button className="text-red-500 cursor-pointer" onClick={handleDelete}>
        <Trash size={18} />
      </button>
    </div>
  );
}
