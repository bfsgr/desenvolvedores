import { getCustomRepository } from "typeorm";
import { DesenvolvedorRepository } from "../repositories/DesenvolvedorRepository";

export class RemoverDesenvolvedorService {
  async execute(id: number) {
    const desenvolvedorRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    const dev = await desenvolvedorRepository.findOne(id);

    if (!dev) {
      throw new Error("Desenvolvedor não encontrado");
    }

    return await desenvolvedorRepository.remove(dev);
  }
}
