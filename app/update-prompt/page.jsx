export const revalidate = 0;

import UpdateForm from "@components/UpdateForm";
import { getEventById } from "@lib/actions";

const EditPrompt = async ({ searchParams }) => {
  const promptId = searchParams?.id;

  const promptDetails = await getEventById(promptId);

  return (
    <UpdateForm type="Edit" promptDetails={promptDetails} promptId={promptId} />
  );
};

export default EditPrompt;
