/*
  Warnings:

  - A unique constraint covering the columns `[org_id,user_id]` on the table `org_members` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "org_members_org_id_user_id_key" ON "org_members"("org_id", "user_id");
