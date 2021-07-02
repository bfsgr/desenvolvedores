import { EntityRepository, Like, Repository } from "typeorm";
import { Desenvolvedor } from "../entities/Desenvolvedor";

@EntityRepository(Desenvolvedor)
export class DesenvolvedorRepository extends Repository<Desenvolvedor> {
  async listarTodosPaginado(offset: number, limit: number) {
    return this.createQueryBuilder("desenvolvedor")
      .offset(offset)
      .take(limit)
      .getManyAndCount();
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
}
