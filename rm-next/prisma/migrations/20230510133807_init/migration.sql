-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "sail_no" TEXT NOT NULL,
    "design" TEXT NOT NULL,
    "tcf" DOUBLE PRECISION NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "finish_time" TIMESTAMP(3) NOT NULL,
    "elapsed" INTEGER NOT NULL,
    "corrected" INTEGER NOT NULL,
    "finishing_place" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "Boat_pkey" PRIMARY KEY ("id")
);
