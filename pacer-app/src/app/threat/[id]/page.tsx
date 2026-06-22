import { THREATS, getThreat } from "@/lib/data";
import { notFound } from "next/navigation";
import ThreatClient from "./ThreatClient";

export function generateStaticParams() {
  return THREATS.map((thr) => ({ id: thr.id }));
}

export default async function ThreatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const threat = getThreat(id);
  if (!threat) notFound();

  return <ThreatClient threat={threat} />;
}
