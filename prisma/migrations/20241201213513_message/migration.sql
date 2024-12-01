-- CreateEnum
CREATE TYPE "Type" AS ENUM ('client', 'server');

-- DropIndex
DROP INDEX "access_token_key";

-- CreateTable
CREATE TABLE "message" (
    "text" TEXT NOT NULL,
    "from" "Type" NOT NULL,
    "chat_id" TEXT NOT NULL,
    "user_id" TEXT,
    "internal_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_pkey" PRIMARY KEY ("internal_id")
);

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chat"("internal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("internal_id") ON DELETE SET NULL ON UPDATE CASCADE;
