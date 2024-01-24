import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.SECRET_API_TOKEN,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_KEY);

export const getMinifiedUser = (record) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

const getMinifiedPrompts = (records) => {
  return records.map((record) => getMinifiedUser(record));
};

const findUser = async (username) => {
  try {
    const user = await base("promptsUsers")
      .select({
        filterByFormula: `username="${username}"`,
      })
      .firstPage();

    if (user) {
      return getMinifiedUser(user[0]);
    } else {
      console.log("can not find user");
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (username, password) => {
  try {
    const user = await base("promptsUsers").create({
      username,
      password,
    });

    return getMinifiedUser(user);
  } catch (err) {
    console.log(err);
  }
};

export { createUser, findUser };
