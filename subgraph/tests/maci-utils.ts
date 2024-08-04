import { newMockEvent } from "matchstick-as";
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";
import { DeployPoll, OwnershipTransferred, SignUp } from "../generated/MACI/MACI";

export function createDeployPollEvent(
  _pollId: BigInt,
  _coordinatorPubKeyX: BigInt,
  _coordinatorPubKeyY: BigInt,
  pollAddr: ethereum.Tuple,
): DeployPoll {
  let deployPollEvent = changetype<DeployPoll>(newMockEvent());

  deployPollEvent.parameters = new Array();

  deployPollEvent.parameters.push(new ethereum.EventParam("_pollId", ethereum.Value.fromUnsignedBigInt(_pollId)));
  deployPollEvent.parameters.push(
    new ethereum.EventParam("_coordinatorPubKeyX", ethereum.Value.fromUnsignedBigInt(_coordinatorPubKeyX)),
  );
  deployPollEvent.parameters.push(
    new ethereum.EventParam("_coordinatorPubKeyY", ethereum.Value.fromUnsignedBigInt(_coordinatorPubKeyY)),
  );
  deployPollEvent.parameters.push(new ethereum.EventParam("pollAddr", ethereum.Value.fromTuple(pollAddr)));

  return deployPollEvent;
}

export function createOwnershipTransferredEvent(previousOwner: Address, newOwner: Address): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(newMockEvent());

  ownershipTransferredEvent.parameters = new Array();

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("previousOwner", ethereum.Value.fromAddress(previousOwner)),
  );
  ownershipTransferredEvent.parameters.push(new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner)));

  return ownershipTransferredEvent;
}

export function createSignUpEvent(
  _stateIndex: BigInt,
  _userPubKeyX: BigInt,
  _userPubKeyY: BigInt,
  _voiceCreditBalance: BigInt,
  _timestamp: BigInt,
): SignUp {
  let signUpEvent = changetype<SignUp>(newMockEvent());

  signUpEvent.parameters = new Array();

  signUpEvent.parameters.push(new ethereum.EventParam("_stateIndex", ethereum.Value.fromUnsignedBigInt(_stateIndex)));
  signUpEvent.parameters.push(new ethereum.EventParam("_userPubKeyX", ethereum.Value.fromUnsignedBigInt(_userPubKeyX)));
  signUpEvent.parameters.push(new ethereum.EventParam("_userPubKeyY", ethereum.Value.fromUnsignedBigInt(_userPubKeyY)));
  signUpEvent.parameters.push(
    new ethereum.EventParam("_voiceCreditBalance", ethereum.Value.fromUnsignedBigInt(_voiceCreditBalance)),
  );
  signUpEvent.parameters.push(new ethereum.EventParam("_timestamp", ethereum.Value.fromUnsignedBigInt(_timestamp)));

  return signUpEvent;
}
