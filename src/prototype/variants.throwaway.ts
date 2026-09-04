// THROWAWAY. The plan: five variants on the existing route, switchable by
// `variant`.
//
// The register the switcher cycles. A variant appears here the moment its
// ticket lands, and the switcher takes its keys, its names and its order from
// this list, so adding one is an entry rather than a change to the scaffold.
import type React from 'react';
import VariantAEditorial from './VariantAEditorial.throwaway';

export interface PrototypeVariant {
  /** The value of the `variant` search parameter that selects it. */
  key: string;
  /** What the switcher shows beside the key. */
  name: string;
  /** The whole page. It reads the edition through `useContent`, as the site does. */
  Component: React.FC;
}

export const variants: PrototypeVariant[] = [{ key: 'a', name: 'Editorial', Component: VariantAEditorial }];
