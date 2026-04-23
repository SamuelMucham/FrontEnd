import { CursoData } from "./cursos";

export interface AlunoData{
    id: number;
    nome: string;
    idade: number;
    cpf: number;
    email: string;
    createAt: Date;
    uptadeAt: Date; 
}

export interface ALuno extends AlunoData{
    cursos: CursoData[]
}
