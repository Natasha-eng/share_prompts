import { verifyToken } from "@lib/token";
import { cookies } from "next/headers";

export const GET = async (request) => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("promptToken");
  const user = await verifyToken(userCookie?.value);
  if (user) {
    return new Response(JSON.stringify(user), {
      staus: 200,
    });
  } else {
    return new Response(JSON.stringify(null), {
      staus: 200,
    });
  }
};
