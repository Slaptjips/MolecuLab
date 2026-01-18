import type { Element } from '../types/element';
import type { BondResult } from '../types/molecule';

/**
 * Get valence electrons for an element
 * Pure function - no side effects
 */
export const getValenceElectrons = (element: Element): number => {
  return element.valenceElectrons;
};

/**
 * Determine if a bond is ionic based on electronegativity difference
 * Pure function - no side effects
 * Ionic if ΔEN > 1.7
 */
export const isBondIonic = (element1: Element, element2: Element): boolean => {
  if (element1.electronegativity === null || element2.electronegativity === null) {
    return false;
  }
  const deltaEN = Math.abs(element1.electronegativity - element2.electronegativity);
  return deltaEN > 1.7;
};

/**
 * Validate a chemical bond between two atoms
 * Pure function - no side effects
 */
export const validateBond = (atom1: Element, atom2: Element): BondResult => {
  const en1 = atom1.electronegativity ?? 0;
  const en2 = atom2.electronegativity ?? 0;
  const electronegativityDiff = Math.abs(en1 - en2);

  const bondType = isBondIonic(atom1, atom2) ? 'ionic' : 'covalent';

  let explanation = '';
  if (bondType === 'ionic') {
    explanation = `${electronegativityDiff.toFixed(2)} electronegativity difference indicates an ionic bond`;
  } else if (electronegativityDiff > 0.5) {
    explanation = `${electronegativityDiff.toFixed(2)} electronegativity difference indicates a polar covalent bond`;
  } else {
    explanation = `${electronegativityDiff.toFixed(2)} electronegativity difference indicates a nonpolar covalent bond`;
  }

  return {
    isValid: true,
    bondType,
    electronegativityDiff,
    explanation,
  };
};

/**
 * Determine oxidation state of an element in a compound
 * Simplified version - calculates common oxidation states
 * Pure function - no side effects
 */
export const determineOxidationState = (
  element: Element,
  _compound: readonly { readonly element: string; readonly count: number }[]
): number | null => {
  // Check if element's common oxidation states are available
  if (element.oxidationStates.length > 0) {
    // Return the first common oxidation state
    // In a full implementation, this would analyze the compound structure
    return element.oxidationStates[0];
  }
  return null;
};

/**
 * Calculate formal charge on an atom
 * Simplified version for educational purposes
 * Pure function - no side effects
 */
export const calculateFormalCharge = (
  valenceElectrons: number,
  bonds: number,
  lonePairs: number
): number => {
  // Formal charge = valence electrons - bonds - lone pairs
  return valenceElectrons - bonds - lonePairs * 2;
};

/**
 * Determine molecular shape using VSEPR theory
 * Simplified version for common molecules
 * Pure function - no side effects
 */
export const getMolecularShape = (
  _centralAtom: Element,
  bondedAtoms: number,
  lonePairs: number
): string => {
  const totalElectronPairs = bondedAtoms + lonePairs;

  if (totalElectronPairs === 2 && lonePairs === 0) return 'Linear';
  if (totalElectronPairs === 2 && lonePairs === 2) return 'Bent';
  if (totalElectronPairs === 3 && lonePairs === 0) return 'Trigonal Planar';
  if (totalElectronPairs === 3 && lonePairs === 1) return 'Bent';
  if (totalElectronPairs === 4 && lonePairs === 0) return 'Tetrahedral';
  if (totalElectronPairs === 4 && lonePairs === 1) return 'Trigonal Pyramidal';
  if (totalElectronPairs === 4 && lonePairs === 2) return 'Bent';
  if (totalElectronPairs === 5 && lonePairs === 0) return 'Trigonal Bipyramidal';
  if (totalElectronPairs === 6 && lonePairs === 0) return 'Octahedral';

  return 'Unknown';
};
