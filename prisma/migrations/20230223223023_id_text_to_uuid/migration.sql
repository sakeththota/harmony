/*
  Warnings:

  - The primary key for the `UserProviderConnections` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `UserProviderConnections` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id` on the `UserProviderConnections` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserProviderConnections" DROP CONSTRAINT "UserProviderConnections_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserProviderConnections_id_key" ON "UserProviderConnections"("id");
