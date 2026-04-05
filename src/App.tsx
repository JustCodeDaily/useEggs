import { EggHuntDashboard } from "./components/EggsDashboard";
import { Analytics } from "@vercel/analytics/next"

const Index = () => {
  return (
    <>
        <Analytics/>
        <EggHuntDashboard/>
    </>
  ) 
};

export default Index;
