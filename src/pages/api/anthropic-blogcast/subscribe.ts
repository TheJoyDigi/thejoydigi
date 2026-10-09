import type { NextApiRequest, NextApiResponse } from "next";
import { subscribeToNewsletter } from "@/lib/email/subscribe";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return subscribeToNewsletter(req, res, "anthropic-blogcast");
}
