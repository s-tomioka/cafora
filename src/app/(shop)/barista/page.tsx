import { Metadata } from "next";

import { BaristaHero } from "@/components/barista/barista-hero";
import { BaristaEmpathy } from "@/components/barista/barista-empathy";
import { BaristarProblem } from "@/components/barista/barista-problem";
import { BaristaPhilosophy } from "@/components/barista/barista-philosophy";
import { BaristaCoCreation } from "@/components/barista/barista-cocreation";
import { BaristaExperience } from "@/components/barista/barista-experience";
import { BaristaConclusion } from "@/components/barista/barista-conclusion";
import { BaristatCTA } from "@/components/barista/barista-cta";

export const metadata: Metadata = {
  title: "WITH BARISTAS | バリスタと共に、器をつくる",
  description:
    "一杯にこだわるほど、違和感が残る。その感覚から、CAFORAの器づくりは始まりました。バリスタと共に、器から体験を設計するCAFORAのプロセスをご紹介します。",
};

export default function BaristaPage() {
  return (
    <div className="bg-background text-foreground">
      {/* ── Hero / Intro ── */}
      <BaristaHero />

      {/* ── Section 01: 共感 - 一杯にこだわるほど、違和感が残る ── */}
      <BaristaEmpathy />

      {/* ── Section 02: 問題提起 - 味は、抽出だけで決まっているのか ── */}
      <BaristarProblem />

      {/* ── Section 03: 思想 - 器から、味を設計する（CAFORA思想） ── */}
      <BaristaPhilosophy />

      {/* ── Section 04: 共創 - バリスタと共に、試作を重ねる ── */}
      <BaristaCoCreation />

      {/* ── Section 06: 体験の違い - この器で出す、一杯の違い ── */}
      <BaristaExperience />

      {/* ── Section 07: 結論 - 一杯は、器で完成する ── */}
      <BaristaConclusion />

      {/* ── Section 08: CTA - 共に、つくりませんか ── */}
      <BaristatCTA />
    </div>
  );
}
