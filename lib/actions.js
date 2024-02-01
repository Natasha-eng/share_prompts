"use server";

import { redirect } from "next/navigation";
import {
  base,
  fetchPrompts,
  getMinifiedPrompt,
  getMinifiedPrompts,
} from "./airtable";
import { auth, signIn } from "@app/auth";
import { getMinifiedUser } from "./airable-user";
import bcrypt from "bcrypt";

export const fatchAllPrompts = async () => {
  try {
    const posts = await fetchPrompts();
    const postsWithTagsArr = posts.map((post) => ({
      ...post,
      tag: post.tag.split(" "),
    }));

    return postsWithTagsArr;
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};

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

export const createPrompt = async (prompt, tag, type, price, location, img) => {
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
          price,
          location,
          type,
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

export const getEventById = async (eventId) => {
  try {
    const event = await base("sharePrompts").find(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    const eventData = getMinifiedPrompt(event);
    const postWithTagsArr =
      eventData.tag.length > 0
        ? { ...eventData, tag: eventData.tag.split(" ") }
        : [];

    return postWithTagsArr;
  } catch (err) {
    console.log("err", err);
  }
};

export const getRelatedEventsByType = async (type, eventId) => {
  try {
    const eventIdToNumber = Number(eventId);
    const events = await base("sharePrompts")
      .select({
        filterByFormula: `AND(type="${type}",NOT(id=${eventIdToNumber}))`,
      })
      .firstPage();

    const relatedEvents = getMinifiedPrompts(events);
    const relatedEventsWithTagsArr = relatedEvents.map((post) => ({
      ...post,
      tag: post.tag.split(" "),
    }));

    return relatedEventsWithTagsArr;
  } catch (err) {
    console.log("err", err);
  }
};

export const findUser = async (username) => {
  try {
    const user = await base("promptsUsers")
      .select({
        filterByFormula: `username="${username}"`,
      })
      .firstPage();

    if (user.length > 0) {
      return getMinifiedUser(user[0]);
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const register = async (username, email, password) => {
  try {
    const exists = await findUser(username);

    if (exists.recordId) {
      return { message: "Username or email already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await base("promptsUsers").create({
      username,
      email,
      password: hashedPassword,
    });

    const user = getMinifiedUser(newUser);

    return { message: "User registered.", user };
  } catch (err) {
    return { message: `error while registering user: ${err}` };
  }
};

export const authenticate = async (username, password) => {
  try {
    const res = await signIn("credentials", {
      username,
      password,
    });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }

    throw err;
  }
};
