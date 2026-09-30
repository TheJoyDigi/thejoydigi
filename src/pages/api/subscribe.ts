import type { NextApiRequest, NextApiResponse } from "next";
import { isNewsletterShow, subscribeToShow } from "@/lib/email/subscribe";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });
  const show = req.body?.show;
  if (!isNewsletterShow(show)) return res.status(400).json({ error: "Choose a show to follow." });
  return subscribeToShow(req, res, show);
}
