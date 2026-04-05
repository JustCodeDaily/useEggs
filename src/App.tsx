import { EggHuntDashboard } from "./components/EggsDashboard";
import { Analytics } from '@vercel/analytics/react';

const Index = () => {
  return (
    <>
        <Analytics/>
        <EggHuntDashboard/>
    </>
  ) 
};

export default Index;
