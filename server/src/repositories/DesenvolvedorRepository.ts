import { EntityRepository, Repository } from "typeorm";
import { Desenvolvedor } from "../entities/Desenvolvedor";

@EntityRepository(Desenvolvedor)
export class DesenvolvedorRepository extends Repository<Desenvolvedor> {
  async listarComBuscaEPaginacao(nome?: string, page?: number, limit?: number) {
    let query = this.createQueryBuilder("desenvolvedor");

    if (nome) {
      query = query.where("desenvolvedor.nome LIKE :nome", {
        nome: `%${nome}%`,
      });
    }

    if (page && limit) {
      const offset = (page - 1) * limit;
      query = query.skip(offset).take(limit);
    }

    return await query.getManyAndCount();
  }
}
