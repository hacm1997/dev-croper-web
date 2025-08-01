import dynamic from "next/dynamic";

const DashboardContainer = dynamic(() => import("@/components/organisms/dashboard/Container"));

export default function Home() {
  return (
    <DashboardContainer />
  )
}
