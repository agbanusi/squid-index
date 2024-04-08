import {DataHandlerContext} from '@subsquid/evm-processor'
import {Store} from '../db'
import {EntityBuffer} from '../entityBuffer'
import {ContractEventTransfer, ERC1155EventTransfer, ERC20EventTransfer} from '../model'
import * as spec from '../abi/ERC721'
import {Log} from '../processor'
import * as spec1155 from '../abi/ERC1155'
import * as spec20 from '../abi/ERC20'
import { FindOneOptions } from '@subsquid/typeorm-store'
import { contract } from '.'

export async function parseEvent(ctx: DataHandlerContext<Store>, log: Log) {
    try {
        switch (log.topics[0]) {
            case spec.events.Transfer.topic: {
                try{
                    const { from, to, tokenId } = spec.events.Transfer.decode(log)
                    // const { from: from20, to: to20, value } = spec20.events.Transfer.decode(log)
                    // console.log(`${log.transactionHash} tokenId: ${tokenId}, value: ${value}`)
                    EntityBuffer.add(
                        new ContractEventTransfer({
                            id: `${log.address} ${tokenId}`,
                            blockNumber: log.block.height,
                            blockTimestamp: new Date(log.block.timestamp),
                            transactionHash: log.transactionHash,
                            contract: log.address,
                            eventName: 'Transfer',
                            lastOwner: from,
                            owner: to,
                            tokenId: tokenId,
                        })
                    )
                    break;

                } catch (err) {
                    //since ERC20 and ERC721 has the same event which is "Transfer" we are trying first to decode its as ERC721 and then if it fails we try to decode it as ERC20
                    try{
                        // console.log('it is an erc20')
                        let { from, to, value } = spec20.events.Transfer.decode(log)
                        //search if the to address already has the token, if so, add amount, if not create one
                        const searchReceiverQuery = {
                            where: {
                                owner: to
                            }
                        }
                        const searchReceiver = await ctx.store.findOne(ERC20EventTransfer, searchReceiverQuery)

                        if(searchReceiver){
                            // console.log('owner for erc20 found, updating it')
                            const { value: oldValue } = searchReceiver
                            const updatedValue = oldValue + value;
                            EntityBuffer.add(
                                new ERC20EventTransfer({
                                    id: `${to} ${log.address}`,
                                    blockNumber: log.block.height,
                                    blockTimestamp: new Date(log.block.timestamp),
                                    transactionHash: log.transactionHash,
                                    contract: log.address,
                                    eventName: 'Transfer',
                                    lastReceived: from,
                                    owner: to,
                                    value: updatedValue
                                })
                            )
                        } else {
                            // console.log('owner for erc20 not found, creating it')
                            EntityBuffer.add(
                                new ERC20EventTransfer({
                                    id: `${to} ${log.address}`,
                                    blockNumber: log.block.height,
                                    blockTimestamp: new Date(log.block.timestamp),
                                    transactionHash: log.transactionHash,
                                    contract: log.address,
                                    eventName: 'Transfer',
                                    lastReceived: from,
                                    owner: to,
                                    value: value
                                })
                            )
                        }
                        
                        //search if the from address already has the token, if so, subtract amount, if not create one

                        const searchSenderQuery = {
                            where: {
                                owner: from
                            }
                        }

                        const searchSender = await ctx.store.findOne(ERC20EventTransfer, searchSenderQuery)
                        
                        if(searchSender){
                            // console.log('sender for erc20 found, updating it')
                            const { value: oldValue } = searchSender
                            const updatedValue = oldValue - value;
                            EntityBuffer.add(
                                new ERC20EventTransfer({
                                    id: `${from} ${log.address}`,
                                    blockNumber: log.block.height,
                                    blockTimestamp: new Date(log.block.timestamp),
                                    transactionHash: log.transactionHash,
                                    contract: log.address,
                                    eventName: 'Transfer',
                                    lastReceived: from,
                                    owner: from,
                                    value: updatedValue
                                })
                            )
                        } else {
                            // console.log('sender for erc20 not found, creating it')
                            EntityBuffer.add(
                                new ERC20EventTransfer({
                                    id: `${from} ${log.address}`,
                                    blockNumber: log.block.height,
                                    blockTimestamp: new Date(log.block.timestamp),
                                    transactionHash: log.transactionHash,
                                    contract: log.address,
                                    eventName: 'Transfer',
                                    lastReceived: from,
                                    owner: from,
                                    value: -value
                                })
                            )
                        }
                        
                        break;
                    } catch (error) {
                        console.log("ERROR", error)
                        break;
                    }
                }
            }
            case spec1155.events.TransferBatch.topic: {
                let topic = spec1155.events.TransferBatch.decode(log)
                let from = topic[1]
                let to = topic[2]
                let ids = topic[3]
                let values = topic[4]

                for(const [index, tokenId] of ids.entries()){
                    const searchOwnerQuery: FindOneOptions<ERC1155EventTransfer> = {
                        where: {
                            owner: to,
                            contract: log.address,
                            tokenId: tokenId
                        }
                    }

                    const searchOwner = await ctx.store.findOne(ERC1155EventTransfer, searchOwnerQuery)

                    if(searchOwner){
                        // console.log('owner found')
                        const { value: oldValue } = searchOwner
                        const updatedValue = oldValue + values[index];
                        EntityBuffer.add(
                            new ERC1155EventTransfer({
                                id: `${to} ${log.address} ${tokenId}`,
                                blockNumber: log.block.height,
                                blockTimestamp: new Date(log.block.timestamp),
                                transactionHash: log.transactionHash,
                                contract: log.address,
                                eventName: 'TransferBatch',
                                lastOwner: from,
                                owner: to,
                                tokenId: tokenId,
                                value: updatedValue
                            })
                        )
                    } else {
                        // console.log('owner not found')
                        EntityBuffer.add(
                            new ERC1155EventTransfer({
                                id: `${to} ${log.address} ${tokenId}`,
                                blockNumber: log.block.height,
                                blockTimestamp: new Date(log.block.timestamp),
                                transactionHash: log.transactionHash,
                                contract: log.address,
                                eventName: 'TransferBatch',
                                lastOwner: from,
                                owner: to,
                                tokenId: tokenId,
                                value: values[index]
                            })
                        )
                    }

                    const searchLastOwnerQuery: FindOneOptions<ERC1155EventTransfer> = {
                        where: {
                            owner: from,
                            contract: log.address,
                            tokenId: tokenId
                        }
                    }
                    
                    const searchLastOwner = await ctx.store.findOne(ERC1155EventTransfer, searchLastOwnerQuery)

                    if(searchLastOwner){
                        // console.log('last owner found')
                        const { value: oldValue } = searchLastOwner
                        const updatedValue = oldValue - values[index];
                        EntityBuffer.add(
                            new ERC1155EventTransfer({
                                id: `${from} ${log.address} ${tokenId}`,
                                blockNumber: log.block.height,
                                blockTimestamp: new Date(log.block.timestamp),
                                transactionHash: log.transactionHash,
                                contract: log.address,
                                eventName: 'TransferBatch',
                                lastOwner: from,
                                owner: from,
                                tokenId: tokenId,
                                value: updatedValue
                            })
                        )
                    }else{
                        // console.log('lastOwner not found, creating it')
                        EntityBuffer.add(
                            new ERC1155EventTransfer({
                                id: `${from} ${log.address} ${tokenId}`,
                                blockNumber: log.block.height,
                                blockTimestamp: new Date(log.block.timestamp),
                                transactionHash: log.transactionHash,
                                contract: log.address,
                                eventName: 'TransferBatch',
                                lastOwner: from,
                                owner: from,
                                tokenId: tokenId,
                                value: -values[index]
                            })
                        )
                    }

                }
                console.log(values)
                console.log('transferbatch')
                break;
            }
            case spec1155.events.TransferSingle.topic: {
                let { from, to, id, value} = spec1155.events.TransferSingle.decode(log)

                // A: 1 B: 1
                // UPDATES
                // A: 2 B: 0

                // A: 0 B: 2


                //search if the owner already has the tokenId, if so just add amount, if not create one
                
                //search if the lastOwner already has the tokenId, if so just subtract amount, if not create one
                
                const searchOwnerQuery: FindOneOptions<ERC1155EventTransfer> = {
                    where: {
                        owner: to,
                        contract: log.address,
                        tokenId: id
                    }
                }


                const searchOwner = await ctx.store.findOne(ERC1155EventTransfer, searchOwnerQuery)

                if(searchOwner){
                    // console.log('owner found')
                    const { value: oldValue } = searchOwner
                    const updatedValue = oldValue + value;
                    EntityBuffer.add(
                        new ERC1155EventTransfer({
                            id: `${to} ${log.address} ${id}`,
                            blockNumber: log.block.height,
                            blockTimestamp: new Date(log.block.timestamp),
                            transactionHash: log.transactionHash,
                            contract: log.address,
                            eventName: 'TransferSingle',
                            lastOwner: from,
                            owner: to,
                            tokenId: id,
                            value: updatedValue
                        })
                    )
                } else {
                    // console.log('owner not found, creating it')
                    EntityBuffer.add(
                        new ERC1155EventTransfer({
                            id: `${to} ${log.address} ${id}`,
                            blockNumber: log.block.height,
                            blockTimestamp: new Date(log.block.timestamp),
                            transactionHash: log.transactionHash,
                            contract: log.address,
                            eventName: 'TransferSingle',
                            lastOwner: from,
                            owner: to,
                            tokenId: id,
                            value: value
                        })
                    )
                }

                const searchLastOwnerQuery: FindOneOptions<ERC1155EventTransfer> = {
                    where: {
                        owner: from,
                        contract: log.address,
                        tokenId: id
                    }
                }

                const searchLastOWner = await ctx.store.findOne(ERC1155EventTransfer, searchLastOwnerQuery)

                if(searchLastOWner){
                    // console.log('lastOwner found')
                    const { value: oldValue, lastOwner } = searchLastOWner
                    const updatedValue = oldValue - value;
                    EntityBuffer.add(
                        new ERC1155EventTransfer({
                            id: `${from} ${log.address} ${id}`,
                            blockNumber: log.block.height,
                            blockTimestamp: new Date(log.block.timestamp),
                            transactionHash: log.transactionHash,
                            contract: log.address,
                            eventName: 'TransferSingle',
                            lastOwner: lastOwner,
                            owner: from,
                            tokenId: id,
                            value: updatedValue
                        })
                    )
                }else{
                    // console.log('lastOwner not found, creating it')
                    EntityBuffer.add(
                        new ERC1155EventTransfer({
                            id: `${from} ${log.address} ${id}`,
                            blockNumber: log.block.height,
                            blockTimestamp: new Date(log.block.timestamp),
                            transactionHash: log.transactionHash,
                            contract: log.address,
                            eventName: 'TransferSingle',
                            lastOwner: from,
                            owner: from,
                            tokenId: id,
                            value: -value
                        })
                    )
                }
                break;
            }
        }
    }
    catch (error) {
        console.log('ERROR', error)
    }
}