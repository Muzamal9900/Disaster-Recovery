'use client';


import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
// Investor Pitch - Powerful storytelling version with emotional narrative
import PitchDeckPowerful from '../../../components/pitch/PitchDeckPowerful';

function InvestorPitchPageOriginal() {
  return <PitchDeckPowerful />;
}
export default function InvestorPitchPage() {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <InvestorPitchPageOriginal />;
  }

  return (
    <>
      <AntigravityNavbar />
      <InvestorPitchPageOriginal />
      <AntigravityFooter />
    </>
  );
}
