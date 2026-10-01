import TermsOfUseComponent from "@/components/terms-of-use";
import MainLayout from "../pages/_layouts";

function TermOfUsePage() {
  return (
    <MainLayout
      title="Terms of Use | The Joy Digi"
      description="Read the terms of use for The Joy Digi."
    >
      <TermsOfUseComponent />
    </MainLayout>
  );
}

export default TermOfUsePage;
