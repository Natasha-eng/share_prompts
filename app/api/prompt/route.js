export const dynamic = "force-dynamic";

import { fatchAllPrompts } from "@lib/actions";

export const GET = async (request) => {
  try {
    const posts = await fatchAllPrompts();

    const count = Math.ceil(posts.length);
    return new Response(JSON.stringify({ posts, count }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
