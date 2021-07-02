import { getCustomRepository } from "typeorm";
import { DesenvolvedorRepository } from "../repositories/DesenvolvedorRepository";
import { ErrorNotFound } from "../helpers/ErrorNotFound";

export class MostrarDesenvolvedorService {
  async execute(id: number) {
    const desenvolvedorRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    const dev = await desenvolvedorRepository.findOne(id);

    if (!dev) {
      throw new ErrorNotFound("Desenvolvedor não encontrado");
    }

    return dev;
  }
}
