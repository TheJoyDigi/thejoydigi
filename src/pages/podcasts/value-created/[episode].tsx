import { episodePaths, episodeProps } from "@/lib/podcasts";

export { default } from "../value-created";
export const getStaticPaths = episodePaths("value-created");
export const getStaticProps = episodeProps("value-created");
