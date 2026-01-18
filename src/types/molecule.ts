import type { Element } from './element';

export type BondType = 'ionic' | 'covalent' | null;

export type Atom = {
  readonly id: string;
  readonly element: Element;
  readonly x: number;
  readonly y: number;
};

export type Bond = {
  readonly id: string;
  readonly atom1Id: string;
  readonly atom2Id: string;
  readonly type: BondType;
  readonly electrons: number;
};

export type Molecule = {
  readonly atoms: readonly Atom[];
  readonly bonds: readonly Bond[];
  readonly charge: number;
  readonly formula: string;
  readonly name: string | null;
  readonly isStable: boolean;
  readonly shape: string | null;
  readonly polarity: 'polar' | 'nonpolar' | null;
};

export type BondResult = {
  readonly isValid: boolean;
  readonly bondType: BondType;
  readonly electronegativityDiff: number;
  readonly explanation: string;
};
