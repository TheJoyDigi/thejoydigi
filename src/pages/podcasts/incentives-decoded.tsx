import { GetStaticProps } from "next";
import { IncentivesShow } from "@/components/podcast/incentives-decoded/show-page";
import { getShow } from "@/lib/podcasts";

export default IncentivesShow;
export const getStaticProps: GetStaticProps = async () => ({ props: { show: getShow("incentives-decoded") } });
