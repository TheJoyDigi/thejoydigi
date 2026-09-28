import { episodePaths, episodeProps } from "@/lib/podcasts";

export { default } from "../money-mastered";
export const getStaticPaths = episodePaths("money-mastered");
export const getStaticProps = episodeProps("money-mastered");
