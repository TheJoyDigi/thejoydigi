import { DefaultSEO } from "@/components/seo";
import { SiteFrame } from "@/components/marketing/site-chrome";
import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  /** Set for utility/internal pages that must not be indexed (auth callbacks, test pages, etc.). */
  noindex?: boolean;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, image, noindex }) => {
  return (
    <>
      <DefaultSEO title={title} description={description} image={image} noindex={noindex} />
      <SiteFrame>{children}</SiteFrame>
    </>
  );
};

export default MainLayout;
