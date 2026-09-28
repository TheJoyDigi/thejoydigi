import { episodePaths, episodeProps } from "@/lib/podcasts";

export { default } from "../oc-pack";
export const getStaticPaths = episodePaths("oc-pack");
export const getStaticProps = episodeProps("oc-pack");
