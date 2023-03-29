import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import validator from "validator";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import { badRequest, created, errorRequest } from "../helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      //verificar compos obrigatorios
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      //verificar se o email e valido

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("Email is invalid");
      }
      //validar se body existe
      const { body } = httpRequest;

      const user = await this.createUserRepository.createUser(body!);

      return created<User>(user);
    } catch (error) {
      return errorRequest();
    }
  }
}
