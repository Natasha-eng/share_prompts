export const revalidate = 0;

import Feed from "@components/Feed";

const Home = async () => {
  // const session = getServerSession(options);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text_center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient flex-center">Events</span>
      </h1>
      <p className="desc text-center">
        ShareEvents is an open-source tool for modern world to discover, create
        and share creative events
      </p>
      <Feed />
    </section>
  );
};

export default Home;
