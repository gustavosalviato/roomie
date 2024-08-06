-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "resources" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Period" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "room_id" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    CONSTRAINT "Period_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canceled_at" DATETIME,
    CONSTRAINT "Reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");
