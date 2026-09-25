import Site from "@/components/Site";
import { getSiteData } from "@/lib/site";

export const revalidate = 60;

export default async function Page() {
  const data = await getSiteData();
  return <Site data={data} />;
}
