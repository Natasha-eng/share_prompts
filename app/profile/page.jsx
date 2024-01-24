export const revalidate = 0;

import { auth } from "@app/auth";
import Profile from "@components/Profile";
import { findUser } from "@lib/actions";

const MyProfile = async () => {
  const userData = await auth();
  const username = userData?.user ? userData?.user.username : null;

  const currentUser = username && (await findUser(username));

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      currentUser={currentUser}
    />
  );
};

export default MyProfile;
