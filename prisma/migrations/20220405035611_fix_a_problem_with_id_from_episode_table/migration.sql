/*
  Warnings:

  - Added the required column `number` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE "episode_id_seq";
ALTER TABLE "Episode" ADD COLUMN     "number" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('episode_id_seq');
ALTER SEQUENCE "episode_id_seq" OWNED BY "Episode"."id";
