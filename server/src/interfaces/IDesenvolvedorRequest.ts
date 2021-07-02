import { Sexo } from "../enums/Sexo";

export interface IDesenvolvedorRequest {
  nome: string;
  hobby: string;
  sexo: Sexo;
  data_nascimento: Date;
}
