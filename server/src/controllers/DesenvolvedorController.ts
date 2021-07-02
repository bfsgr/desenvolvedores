import { Request, Response } from "express";
import { CriarDesenvolvedorService } from "../services/CriarDesenvolvedorService";
import { ListarDesenvolvedoresService } from "../services/ListarDesenvolvedoresService";
import { parseQueryParams } from "../helpers/ParseQueryParams";
import { ErrorNotFound } from "../helpers/ErrorNotFound";

export class DesenvolvedorController {
  async create(request: Request, response: Response) {
    const { nome, hobby, sexo, data_nascimento } = request.body;

    const criarDesenvolvedorService = new CriarDesenvolvedorService();

    const dev = await criarDesenvolvedorService.execute({
      nome,
      hobby,
      sexo,
      data_nascimento,
    });

    return response.json(dev);
  }

  async index(request: Request, response: Response) {
    const { page, limit, nome } = parseQueryParams(request);

    const listarDesenvolvedoresService = new ListarDesenvolvedoresService();

    const { devs, count } = await listarDesenvolvedoresService.execute(
      page,
      limit,
      nome
    );

    if (page && limit) {
      response.setHeader("X-Total-Count", count);
      response.setHeader("X-Total-Pages", Math.ceil(count / limit));
      response.setHeader("X-Page-Items", devs.length);
      response.setHeader("X-Current-Page", page);
    }

    if (devs.length == 0) {
      throw new ErrorNotFound("Nenhum desenvolvedor encontrado");
    }

    return response.json(devs);
  }
}
