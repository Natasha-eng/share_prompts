import { deletePrompt, findPromptById, updatePrompt } from "@lib/airtable";

export const GET = async (req, { params }) => {
  const id = params.id;

  try {
    const prompt = await findPromptById(id);

    if (!prompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(err, {
      status: 500,
    });
  }
};

export const PUT = async (request) => {
  const { recordId, promptObj } = await request.json();

  try {
    const updatedPrompt = await updatePrompt(recordId, promptObj);
    if (updatedPrompt.recordId) {
      return new Response(JSON.stringify(updatedPrompt), { status: 201 });
    } else {
      return new Response("Failed to update the prompt", {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(error, {
      status: 500,
    });
  }
};

export const DELETE = async (request) => {
  const { recordId } = await request.json();

  try {
    const deletedPrompt = await deletePrompt(recordId);

    return new Response("Prompt deleted successfully", { status: 201 });
  } catch (error) {
    return new Response(error, {
      status: 500,
    });
  }
};
