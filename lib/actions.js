"use server";

import { redirect } from "next/navigation";
import { base, getMinifiedPrompt } from "./airtable";
import { cookies } from "next/headers";
import { verifyToken } from "./token";
import { auth, signIn } from "@app/auth";
import { getMinifiedUser } from "./airable-user";

export const updatePrompt = async (id, promptToUpdate) => {
  try {
    const updatedPrompt = await base("sharePrompts").update(id, {
      ...promptToUpdate,
    });

    const prompt = getMinifiedPrompt(updatedPrompt);
  } catch (err) {
    console.log(err);
  }
  redirect("/profile");
};

export const createPrompt = async (prompt, tag, img) => {
  const userData = await auth();
  const username = userData?.user ? userData.user.username : null;
  const user = await findUser(username);

  try {
    const newPrompt = base("sharePrompts").create([
      {
        fields: {
          userId: String(user.userId),
          username: user.username,
          prompt,
          tag,
          img,
        },
      },
    ]);
  } catch (error) {
    return new Response(error, {
      status: 500,
    });
  }

  redirect("/profile");
};

export const findUser = async (username) => {
  try {
    const user = await base("promptsUsers")
      .select({
        filterByFormula: `username="${username}"`,
      })
      .firstPage();

    if (user) {
      return getMinifiedUser(user[0]);
    } else {
      console.log("can not find user");
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const authenticate = async (username, password) => {
  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};
