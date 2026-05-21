"use server";

import { Aluno } from "@/interfaces/alunos";
import { Curso } from "@/interfaces/cursos";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAluno(id: number) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  const response = await fetch(`http://localhost:8080/alunos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {tags: ["pergarDados"]}
  });
  const data = await response.json();

  if (response.status === 401) {
    redirect("/login");
  }
  if (response.status === 401) {
    redirect("/login");
  }

  return data as Aluno;
}

export async function updateAluno(id: number, aluno: Aluno) {
  try{
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  const response = await fetch(`http://localhost:8080/alunos/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aluno),
  });

  if (response.status === 401) {
    redirect("/login");
  }
  const data = await response.json();

  if (response.status === 200) {
    revalidateTag("pergarDados", "max");
    return;
  }

  return data;
}
catch(e){
  console.error(e);
  return {} as Aluno
}
}

export async function matrilucas(id:number, matriculado: Curso[], desmatriculado: Curso[]) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value;

    let response = await fetch(`http://localhost:8080/alunos/matriculas/${id}`,{
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cursosId: matriculado.map(curso => curso.id),
      })
    })

    if (response.status === 401) {
      redirect("/login")
      return
    }

    if (response.status !== 201){
      const data = await response.json();
      return data;
    }

    response = await fetch(`http://localhost:8080/alunos/matriculas/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cursosId: desmatriculado.map(curso => curso.id),
      })
    })
    if (response.status === 401) {
      redirect("/login")
      return
    }
    
    if (response.status !== 200){
      const data = await response.json();
      return data;
    }
     revalidateTag("pergarDados", "max")
     revalidateTag("listarcursos", "max")
     return;
} catch (e){
  console.error(e)
  return "Erro ao atualizar as matriculas"
  }
}