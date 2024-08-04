import { assert, describe, test, clearStore, beforeAll, afterAll } from "matchstick-as/assembly/index";
import { BigInt, Address } from "@graphprotocol/graph-ts";
import { DeployPoll } from "../generated/schema";
import { DeployPoll as DeployPollEvent } from "../generated/MACI/MACI";
import { handleDeployPoll } from "../src/maci";
import { createDeployPollEvent } from "./maci-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _pollId = BigInt.fromI32(234);
    let _coordinatorPubKeyX = BigInt.fromI32(234);
    let _coordinatorPubKeyY = BigInt.fromI32(234);
    let pollAddr = "ethereum.Tuple Not implemented";
    let newDeployPollEvent = createDeployPollEvent(_pollId, _coordinatorPubKeyX, _coordinatorPubKeyY, pollAddr);
    handleDeployPoll(newDeployPollEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DeployPoll created and stored", () => {
    assert.entityCount("DeployPoll", 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals("DeployPoll", "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1", "_pollId", "234");
    assert.fieldEquals("DeployPoll", "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1", "_coordinatorPubKeyX", "234");
    assert.fieldEquals("DeployPoll", "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1", "_coordinatorPubKeyY", "234");
    assert.fieldEquals(
      "DeployPoll",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pollAddr",
      "ethereum.Tuple Not implemented",
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
