export type SpecificHeat = {
  readonly substance: string;
  readonly specificHeat: number; // in J/(g·°C)
  readonly category: string;
};

export const SPECIFIC_HEATS: readonly SpecificHeat[] = [
  { substance: 'Water', specificHeat: 4.184, category: 'Liquid' },
  { substance: 'Ice', specificHeat: 2.09, category: 'Solid' },
  { substance: 'Steam', specificHeat: 2.01, category: 'Gas' },
  { substance: 'Aluminum', specificHeat: 0.897, category: 'Metal' },
  { substance: 'Iron', specificHeat: 0.449, category: 'Metal' },
  { substance: 'Copper', specificHeat: 0.385, category: 'Metal' },
  { substance: 'Lead', specificHeat: 0.129, category: 'Metal' },
  { substance: 'Gold', specificHeat: 0.129, category: 'Metal' },
  { substance: 'Silver', specificHeat: 0.235, category: 'Metal' },
  { substance: 'Zinc', specificHeat: 0.388, category: 'Metal' },
  { substance: 'Ethanol', specificHeat: 2.44, category: 'Liquid' },
  { substance: 'Methanol', specificHeat: 2.51, category: 'Liquid' },
  { substance: 'Glass', specificHeat: 0.84, category: 'Solid' },
  { substance: 'Wood', specificHeat: 1.76, category: 'Solid' },
  { substance: 'Concrete', specificHeat: 0.88, category: 'Solid' },
  { substance: 'Granite', specificHeat: 0.79, category: 'Solid' },
  { substance: 'Sand', specificHeat: 0.84, category: 'Solid' },
] as const;

// Helper function to get specific heat
export const getSpecificHeat = (substance: string): number | null => {
  const found = SPECIFIC_HEATS.find((sh) => sh.substance.toLowerCase() === substance.toLowerCase());
  return found ? found.specificHeat : null;
};
