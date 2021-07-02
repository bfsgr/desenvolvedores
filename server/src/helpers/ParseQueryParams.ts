import { Request } from "express";

export function parseQueryParams(request: Request) {
  let page: number | undefined;
  let limit: number | undefined;
  let nome: string | undefined;

  if (typeof request.query.nome === "string") {
    nome = request.query.nome;
  }

  if (typeof request.query.page === "string") {
    const pageParsed = Number.parseInt(request.query.page);
    if (pageParsed <= 0) {
      throw new Error("Page deve ser maior que 0");
    }
    page = !isNaN(pageParsed) ? pageParsed : undefined;
  }

  if (typeof request.query.limit === "string") {
    const limitParsed = Number.parseInt(request.query.limit);
    if (limitParsed <= 0) {
      throw new Error("Limit deve ser maior que 0");
    }
    limit = !isNaN(limitParsed) ? limitParsed : undefined;
  }

  return { nome, page, limit };
}
