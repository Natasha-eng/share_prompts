export const dynamic = "force-dynamic";

import { fatchAllPrompts } from "@lib/airtable";

export const GET = async (request) => {
  try {
    const prompts = await fatchAllPrompts();
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
