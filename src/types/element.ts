export type ElementCategory =
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition-metal'
  | 'post-transition'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide';

export type Element = {
  readonly symbol: string;
  readonly name: string;
  readonly atomicNumber: number;
  readonly atomicMass: number;
  readonly electronConfig: string;
  readonly group: number | null;
  readonly period: number;
  readonly category: ElementCategory;
  readonly electronegativity: number | null;
  readonly ionizationEnergy: number | null;
  readonly electronAffinity: number | null;
  readonly atomicRadius: number | null;
  readonly oxidationStates: readonly number[];
  readonly valenceElectrons: number;
  readonly uses?: readonly string[];
};
