import { hash } from "bcryptjs";
import { db } from "~/utils/db.server";

type User = {
  email: string;
  password: string;
  username: string;
};

export async function register({ email, password, username }: User) {
  const passwordHash = await hash(password, 10);
  const user = await db.user.create({
    data: { email, password: passwordHash, name: username },
  });
  return { id: user.id, username };
}
