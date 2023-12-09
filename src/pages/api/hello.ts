import type { NextApiRequest, NextApiResponse } from "next";
import lighthouse from "@lighthouse-web3/sdk";

const API_KEY = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;
const name = "Ranaco";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const response = await lighthouse.uploadText(
        JSON.stringify(req.body),
        API_KEY!,
        name,
      );
      res.status(200).json(response);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
