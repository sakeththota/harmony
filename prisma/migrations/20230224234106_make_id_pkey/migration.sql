-- DropIndex
DROP INDEX "UserProviderConnections_id_key";

-- AlterTable
ALTER TABLE "UserProviderConnections" ADD CONSTRAINT "UserProviderConnections_pkey" PRIMARY KEY ("id");
