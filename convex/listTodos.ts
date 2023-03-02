import { Document } from "./_generated/dataModel";
import { query } from "./_generated/server";

export default query(async ({ db }): Promise<Array<Document<"todos">>> => {
  return await db.query("todos").collect();
});
