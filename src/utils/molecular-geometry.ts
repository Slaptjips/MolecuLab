import type { Atom, Bond } from '../types/molecule';
import { getMaxBonds } from './bond-validation';

/**
 * Detect the central atom in a molecule
 * Central atom is typically the one with:
 * 1. Highest bonding capacity
 * 2. Lowest electronegativity (in covalent compounds)
 * 3. Most bonds already formed
 * Pure function - no side effects
 */
export const detectCentralAtom = (
  atoms: readonly Atom[],
  bonds: readonly Bond[]
): Atom | null => {
  if (atoms.length === 0) return null;
  if (atoms.length === 1) return atoms[0];
  if (atoms.length === 2) return atoms[0]; // Either can be central in diatomic

  // Count bonds for each atom
  const bondCounts = atoms.map((atom) => ({
    atom,
    bondCount: bonds.filter(
      (b) => b.atom1Id === atom.id || b.atom2Id === atom.id
    ).length,
    maxBonds: getMaxBonds(atom.element),
    electronegativity: atom.element.electronegativity ?? 0,
  }));

  // Sort by: most bonds, then highest max bonds, then lowest electronegativity
  bondCounts.sort((a, b) => {
    if (b.bondCount !== a.bondCount) return b.bondCount - a.bondCount;
    if (b.maxBonds !== a.maxBonds) return b.maxBonds - a.maxBonds;
    return a.electronegativity - b.electronegativity;
  });

  return bondCounts[0].atom;
};

/**
 * Calculate available electrons for bonding on an atom
 * Pure function - no side effects
 */
export const getAvailableElectrons = (
  atom: Atom,
  bonds: readonly Bond[]
): number => {
  const usedElectrons = bonds
    .filter((b) => b.atom1Id === atom.id || b.atom2Id === atom.id)
    .reduce((sum, b) => sum + b.order, 0); // Each bond order = 1 electron used

  return Math.max(0, atom.element.valenceElectrons - usedElectrons);
};

/**
 * Check if two atoms should form a bond based on molecular geometry
 * Pure function - no side effects
 */
export const shouldFormBond = (
  atom1: Atom,
  atom2: Atom,
  allAtoms: readonly Atom[],
  existingBonds: readonly Bond[]
): { shouldForm: boolean; reason?: string } => {
  // If either atom has no available electrons, don't form bond
  const atom1Available = getAvailableElectrons(atom1, existingBonds);
  const atom2Available = getAvailableElectrons(atom2, existingBonds);

  if (atom1Available === 0) {
    return {
      shouldForm: false,
      reason: `${atom1.element.symbol} has no available electrons`,
    };
  }

  if (atom2Available === 0) {
    return {
      shouldForm: false,
      reason: `${atom2.element.symbol} has no available electrons`,
    };
  }

  // Detect central atom
  const centralAtom = detectCentralAtom(allAtoms, existingBonds);

  // If we have a central atom, prefer bonding to it
  if (centralAtom) {
    const isAtom1Central = atom1.id === centralAtom.id;
    const isAtom2Central = atom2.id === centralAtom.id;

    // If neither atom is central, they probably shouldn't bond
    // (e.g., two O atoms in CO2 shouldn't bond to each other)
    if (!isAtom1Central && !isAtom2Central) {
      // Exception: if both are terminal atoms and central is already fully bonded
      const centralBonds = existingBonds.filter(
        (b) => b.atom1Id === centralAtom.id || b.atom2Id === centralAtom.id
      );
      const centralMaxBonds = getMaxBonds(centralAtom.element);
      const centralIsFullyBonded = centralBonds.length >= centralMaxBonds;

      // Only allow terminal-terminal bonds if central is fully bonded
      // and both terminal atoms have available electrons
      if (!centralIsFullyBonded) {
        return {
          shouldForm: false,
          reason: 'Terminal atoms should bond to central atom first',
        };
      }
    }
  }

  // Check if atoms are already bonded
  const alreadyBonded = existingBonds.some(
    (b) =>
      (b.atom1Id === atom1.id && b.atom2Id === atom2.id) ||
      (b.atom1Id === atom2.id && b.atom2Id === atom1.id)
  );

  if (alreadyBonded) {
    return {
      shouldForm: false,
      reason: 'Atoms are already bonded',
    };
  }

  return { shouldForm: true };
};

/**
 * Calculate optimal bond order based on available electrons
 * Pure function - no side effects
 */
export const calculateOptimalBondOrder = (
  atom1: Atom,
  atom2: Atom,
  existingBonds: readonly Bond[]
): 1 | 2 | 3 => {
  const atom1Available = getAvailableElectrons(atom1, existingBonds);
  const atom2Available = getAvailableElectrons(atom2, existingBonds);

  // Both atoms need to contribute electrons
  const maxShared = Math.min(atom1Available, atom2Available, 3); // Max 3 for triple bond

  // Prefer higher bond orders if electrons are available
  if (maxShared >= 3) return 3;
  if (maxShared >= 2) return 2;
  return 1;
};

/**
 * Get atoms bonded to a specific atom
 * Pure function - no side effects
 */
export const getBondedAtoms = (
  atomId: string,
  atoms: readonly Atom[],
  bonds: readonly Bond[]
): readonly Atom[] => {
  const bondedIds = bonds
    .filter((b) => b.atom1Id === atomId || b.atom2Id === atomId)
    .map((b) => (b.atom1Id === atomId ? b.atom2Id : b.atom1Id));

  return atoms.filter((a) => bondedIds.includes(a.id));
};
