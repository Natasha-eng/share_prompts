import { createUser, findUser } from "@lib/airable-user";
import { createToken } from "@lib/token";
import { cookies } from "next/headers";
const bcrypt = require("bcrypt");

export const POST = async (request) => {
  const { username, password } = await request.json();

  if (!username || !password) {
    return new Response("All the fields are required", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await findUser(username);

    if (!user) {
      const newUser = await createUser(username, hashedPassword);
      const token = createToken(newUser.username, newUser.userId);
      cookies().set({
        name: "promptToken",
        value: token,
        httpOnly: true,
        path: "/",
      });

      return new Response(
        JSON.stringify({ username: newUser.username, userId: newUser.userId }),
        {
          status: 200,
          // headers: { "Set-Cookie": `promptToken=${token}` },
        }
      );
    } else {
      const token = createToken(user.username, user.userId);

      cookies().set({
        name: "promptToken",
        value: token,
        httpOnly: true,
        path: "/",
      });

      return new Response(
        JSON.stringify({ username: user.username, userId: user.userId }),
        {
          status: 200,
          // headers: { "Set-Cookie": `promptToken=${token}` },
        }
      );
    }
  } catch (error) {
    return new Response(error, {
      status: 500,
    });
  }
};
