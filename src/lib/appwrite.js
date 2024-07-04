import { Client, Databases } from "appwrite";

const client = new Client();

const DB_ID = "6683bb740027ab856f92";
const SUBJECT_COLLECTION_ID = "6683bc0b00310eda991d";
const WEEKLY_SCHEDULE_COLLECTION_ID = "6683bbf30027e2107e57";
const SCHEDULE_ITEMS_COLLECTION_ID = "6683bc01000379413e80";

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("66832782001842d371f0"); // Your project ID

const databases = new Databases(client);

export {
  client,
  databases,
  DB_ID,
  SUBJECT_COLLECTION_ID,
  WEEKLY_SCHEDULE_COLLECTION_ID,
  SCHEDULE_ITEMS_COLLECTION_ID,
};
