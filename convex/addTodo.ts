import { mutation } from "./_generated/server";

export default mutation(({ db }, { text }: { text: string }) => {
  db.insert("todos", { text, isCompleted: false });
});
