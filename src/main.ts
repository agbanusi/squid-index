import { contract } from "./mapping";
import { processor } from "./processor";
import { db } from "./db";
import { EntityBuffer } from "./entityBuffer";
import { Entity } from "@subsquid/typeorm-store";

processor.run(db, async (ctx) => {
  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      await contract.parseEvent(ctx, log);

      for (let entities of EntityBuffer.flush()) {
        // const uniqueEntitiesArray = removeDuplicatedEntities(entities);
        await ctx.store.save(entities);
      }
      await contract.parseEvent(ctx, log)
    }
    // await ctx.store.insert(block.logs);
    
  }
});

const removeDuplicatedEntities = (entities: Entity[]) => {
  interface uniqueEntities {
    [id: string]: Entity;
  }
  const uniqueEntities: uniqueEntities = {};
  for (let i = entities.length - 1; i >= 0; i--) {
    const entitie = entities[i];
    const id = entitie.id;
    if (!uniqueEntities[id]) {
      uniqueEntities[id] = entitie;
    }
  }
  const uniqueEntitiesArray = Object.values(uniqueEntities);
  return uniqueEntitiesArray;
};
