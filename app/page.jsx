export const revalidate = 0;

import Feed from "@components/Feed";
import { auth } from "./auth";
import { fatchAllPrompts, findUser } from "@lib/actions";

const Home = async () => {
  const userData = await auth();
  const username = userData?.user ? userData?.user.username : null;
  const currentUser = username && (await findUser(username));

  const posts = await fatchAllPrompts();

  return (
    <section className="min-h-[80vh] w-full pt-[100px]">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Events</span>
      </h1>
      <p className="desc text-center">
        ShareEvents is an open-source tool for modern world to discover, create
        and share creative events
      </p>
      <Feed posts={posts} currentUser={currentUser} />
    </section>
  );
};

export default Home;
