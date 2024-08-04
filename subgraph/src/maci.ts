import {
  DeployPoll as DeployPollEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  SignUp as SignUpEvent,
} from "../generated/MACI/MACI";
import { DeployPoll, OwnershipTransferred, SignUp } from "../generated/schema";

export function handleDeployPoll(event: DeployPollEvent): void {
  let entity = new DeployPoll(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity._pollId = event.params._pollId;
  entity._coordinatorPubKeyX = event.params._coordinatorPubKeyX;
  entity._coordinatorPubKeyY = event.params._coordinatorPubKeyY;
  entity.pollAddr_poll = event.params.pollAddr.poll;
  entity.pollAddr_messageProcessor = event.params.pollAddr.messageProcessor;
  entity.pollAddr_tally = event.params.pollAddr.tally;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
  let entity = new OwnershipTransferred(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSignUp(event: SignUpEvent): void {
  let entity = new SignUp(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity._stateIndex = event.params._stateIndex;
  entity._userPubKeyX = event.params._userPubKeyX;
  entity._userPubKeyY = event.params._userPubKeyY;
  entity._voiceCreditBalance = event.params._voiceCreditBalance;
  entity._timestamp = event.params._timestamp;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
