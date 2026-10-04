import { ValueCreatedEpisode } from "@/components/podcast/value-created/episode-page";
import { episodePaths, episodeProps } from "@/lib/podcasts";

export default ValueCreatedEpisode;
export const getStaticPaths = episodePaths("value-created");
export const getStaticProps = episodeProps("value-created");
