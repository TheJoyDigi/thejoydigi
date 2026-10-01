import type { NextApiRequest, NextApiResponse } from "next";
import { subscribeToShow } from "@/lib/email/subscribe";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return subscribeToShow(req, res, "anthropic-blogcast");
}
