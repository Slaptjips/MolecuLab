import type { Atom, Bond } from '../types/molecule';

/**
 * Convert molecule structure to SMILES notation
 * Simplified implementation for common molecules
 * Pure function - no side effects
 */
export const moleculeToSMILES = (atoms: readonly Atom[], _bonds: readonly Bond[]): string | null => {
  if (atoms.length === 0) return null;

  // Simple SMILES generation for common molecules
  // This is a simplified version - in production, you'd use RDKit.js or similar
  const elementSymbols = atoms.map((a) => a.element.symbol);

  // Common molecule patterns
  const commonMolecules: Record<string, string> = {
    'H2O': 'O',
    'CO2': 'O=C=O',
    'CH4': 'C',
    'NH3': 'N',
    'HCl': 'Cl',
    'NaCl': '[Na+].[Cl-]',
    'H2': '[H][H]',
    'O2': 'O=O',
    'N2': 'N#N',
  };

  const formula = elementSymbols.sort().join('');
  return commonMolecules[formula] || null;
};

/**
 * Get IUPAC name from PubChem API using SMILES
 * Pure function - side effect is API call, but returns a promise
 */
export const getIUPACNameFromPubChem = async (smiles: string): Promise<string | null> => {
  try {
    // PubChem REST API: Get CID from SMILES, then get IUPAC name
    const cidResponse = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(smiles)}/property/CID/JSON`
    );

    if (!cidResponse.ok) {
      return null;
    }

    const cidData = await cidResponse.json();
    const cid = cidData?.PropertyTable?.Properties?.[0]?.CID;

    if (!cid) {
      return null;
    }

    // Get IUPAC name from CID
    const nameResponse = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/IUPACName/JSON`
    );

    if (!nameResponse.ok) {
      return null;
    }

    const nameData = await nameResponse.json();
    return nameData?.PropertyTable?.Properties?.[0]?.IUPACName || null;
  } catch (error) {
    console.error('Error fetching IUPAC name from PubChem:', error);
    return null;
  }
};

/**
 * Get IUPAC name with fallback to common names
 * Pure function - side effect is API call
 */
export const getIUPACName = async (
  atoms: readonly Atom[],
  bonds: readonly Bond[]
): Promise<string | null> => {
  if (atoms.length === 0) return null;

  // Try to generate SMILES
  const smiles = moleculeToSMILES(atoms, bonds);
  if (!smiles) {
    // Fallback to common names
    return getCommonName(atoms, bonds);
  }

  // Try PubChem API
  const pubchemName = await getIUPACNameFromPubChem(smiles);
  if (pubchemName) {
    return pubchemName;
  }

  // Fallback to common names
  return getCommonName(atoms, bonds);
};

/**
 * Get common name for simple molecules
 * Pure function - no side effects
 */
const getCommonName = (atoms: readonly Atom[], _bonds: readonly Bond[]): string | null => {
  const counts: Record<string, number> = {};
  for (const atom of atoms) {
    counts[atom.element.symbol] = (counts[atom.element.symbol] || 0) + 1;
  }

  const formula = Object.entries(counts)
    .map(([symbol, count]) => (count > 1 ? `${symbol}${count}` : symbol))
    .sort()
    .join('');

  const commonNames: Record<string, string> = {
    'H2O': 'Water',
    'CO2': 'Carbon dioxide',
    'CH4': 'Methane',
    'NH3': 'Ammonia',
    'HCl': 'Hydrogen chloride',
    'NaCl': 'Sodium chloride',
    'H2': 'Hydrogen',
    'O2': 'Oxygen',
    'N2': 'Nitrogen',
    'CaO': 'Calcium oxide',
    'MgO': 'Magnesium oxide',
    'Al2O3': 'Aluminium oxide',
  };

  return commonNames[formula] || null;
};
