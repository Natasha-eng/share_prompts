import { fatchAllPrompts } from "@lib/airtable";
import { revalidatePath } from "next/cache";

export const GET = async (request) => {
  console.log(request.url);
  try {
    const prompts = await fatchAllPrompts();
    revalidatePath("/");
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
