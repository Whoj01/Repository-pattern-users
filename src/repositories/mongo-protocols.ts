import { User } from "../models/user";

export type mongoUser = Omit<User, "id">;
