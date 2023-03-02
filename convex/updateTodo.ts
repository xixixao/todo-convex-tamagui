import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

export default mutation(
  (
    { db },
    id: Id<"todos">,
    update: { text?: string; isCompleted?: boolean }
  ) => {
    db.patch(id, update);
  }
);
