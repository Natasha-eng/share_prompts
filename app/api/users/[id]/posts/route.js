import { findPromptsByFilter } from "@lib/airtable";

export const GET = async (req, { params }) => {
  const userId = params.id;

  try {
    const prompts = await findPromptsByFilter(userId);
    const postsWithTagsArr = prompts.map((post) => ({
      ...post,
      tag: post.tag.split(" "),
    }));

    return new Response(JSON.stringify(postsWithTagsArr), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
