module.exports = class Data1695927653783 {
    name = 'Data1695927653783'

    async up(db) {
        await db.query(`CREATE TABLE "contract_event_transfer" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, "contract" text NOT NULL, "event_name" text NOT NULL, "last_owner" text NOT NULL, "owner" text NOT NULL, "token_id" numeric NOT NULL, CONSTRAINT "PK_e707a572fb447fc7d06c8c68be8" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_5cad8ebf880d2f4b946ea3b5df" ON "contract_event_transfer" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_c58c60b9116c57a906183795d6" ON "contract_event_transfer" ("block_timestamp") `)
        await db.query(`CREATE INDEX "IDX_13453829034c1043450bd22aef" ON "contract_event_transfer" ("transaction_hash") `)
        await db.query(`CREATE INDEX "IDX_2ba2d6163cda7ec75cbc30f948" ON "contract_event_transfer" ("contract") `)
        await db.query(`CREATE INDEX "IDX_4dbc0481c395b826a3723bec98" ON "contract_event_transfer" ("event_name") `)
        await db.query(`CREATE INDEX "IDX_f96d41a958cb7a1a7a894d4d9c" ON "contract_event_transfer" ("last_owner") `)
        await db.query(`CREATE INDEX "IDX_8ea287d68be8f0565805947e0c" ON "contract_event_transfer" ("owner") `)
        await db.query(`CREATE INDEX "IDX_1d4e72711a71e57c62b1bc982a" ON "contract_event_transfer" ("token_id") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "contract_event_transfer"`)
        await db.query(`DROP INDEX "public"."IDX_5cad8ebf880d2f4b946ea3b5df"`)
        await db.query(`DROP INDEX "public"."IDX_c58c60b9116c57a906183795d6"`)
        await db.query(`DROP INDEX "public"."IDX_13453829034c1043450bd22aef"`)
        await db.query(`DROP INDEX "public"."IDX_2ba2d6163cda7ec75cbc30f948"`)
        await db.query(`DROP INDEX "public"."IDX_4dbc0481c395b826a3723bec98"`)
        await db.query(`DROP INDEX "public"."IDX_f96d41a958cb7a1a7a894d4d9c"`)
        await db.query(`DROP INDEX "public"."IDX_8ea287d68be8f0565805947e0c"`)
        await db.query(`DROP INDEX "public"."IDX_1d4e72711a71e57c62b1bc982a"`)
    }
}
