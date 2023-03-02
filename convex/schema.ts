import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
  todos: defineTable({
    text: s.string(),
    isCompleted: s.boolean(),
  }),
});
