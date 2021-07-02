import { EntityRepository, Like, Repository } from "typeorm";
import { Desenvolvedor } from "../entities/Desenvolvedor";

@EntityRepository(Desenvolvedor)
export class DesenvolvedorRepository extends Repository<Desenvolvedor> {
  async listarTodosPaginado(offset: number, limit: number) {
    const query = this.createQueryBuilder("desenvolvedor")
      .offset(offset)
      .take(limit);

    return await query.getManyAndCount();
  }

  async listarDesenvolvedorPorNome(nome: string) {
    return this.find({ nome: Like(nome) });
  }

  async buscarDesenvolvedoresPorNomePaginado(
    nome: string,
    offset: number,
    limit: number
  ) {
    const query = this.createQueryBuilder("desenvolvedor")
      .where("desenvolvedor.nome LIKE :nome", { nome: `%${nome}%` })
      .offset(offset)
      .take(limit);

    return await query.getManyAndCount();
  }

  async listarComBuscaEPaginacao(nome?: string, page?: number, limit?: number) {
    let query = this.createQueryBuilder("desenvolvedor");

    if (nome) {
      query = query.where("desenvolvedor.nome LIKE :nome", {
        nome: `%${nome}%`,
      });
    }

    if (page && limit) {
      const offset = (page - 1) * limit;
      query = query.offset(offset).take(limit);
    }

    return await query.getManyAndCount();
  }
}
