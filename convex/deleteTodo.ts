import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

export default mutation(({ db }, id: Id<"todos">) => {
  db.delete(id);
});
