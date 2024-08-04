import { ethers } from "ethers";
import ABI_PATH from "../../../auth-contract-abi/abi.json";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userAddress } = req.body;

  if (!userAddress) {
    return res.status(500).json({ message: "Invalid request" });
  }

  try {
    const provider = new ethers.JsonRpcProvider("https://scroll-sepolia.drpc.org", {
      name: "scrollSepolia",
      chainId: 534351,
    });
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    const contractABI = ABI_PATH;

    const contract = new ethers.Contract(process.env.CONTRACT_AUTH_ADDRESS!, contractABI, wallet);

    const tx = await contract.multiAttest!([userAddress]);

    await tx.wait();

    return res.status(200).json({ message: "Transaction successful", hash: tx.hash });
  } catch (error) {
    console.error("Transaction failed:", error);
    return res.status(500).json({ message: "Transaction failed" });
  }
}
