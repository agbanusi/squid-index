import {
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  BlockHeader,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor";
import * as contractAbi from "./abi/ERC721";
import * as erc1155Abi from "./abi/ERC1155";
import * as erc20Abi from "./abi/ERC20";
import { lookupArchive } from "@subsquid/archive-registry";
import { dbe } from "./db";

export const processor = new EvmBatchProcessor()
  .setGateway(lookupArchive("skale-nebula"))
  .setRpcEndpoint({
    // set RPC endpoint in .env
    url: "https://mainnet.skalenodes.com/v1/green-giddy-denebola",
    rateLimit: 10,
  })
  // .setDataSource({
  //   // chain: "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague",
  //   archive: lookupArchive("skale-nebula"),
  // })
  .setFields({
    log: {
      topics: true,
      data: true,
      transactionHash: true,
    },
    transaction: {
      hash: true,
      input: true,
      from: true,
      value: true,
      status: true,
    },
  })
  .setFinalityConfirmation(1)
  .addLog({
    topic0: [
      contractAbi.events.Transfer.topic,
      erc1155Abi.events.TransferBatch.topic,
      erc1155Abi.events.TransferSingle.topic,
      erc20Abi.events.Transfer.topic,
    ],
    // topic1: [
    //     erc1155Abi.events.TransferBatch.topic
    // ],
    range: {
      from: 1,
      to: 311900,
    },
  });

export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
