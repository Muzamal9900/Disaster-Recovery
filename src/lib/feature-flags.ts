/**
 * Feature Flags — Antigravity UI Migration
 *
 * Toggle NEXT_PUBLIC_ANTIGRAVITY_UI in the Vercel environment to
 * enable or disable the new Antigravity design system on public pages.
 *
 * Instant rollback: set NEXT_PUBLIC_ANTIGRAVITY_UI=false in Vercel.
 */

export const FEATURE_FLAGS = {
  ANTIGRAVITY_UI: process.env.NEXT_PUBLIC_ANTIGRAVITY_UI === 'true',
} as const;
