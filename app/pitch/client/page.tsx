'use client';


import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import ClientPitch from '../../../components/pitch/ClientPitch';

function ClientPitchPageOriginal() {
  return <ClientPitch />;
}
export default function ClientPitchPage() {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <ClientPitchPageOriginal />;
  }

  return (
    <>
      <AntigravityNavbar />
      <ClientPitchPageOriginal />
      <AntigravityFooter />
    </>
  );
}
