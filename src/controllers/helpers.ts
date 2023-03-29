import { HttpResponse, HttpStatusCode } from "./protocols";

export function created<T>(body: any): HttpResponse<T> {
  return {
    statusCode: HttpStatusCode.CREATED,
    body,
  };
}

export function okRequest<T>(body: any): HttpResponse<T> {
  return {
    statusCode: HttpStatusCode.OK,
    body,
  };
}

export function badRequest(message: string): HttpResponse<string> {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message,
  };
}

export function errorRequest(): HttpResponse<string> {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: "Something went wrong",
  };
}
