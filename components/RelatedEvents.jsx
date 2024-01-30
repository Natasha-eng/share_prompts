import { getRelatedEventsByType } from "@lib/actions";
import PromptCard from "./PromptCard";

const RelatedEvents = async ({ event, currentUser }) => {
  const relatedEvents = await getRelatedEventsByType(event.type, event.id);

  return (
    <div className="grow-[3] mb-8">
      <div className="font-serif my-5 text-2xl sm:text-4xl font-bold">
        Related Events
      </div>
      <div className="flex flex-wrap gap-5">
        {relatedEvents.length > 0 ? (
          relatedEvents?.map((event) => (
            <PromptCard key={event.id} post={event} currentUser={currentUser} />
          ))
        ) : (
          <div className="min-h-[9em] text-center leading-[9em] m-auto">Related Events Not Found</div>
        )}
      </div>
    </div>
  );
};

export default RelatedEvents;
