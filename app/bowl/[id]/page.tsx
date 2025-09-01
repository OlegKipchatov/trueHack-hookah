import { BowlPageClient } from "./page-client";

export type BowlPageProps = { params: { id: string } };
export type BowlPageParams = { id: string };

export const generateStaticParams = async (): Promise<BowlPageParams[]> => {
  return [];
};

const BowlPage = ({ params }: BowlPageProps) => {
  return <BowlPageClient id={params.id} />;
};

export default BowlPage;
