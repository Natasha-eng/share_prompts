import Profile from "@components/Profile";
import { verifyToken } from "@lib/token";

import { cookies } from "next/headers";

const MyProfile = async () => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("promptToken");
  const user = await verifyToken(userCookie?.value);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      currentUser={user}
    />
  );
};

export default MyProfile;
