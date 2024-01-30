import { auth } from "@app/auth";
import EventDetails from "@components/EventDetails";
import RelatedEvents from "@components/RelatedEvents";
import {
  fatchAllPrompts,
  findUser,
  getEventById,
  getRelatedEventsByTag,
} from "@lib/actions";

const Event = async ({ params }) => {
  const userData = await auth();
  const username = userData?.user ? userData?.user.username : null;
  const currentUser = username && (await findUser(username));
  const { id } = params;

  const event = await getEventById(id);

  const events = await fatchAllPrompts();

  return (
    <section className="min-h-[80vh] w-full pt-[100px]">
      <div className="font-serif mt-5 mb-7 text-2xl sm:text-5xl text-center font-bold">
        Events Details
      </div>

      <EventDetails event={event} />
      <RelatedEvents currentUser={currentUser} events={events} event={event} />
    </section>
  );
};

export default Event;
