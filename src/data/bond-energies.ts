export type BondEnergy = {
  readonly bond: string;
  readonly energy: number; // in kJ/mol
};

export const BOND_ENERGIES: readonly BondEnergy[] = [
  { bond: 'H-H', energy: 436 },
  { bond: 'H-C', energy: 413 },
  { bond: 'H-N', energy: 391 },
  { bond: 'H-O', energy: 463 },
  { bond: 'H-F', energy: 567 },
  { bond: 'H-Cl', energy: 431 },
  { bond: 'H-Br', energy: 366 },
  { bond: 'C-C', energy: 347 },
  { bond: 'C=C', energy: 614 },
  { bond: 'C≡C', energy: 839 },
  { bond: 'C-N', energy: 305 },
  { bond: 'C=N', energy: 615 },
  { bond: 'C-O', energy: 358 },
  { bond: 'C=O', energy: 745 },
  { bond: 'C-F', energy: 485 },
  { bond: 'C-Cl', energy: 339 },
  { bond: 'N-N', energy: 163 },
  { bond: 'N=N', energy: 418 },
  { bond: 'N≡N', energy: 946 },
  { bond: 'N-O', energy: 201 },
  { bond: 'O-O', energy: 146 },
  { bond: 'O=O', energy: 498 },
  { bond: 'F-F', energy: 155 },
  { bond: 'Cl-Cl', energy: 243 },
  { bond: 'Br-Br', energy: 193 },
  { bond: 'I-I', energy: 151 },
  { bond: 'Li-F', energy: 577 },
  { bond: 'Na-Cl', energy: 787 },
  { bond: 'K-Cl', energy: 717 },
  { bond: 'Mg-O', energy: 360 },
  { bond: 'Ca-O', energy: 464 },
] as const;

// Helper function to get bond energy
export const getBondEnergy = (bond: string): number | null => {
  const found = BOND_ENERGIES.find((be) => be.bond === bond);
  return found ? found.energy : null;
};
