import { ValidatorErrorResponse } from "../helpers/ValidatorErrorResponse";

interface IValidationError {
  property: string;
  constraints?: Record<string, string>;
}

export class CriarRespostaErroService {
  /** Este serviço cria um objeto de erro legível para entregar aos consumidores da API.
   *  Ele recebe um array de erros em que cada elemento implementa IValidationError
   *  E retorna uma instância de ValidationErrorResponse
   */
  execute(errosDeValidacao: IValidationError[]): ValidatorErrorResponse {
    let errorMessages: Record<string, string[]> = {};

    for (const {
      property: propViolada,
      constraints: violacoes,
    } of errosDeValidacao) {
      if (!violacoes) {
        continue;
      }
      //Associa a prop violada às mensagens de erros de todos os constraints violados
      errorMessages[propViolada] = Object.values(violacoes);
    }
    return new ValidatorErrorResponse(errorMessages);
  }
}
