import { cookies } from "next/headers";

export const DELETE = async (request) => {
  try {
    cookies().delete("promptToken");
    return new Response(JSON.stringify({ done: true }, { status: 201 }));
  } catch (error) {
    return new Response(error, {
      status: 500,
    });
  }
};
