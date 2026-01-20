import type { Atom, Bond } from '../types/molecule';
import type { Element } from '../types/element';

/**
 * Calculate bond order between two atoms based on valence electrons
 * Pure function - no side effects
 * Returns 1 (single), 2 (double), or 3 (triple)
 */
export const calculateBondOrder = (
  atom1: Element,
  atom2: Element,
  atom1Bonds: readonly Bond[],
  atom2Bonds: readonly Bond[],
  allBonds: readonly Bond[]
): 1 | 2 | 3 => {
  // Count electrons already used in bonds (excluding the new bond we're calculating)
  const getUsedElectrons = (bonds: readonly Bond[]): number => {
    return bonds.reduce((sum, b) => sum + b.electrons, 0);
  };

  const atom1Used = getUsedElectrons(atom1Bonds);
  const atom2Used = getUsedElectrons(atom2Bonds);

  const atom1Valence = atom1.valenceElectrons;
  const atom2Valence = atom2.valenceElectrons;

  // Available electrons for bonding
  const atom1Available = Math.max(0, atom1Valence - atom1Used);
  const atom2Available = Math.max(0, atom2Valence - atom2Used);

  // Simple heuristic based on octet rule
  // For H: needs 2 electrons total (duet rule)
  // For others: try to reach 8 electrons

  const atom1Needs = atom1.atomicNumber === 1 ? 2 : 8;
  const atom2Needs = atom2.atomicNumber === 1 ? 2 : 8;

  // Electrons still needed to satisfy octet
  const atom1Remaining = Math.max(0, atom1Needs - atom1Used);
  const atom2Remaining = Math.max(0, atom2Needs - atom2Used);

  // Calculate how many electrons this bond should share
  // Both atoms contribute equally to shared electrons
  const maxSharedElectrons = Math.min(atom1Available, atom2Available, 6); // Max 6 for triple bond
  const neededElectrons = Math.min(atom1Remaining, atom2Remaining);

  const sharedElectrons = Math.min(maxSharedElectrons, neededElectrons);

  if (sharedElectrons >= 6) return 3; // Triple bond (6 electrons)
  if (sharedElectrons >= 4) return 2; // Double bond (4 electrons)
  return 1; // Single bond (2 electrons)
};

/**
 * Determine if a compound is ionic, covalent, or mixed
 * Pure function - no side effects
 */
export const determineCompoundType = (
  bonds: readonly Bond[],
  atoms: readonly Atom[]
): 'ionic' | 'covalent' | 'mixed' | null => {
  if (bonds.length === 0) return null;

  let ionicCount = 0;
  let covalentCount = 0;

  for (const bond of bonds) {
    if (bond.type === 'ionic') {
      ionicCount++;
    } else if (bond.type === 'covalent') {
      covalentCount++;
    } else {
      // If bond type is null, try to determine from atoms
      const atom1 = atoms.find((a) => a.id === bond.atom1Id);
      const atom2 = atoms.find((a) => a.id === bond.atom2Id);
      if (atom1 && atom2) {
        // Check electronegativity difference
        const en1 = atom1.element.electronegativity ?? 0;
        const en2 = atom2.element.electronegativity ?? 0;
        const diff = Math.abs(en1 - en2);
        if (diff > 1.7) {
          ionicCount++;
        } else {
          covalentCount++;
        }
      }
    }
  }

  if (ionicCount > 0 && covalentCount > 0) return 'mixed';
  if (ionicCount > 0) return 'ionic';
  if (covalentCount > 0) return 'covalent';
  return null;
};

/**
 * Calculate Lewis dot structure data for an atom
 * Pure function - no side effects
 */
export const calculateLewisDots = (
  atom: Element,
  bonds: readonly Bond[],
  atomId: string
): {
  valenceElectrons: number;
  bondElectrons: number;
  lonePairs: number;
  unpairedElectrons: number;
  totalElectronsToShow: number; // Total electrons to display (bonding + lone pairs)
} => {
  // Count electrons used in bonds (shared electrons count once for each atom)
  const bondElectrons = bonds
    .filter((b) => b.atom1Id === atomId || b.atom2Id === atomId)
    .reduce((sum, b) => sum + b.order, 0); // Each bond order represents one electron contributed

  const totalUsed = bondElectrons;
  const remaining = atom.valenceElectrons - totalUsed;
  const lonePairs = Math.floor(remaining / 2);
  const unpairedElectrons = remaining % 2;
  const totalElectronsToShow = bondElectrons + remaining; // All valence electrons

  return {
    valenceElectrons: atom.valenceElectrons,
    bondElectrons,
    lonePairs,
    unpairedElectrons,
    totalElectronsToShow,
  };
};
