import { Store as Store_, TypeormDatabase } from "@subsquid/typeorm-store";

export let db = new TypeormDatabase();
export type Store = Store_;

export let dbe = new TypeormDatabase().connect();
