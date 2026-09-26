import PrivacyPolicyComponent from "@/components/privacy-policy";
import MainLayout from "../pages/_layouts";

function TermOfUsePage() {
  return (
    <MainLayout
      title="Privacy Policy | The Joy Digi"
      description="Read the privacy policy for The Joy Digi."
    >
      <PrivacyPolicyComponent />
    </MainLayout>
  );
}

export default TermOfUsePage;
