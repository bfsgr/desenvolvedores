import { getCustomRepository } from "typeorm";
import { DesenvolvedorRepository } from "../repositories/DesenvolvedorRepository";
import { validate } from "class-validator";
import { CriarRespostaErro } from "../helpers/CriarRespostaErro";
import { IDesenvolvedorRequest } from "../interfaces/IDesenvolvedorRequest";

export class CriarDesenvolvedorService {
  async execute({ nome, hobby, sexo, data_nascimento }: IDesenvolvedorRequest) {
    const devRepository = getCustomRepository(DesenvolvedorRepository);

    const dev = devRepository.create({
      nome: nome,
      hobby: hobby,
      sexo: sexo,
      data_nascimento: new Date(data_nascimento),
    });

    const errors = await validate(dev);

    if (errors.length > 0) {
      const criarRespostaErroService = new CriarRespostaErro();
      throw criarRespostaErroService.execute(errors);
    }

    await devRepository.save(dev);

    return dev;
  }
}
