export const revalidate = 0;

import UpdateForm from "@components/UpdateForm";
import { findPromptById } from "@lib/airtable";

const EditPrompt = async ({ searchParams }) => {
  const promptId = searchParams?.id;

  const promptDetails = await findPromptById(promptId);

  return (
    <UpdateForm type="Edit" promptDetails={promptDetails} promptId={promptId} />
  );
};

export default EditPrompt;
