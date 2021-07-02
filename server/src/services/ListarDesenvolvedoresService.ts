import { getCustomRepository } from "typeorm";
import { DesenvolvedorRepository } from "../repositories/DesenvolvedorRepository";
import { Desenvolvedor } from "../entities/Desenvolvedor";

export class ListarDesenvolvedoresService {
  private static async listarTodos() {
    const desenvolvedoresRepository = getCustomRepository(
      DesenvolvedorRepository
    );
    return await desenvolvedoresRepository.find();
  }

  private static async listarPaginado(page: number, limit: number) {
    const desenvolvedoresRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    const offset = (page - 1) * limit;

    return await desenvolvedoresRepository.listarTodosPaginado(offset, limit);
  }

  private static async listarPorNome(nome: string) {
    const desenvolvedoresRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    return await desenvolvedoresRepository.listarDesenvolvedorPorNome(nome);
  }

  private static async listarPorNomePaginado(
    nome: string,
    page: number,
    limit: number
  ) {
    const desenvolvedoresRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    const offset = (page - 1) * limit;

    return await desenvolvedoresRepository.buscarDesenvolvedoresPorNomePaginado(
      nome,
      offset,
      limit
    );
  }

  async execute(page?: number, limit?: number, nome?: string) {
    if ((!page && limit) || (page && !limit)) {
      throw new Error("Page e limit devem ser usados em conjunto");
    }

    let devs: Desenvolvedor[];
    let count: number;

    if (page && limit) {
      if (nome) {
        [devs, count] =
          await ListarDesenvolvedoresService.listarPorNomePaginado(
            nome,
            page,
            limit
          );
      } else {
        [devs, count] = await ListarDesenvolvedoresService.listarPaginado(
          page,
          limit
        );
      }
    } else {
      if (nome) {
        devs = await ListarDesenvolvedoresService.listarPorNome(nome);
        count = devs.length;
      } else {
        devs = await ListarDesenvolvedoresService.listarTodos();
        count = devs.length;
      }
    }

    return { devs, count };
  }
}
