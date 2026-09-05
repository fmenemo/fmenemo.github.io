// THROWAWAY. The plan: five variants on the existing route, switchable by
// `variant`.
//
// The register the switcher cycles. It carries the five keys #26 asks for from
// the start, so the cycle is a cycle from the first ticket rather than a fixed
// point that only becomes one when the second variant lands: the arrows, the
// wrap and the URL rewrite are all things Fran can see on the dev server today.
//
// A ticket that draws a variant replaced its entry, the name and the component
// together. All five are drawn now, so the placeholder the empty slots pointed
// at is gone with them.
import type React from 'react';
import VariantAEditorial from './VariantAEditorial.throwaway';
import VariantBCleanProduct from './VariantBCleanProduct.throwaway';
import VariantCBoldAndRaw from './VariantCBoldAndRaw.throwaway';
import VariantDWarmQuiet from './VariantDWarmQuiet.throwaway';
import VariantERecord from './VariantERecord.throwaway';

export interface PrototypeVariant {
  /** The value of the `variant` search parameter that selects it. */
  key: string;
  /** What the switcher shows beside the key. */
  name: string;
  /** The whole page. It reads the edition through `useContent`, as the site does. */
  Component: React.FC;
}

export const variants: PrototypeVariant[] = [
  { key: 'a', name: 'Editorial', Component: VariantAEditorial },
  { key: 'b', name: 'Clean product', Component: VariantBCleanProduct },
  { key: 'c', name: 'Bold and raw', Component: VariantCBoldAndRaw },
  { key: 'd', name: 'Warm and quiet', Component: VariantDWarmQuiet },
  { key: 'e', name: 'The record', Component: VariantERecord },
];
