import { ethers } from "ethers";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { api } from "~/utils/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userAddress } = req.body;

  console.log("Received request for userAddress:", userAddress); // Log incoming request

  if (!userAddress) {
    console.log("Invalid request: No userAddress provided"); // Log invalid request
    return res.status(500).json({ message: "Invalid request" });
  }

  try {
    const provider = new ethers.JsonRpcProvider("https://scroll-sepolia.drpc.org", {
      name: "scrollSepolia",
      chainId: 534351,
    });
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    const easContractAddress = "0xaEF4103A04090071165F78D45D83A0C0782c2B2a";
    const schemaUID = "0xe2636f31239f7948afdd9a9c477048b7fc2a089c347af60e3aa1251e5bf63e5c";
    const eas = new EAS(easContractAddress);

    // Connect the signer
    eas.connect(wallet);
    console.log("Connected to EAS contract at address:", easContractAddress); // Log EAS contract connection

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder("bytes32 type,bytes32 round");
    const encodedData = schemaEncoder.encodeData([
      { name: "type", value: "0x6170706c69636174696f6e000000000000000000000000000000000000000000", type: "bytes32" },
      { name: "round", value: "0x726970652d327200000000000000000000000000000000000000000000000000", type: "bytes32" },
    ]);
    console.log("Encoded data for attestation:", encodedData); // Log encoded data

    // Create the attestation
    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: ethers.getAddress(userAddress),
        expirationTime: ethers.toBigInt(0),
        revocable: true, // Ensure this matches your schema's revocability
        data: encodedData,
      },
    });
    console.log("Attestation transaction created:", tx); // Log transaction creation

    // Wait for the transaction to be mined
    const newAttestationUID = await tx.wait();
    console.log("New attestation UID:", newAttestationUID); // Log attestation UID

    return res.status(200).json({ message: "Transaction successful", newAttestationUID });
  } catch (error) {
    console.error("Transaction failed:", error);
    return res.status(500).json({ message: "Transaction failed" });
  }
}
