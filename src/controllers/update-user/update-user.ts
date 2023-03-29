import { User } from "../../models/user";
import { CreateUserParams } from "../create-user/protocols";
import { badRequest, errorRequest, okRequest } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly UpdateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Body missing fields");
      }

      if (!id) {
        return badRequest("Missing user id");
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed ");
      }

      const user = await this.UpdateUserRepository.updateUser(id, body);

      return okRequest<User>(user);
    } catch (error) {
      return errorRequest();
    }
  }
}
