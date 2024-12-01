/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `access` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "access_token_key" ON "access"("token");
