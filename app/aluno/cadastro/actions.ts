"use server"; 
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
interface creatreAluno {
    nome: string;
    idade: number;
    cpf: number;
    email: string;
}

export async function creatreAluno(aluno: creatreAluno) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value;
    console.log(JSON.stringify(aluno));

    const response = await fetch("http://localhost:8080/alunos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(aluno),
    })
    const data = await response.json()

    if (response.status == 201) {
        revalidateTag("listar", "max");
        return;
    }
    return data;
}