import { IncentivesEpisode } from "@/components/podcast/incentives-decoded/episode-page";
import { episodePaths, episodeProps } from "@/lib/podcasts";

export default IncentivesEpisode;
export const getStaticPaths = episodePaths("incentives-decoded");
export const getStaticProps = episodeProps("incentives-decoded");
