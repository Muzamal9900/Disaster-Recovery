'use client';


import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import ContractorPitch from '../../../components/pitch/ContractorPitch';

function ContractorPitchPageOriginal() {
  return <ContractorPitch />;
}
export default function ContractorPitchPage() {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <ContractorPitchPageOriginal />;
  }

  return (
    <>
      <AntigravityNavbar />
      <ContractorPitchPageOriginal />
      <AntigravityFooter />
    </>
  );
}
