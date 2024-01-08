import { createPrompt } from "@lib/airtable";
import { verifyToken } from "@lib/token";
import { cookies } from "next/headers";

export const POST = async (request) => {
  const { prompt, tag } = await request.json();

  const cookieStore = cookies();
  const userCookie = cookieStore.get("promptToken");
  const user = await verifyToken(userCookie.value);

  try {
    const newPrompt = await createPrompt(prompt, tag, user);
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response(error, {
      status: 500,
    });
  }
};
