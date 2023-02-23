-- CreateTable
CREATE TABLE "UserProviderConnections" (
    "id" TEXT NOT NULL,
    "spotify_refresh" TEXT,
    "soundcloud_refresh" TEXT,

    CONSTRAINT "UserProviderConnections_pkey" PRIMARY KEY ("id")
);
