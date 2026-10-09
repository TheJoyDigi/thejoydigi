import type { NextApiRequest, NextApiResponse } from "next";
import { isNewsletterShow, subscribeToNewsletter } from "@/lib/email/subscribe";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });
  // `interest` is optional and only tailors the welcome email; `show` is still read for pages cached before the rename.
  const interest = req.body?.interest ?? req.body?.show;
  return subscribeToNewsletter(req, res, isNewsletterShow(interest) ? interest : undefined);
}
