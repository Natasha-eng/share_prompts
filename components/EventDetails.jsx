import Image from "next/image";

const EventDetails = ({ event }) => {
  return (
    <div className="event p-4 rounded sm:flex gap-5">
      <Image
        src={`${event?.img || "/images/upload.svg"}`}
        alt="event_image"
        width={200}
        height={200}
        className="m-[auto] rounded sm:self-start"
      />

      <div className="grow-[2] text-lg">
        <div className="mb-1">
          <span className="font-semibold">Creator:</span> {event.username}
        </div>
        <div className="mb-3">
          <span className="font-semibold">Event Type:</span> {event.type}
        </div>
        <div className="w-full break-all mb-3">
          <span className="font-semibold">Description:</span> {event.prompt}
        </div>
        <div className="flex gap-3">
          <span className="font-semibold">Price:</span> {event.price} BYN
        </div>
        <div className="w-full break-all mb-3">
          <span className="font-semibold">Location:</span> {event.location}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
