import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { mongoUser } from "../mongo-protocols";

export class MongoGetClassRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<mongoUser>("users")
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
