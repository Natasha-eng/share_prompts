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
