import { createPrompt } from "@lib/airtable";
import { verifyToken } from "@lib/token";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const POST = async (request) => {
  const { prompt, tag, img } = await request.json();

  const cookieStore = cookies();
  const userCookie = cookieStore.get("promptToken");
  const user = await verifyToken(userCookie.value);

  try {
    const newPrompt = await createPrompt(prompt, tag, user, img);

    redirect("/profile");
    // return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response(error, {
      status: 500,
    });
  }

  // revalidatePath("/");
};
