import {DataHandlerContext} from '@subsquid/evm-processor'
import {Store} from '../db'
import {EntityBuffer} from '../entityBuffer'
import {ContractEventTransfer} from '../model'
import * as spec from '../abi/ERC721'
import {Log} from '../processor'

export function parseEvent(ctx: DataHandlerContext<Store>, log: Log) {
    try {
        switch (log.topics[0]) {
            case spec.events['Transfer'].topic: {
                let e = spec.events['Transfer'].decode(log)
                EntityBuffer.add(
                    new ContractEventTransfer({
                        id: `${log.address} ${e[2]}`,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Transfer',
                        lastOwner: e[0],
                        owner: e[1],
                        tokenId: e[2],
                    })
                )
                break
            }
        }
    }
    catch (error) {
    }
}