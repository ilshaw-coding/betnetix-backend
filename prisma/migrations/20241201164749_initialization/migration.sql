-- CreateTable
CREATE TABLE "user" (
    "internal_id" TEXT NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("internal_id")
);

-- CreateTable
CREATE TABLE "access" (
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "internal_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "access_pkey" PRIMARY KEY ("internal_id")
);

-- CreateTable
CREATE TABLE "chat" (
    "internal_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("internal_id")
);

-- CreateTable
CREATE TABLE "_user_to_chat" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_external_id_key" ON "user"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "access_user_id_key" ON "access"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_user_to_chat_AB_unique" ON "_user_to_chat"("A", "B");

-- CreateIndex
CREATE INDEX "_user_to_chat_B_index" ON "_user_to_chat"("B");

-- AddForeignKey
ALTER TABLE "access" ADD CONSTRAINT "access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("internal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_to_chat" ADD CONSTRAINT "_user_to_chat_A_fkey" FOREIGN KEY ("A") REFERENCES "chat"("internal_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_to_chat" ADD CONSTRAINT "_user_to_chat_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("internal_id") ON DELETE CASCADE ON UPDATE CASCADE;
