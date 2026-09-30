import { episodePaths, episodeProps } from "@/lib/podcasts";

export { default } from "../anthropic-blogcast";
export const getStaticPaths = episodePaths("anthropic-blogcast");
export const getStaticProps = episodeProps("anthropic-blogcast");
