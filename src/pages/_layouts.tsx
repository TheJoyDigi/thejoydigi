import { DefaultSEO } from "@/components/seo";
import { SiteFrame } from "@/components/marketing/site-chrome";
import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, image }) => {
  return (
    <>
      <DefaultSEO title={title} description={description} image={image} />
      <SiteFrame>{children}</SiteFrame>
    </>
  );
};

export default MainLayout;
