import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1648865504658 implements MigrationInterface {
  name = 'init1648865504658';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comment_entity" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "anime" integer NOT NULL, "episode" integer, "userId" integer, CONSTRAINT "PK_5a439a16c76d63e046765cdb84f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD CONSTRAINT "FK_e391949c5735c084dddcb6e6468" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_e391949c5735c084dddcb6e6468"`,
    );
    await queryRunner.query(`DROP TABLE "comment_entity"`);
    await queryRunner.query(`DROP TABLE "user_entity"`);
  }
}
