-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_tokens" (
    "id" TEXT NOT NULL,
    "access_token_service" TEXT NOT NULL,
    "access_token_client" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "access_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "access_tokens_access_token_service_key" ON "access_tokens"("access_token_service");

-- CreateIndex
CREATE UNIQUE INDEX "access_tokens_access_token_client_key" ON "access_tokens"("access_token_client");

-- CreateIndex
CREATE UNIQUE INDEX "access_tokens_user_id_key" ON "access_tokens"("user_id");

-- AddForeignKey
ALTER TABLE "access_tokens" ADD CONSTRAINT "access_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
