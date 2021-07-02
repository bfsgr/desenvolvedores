import { getCustomRepository } from "typeorm";
import { DesenvolvedorRepository } from "../repositories/DesenvolvedorRepository";

export class ListarDesenvolvedoresService {
  async execute(page?: number, limit?: number, nome?: string) {
    if ((!page && limit) || (page && !limit)) {
      throw new Error("Page e limit devem ser usados em conjunto");
    }

    const desenvolvedorRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    const [devs, count] =
      await desenvolvedorRepository.listarComBuscaEPaginacao(nome, page, limit);

    return { devs, count };
  }
}
