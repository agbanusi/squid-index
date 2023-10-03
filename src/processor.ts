import {EvmBatchProcessor, EvmBatchProcessorFields, BlockHeader, Log as _Log, Transaction as _Transaction} from '@subsquid/evm-processor'
import {lookupArchive} from '@subsquid/archive-registry'
import * as contractAbi from './abi/ERC721'

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('eth-mainnet', {type: 'EVM'}),
    })
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
        }
    })
    .addLog({
        topic0: [
            contractAbi.events.['Transfer'].topic,
        ],
        range: {
            from: 18000000,
        },
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
