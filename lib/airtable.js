import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.SECRET_API_TOKEN,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_KEY);

const getMinifiedRecord = (record) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

const getMinifiedRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

const findPromptsByFilter = async (userId) => {
  const findPromptsRecord = await base("sharePrompts")
    .select({
      filterByFormula: `userId="${userId}"`,
    })
    .firstPage();

  return getMinifiedPrompts(findPromptsRecord);
};

const getMinifiedPrompt = (record) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

const getMinifiedPrompts = (records) => {
  return records.map((record) => getMinifiedPrompt(record));
};

const fetchPrompts = async () => {
  const promptsData = base("sharePrompts").select().firstPage();
  const prompts = await promptsData;
  return getMinifiedPrompts(prompts);
};

const createPrompt = async (prompt, tag, user, img) => {
  try {
    const newPrompt = await base("sharePrompts").create([
      {
        fields: {
          userId: String(user.userId),
          username: user.username,
          prompt,
          tag,
          img,
        },
      },
    ]);

    return newPrompt;
  } catch (err) {
    console.log(err);
  }
};

const findPromptById = async (id) => {
  const prompt = await base("sharePrompts")
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();
  return getMinifiedPrompt(prompt[0]);
};

const updatePrompt = async (id, promptToUpdate) => {
  const updatedPrompt = await base("sharePrompts").update(id, {
    ...promptToUpdate,
  });

  return getMinifiedPrompt(updatedPrompt);
};

const deletePrompt = async (recordId) => {
  const deletedPrompt = base("sharePrompts").destroy(recordId);
};

export {
  base,
  getMinifiedRecords,
  findPromptsByFilter,
  fetchPrompts,
  createPrompt,
  findPromptById,
  updatePrompt,
  deletePrompt,
  getMinifiedPrompt,
  getMinifiedPrompts
};
