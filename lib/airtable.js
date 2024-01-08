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

const fatchAllPrompts = async () => {
  const promptsData = base("sharePrompts")
    .select({
      // Selecting the first 3 records in Grid view:
      // maxRecords: 3,
      // view: "Grid view",
    })
    .firstPage();
  const prompts = await promptsData;
  return getMinifiedPrompts(prompts);
};

const createPrompt = async (prompt, tag, user) => {
  try {
    const newPrompt = await base("sharePrompts").create([
      {
        fields: {
          userId: String(user.userId),
          username: user.username,
          prompt,
          tag,
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
  const updatedPrompt = await base("sharePrompts").update(id, promptToUpdate);

  return getMinifiedPrompt(updatedPrompt);
};

const deletePrompt = async (recordId) => {
  const deletedPrompt = base("sharePrompts").destroy(recordId);

  // return
};

export {
  base,
  getMinifiedRecords,
  findPromptsByFilter,
  fatchAllPrompts,
  createPrompt,
  findPromptById,
  updatePrompt,
  deletePrompt,
};
