import { GetStaticProps } from "next";
import LandingComponent from "@/components/landing";
import { getHomeData, type HomeData } from "@/lib/home";
import MainLayout from "./_layouts";

export default function Home({ data }: { data: HomeData }) {
  return (
    <MainLayout>
      <LandingComponent data={data} />
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: { data: getHomeData() } });
