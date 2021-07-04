import { IDesenvolvedorRequest } from "../interfaces/IDesenvolvedorRequest";
import { getCustomRepository } from "typeorm";
import { DesenvolvedorRepository } from "../repositories/DesenvolvedorRepository";
import { validate } from "class-validator";
import { CriarRespostaErro } from "../helpers/CriarRespostaErro";

export class AtualizarDesenvolvedorService {
  async execute(
    id: number,
    { nome, sexo, hobby, data_nascimento }: IDesenvolvedorRequest
  ) {
    const devRepository = getCustomRepository(DesenvolvedorRepository);

    const dev = await devRepository.findOne(id);

    if (!dev) {
      throw new Error("Desenvolvedor não encontrado");
    }

    dev.nome = nome;
    dev.sexo = sexo;
    dev.hobby = hobby;
    dev.data_nascimento = new Date(data_nascimento);

    const errors = await validate(dev);

    if (errors.length > 0) {
      const criarRespostaErroService = new CriarRespostaErro();
      throw criarRespostaErroService.execute(errors);
    }

    return await devRepository.save(dev);
  }
}
