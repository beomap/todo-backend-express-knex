/*
  Warnings:

  - A unique constraint covering the columns `[todo_id,user_id]` on the table `todo_assignees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "todo_assignees_todo_id_user_id_key" ON "todo_assignees"("todo_id", "user_id");
