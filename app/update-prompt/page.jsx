export const revalidate = 0;

import UpdateForm from "@components/UpdateForm";
import { getEventById } from "@lib/actions";

const EditPrompt = async ({ searchParams }) => {
  const { id } = await searchParams;

  const promptDetails = await getEventById(id);

  return (
    <UpdateForm type="Edit" promptDetails={promptDetails} promptId={id} />
  );
};

export default EditPrompt;
