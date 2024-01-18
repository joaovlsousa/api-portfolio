-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "github_url" TEXT NOT NULL,
    "deploy_url" TEXT,
    "image_url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_github_url_key" ON "projects"("github_url");

-- CreateIndex
CREATE UNIQUE INDEX "projects_deploy_url_key" ON "projects"("deploy_url");

-- CreateIndex
CREATE UNIQUE INDEX "projects_image_url_key" ON "projects"("image_url");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
