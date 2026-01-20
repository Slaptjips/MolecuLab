import type { Atom, Bond } from '../types/molecule';
import type { Element } from '../types/element';

/**
 * Calculate maximum number of bonds an atom can form
 * Pure function - no side effects
 */
export const getMaxBonds = (element: Element): number => {
  // Hydrogen: 1 bond (duet rule)
  if (element.atomicNumber === 1) return 1;
  
  // Standard octet rule: valence electrons determine max bonds
  // But some elements can form more bonds than valence electrons suggest
  const valence = element.valenceElectrons;
  
  // Common maximum bonds for elements
  const maxBondsMap: Record<string, number> = {
    'H': 1,
    'C': 4,
    'N': 4, // Can form 4 bonds (e.g., NH4+)
    'O': 2,
    'F': 1,
    'P': 5, // Can expand octet
    'S': 6, // Can expand octet
    'Cl': 1, // Typically 1, but can expand in some cases
    'Br': 1,
    'I': 1,
  };
  
  if (maxBondsMap[element.symbol]) {
    return maxBondsMap[element.symbol];
  }
  
  // Default: valence electrons (octet rule)
  return Math.min(valence, 8);
};

/**
 * Count current bonds for an atom
 * Pure function - no side effects
 */
export const countAtomBonds = (atomId: string, bonds: readonly Bond[]): number => {
  return bonds.filter(
    (b) => b.atom1Id === atomId || b.atom2Id === atomId
  ).length;
};

/**
 * Count total bond order for an atom (sum of all bond orders)
 * Pure function - no side effects
 */
export const getTotalBondOrder = (atomId: string, bonds: readonly Bond[]): number => {
  return bonds
    .filter((b) => b.atom1Id === atomId || b.atom2Id === atomId)
    .reduce((sum, b) => sum + b.order, 0);
};

/**
 * Validate if a new bond can be formed between two atoms
 * Pure function - no side effects
 */
export const canFormBond = (
  atom1: Atom,
  atom2: Atom,
  existingBonds: readonly Bond[]
): { canForm: boolean; reason?: string } => {
  const atom1Bonds = countAtomBonds(atom1.id, existingBonds);
  const atom2Bonds = countAtomBonds(atom2.id, existingBonds);
  
  const atom1MaxBonds = getMaxBonds(atom1.element);
  const atom2MaxBonds = getMaxBonds(atom2.element);
  
  // Check if atoms are already at maximum bonds
  if (atom1Bonds >= atom1MaxBonds) {
    return {
      canForm: false,
      reason: `${atom1.element.symbol} already has maximum bonds (${atom1MaxBonds})`,
    };
  }
  
  if (atom2Bonds >= atom2MaxBonds) {
    return {
      canForm: false,
      reason: `${atom2.element.symbol} already has maximum bonds (${atom2MaxBonds})`,
    };
  }
  
  // Check if bond already exists
  const bondExists = existingBonds.some(
    (b) =>
      (b.atom1Id === atom1.id && b.atom2Id === atom2.id) ||
      (b.atom1Id === atom2.id && b.atom2Id === atom1.id)
  );
  
  if (bondExists) {
    return {
      canForm: false,
      reason: 'Bond already exists',
    };
  }
  
  return { canForm: true };
};

/**
 * Validate if a bond order can be increased
 * Pure function - no side effects
 */
export const canIncreaseBondOrder = (
  bond: Bond,
  atoms: readonly Atom[],
  allBonds: readonly Bond[]
): { canIncrease: boolean; reason?: string } => {
  const atom1 = atoms.find((a) => a.id === bond.atom1Id);
  const atom2 = atoms.find((a) => a.id === bond.atom2Id);
  
  if (!atom1 || !atom2) {
    return { canIncrease: false, reason: 'Atoms not found' };
  }
  
  // Get current total bond order for each atom
  const atom1TotalOrder = getTotalBondOrder(atom1.id, allBonds);
  const atom2TotalOrder = getTotalBondOrder(atom2.id, allBonds);
  
  // Get max bonds
  const atom1MaxBonds = getMaxBonds(atom1.element);
  const atom2MaxBonds = getMaxBonds(atom2.element);
  
  // Check if increasing bond order would exceed max bonds
  if (atom1TotalOrder - bond.order + 3 > atom1MaxBonds) {
    return {
      canIncrease: false,
      reason: `${atom1.element.symbol} cannot form more bonds`,
    };
  }
  
  if (atom2TotalOrder - bond.order + 3 > atom2MaxBonds) {
    return {
      canIncrease: false,
      reason: `${atom2.element.symbol} cannot form more bonds`,
    };
  }
  
  // Can't increase beyond triple bond
  if (bond.order >= 3) {
    return {
      canIncrease: false,
      reason: 'Maximum bond order is 3 (triple bond)',
    };
  }
  
  return { canIncrease: true };
};
