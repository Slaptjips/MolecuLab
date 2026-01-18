export type PolyatomicIon = {
  readonly name: string;
  readonly formula: string;
  readonly charge: number;
  readonly description?: string;
};

export const POLYATOMIC_IONS: readonly PolyatomicIon[] = [
  { name: 'Ammonium', formula: 'NH₄⁺', charge: +1, description: 'Common cation' },
  { name: 'Hydroxide', formula: 'OH⁻', charge: -1, description: 'Base anion' },
  { name: 'Nitrate', formula: 'NO₃⁻', charge: -1, description: 'Common anion' },
  { name: 'Nitrite', formula: 'NO₂⁻', charge: -1 },
  { name: 'Sulfate', formula: 'SO₄²⁻', charge: -2, description: 'Common anion' },
  { name: 'Sulfite', formula: 'SO₃²⁻', charge: -2 },
  { name: 'Phosphate', formula: 'PO₄³⁻', charge: -3, description: 'Common in DNA/ATP' },
  { name: 'Phosphite', formula: 'PO₃³⁻', charge: -3 },
  { name: 'Carbonate', formula: 'CO₃²⁻', charge: -2, description: 'Common anion' },
  { name: 'Bicarbonate', formula: 'HCO₃⁻', charge: -1, description: 'Buffer component' },
  { name: 'Chromate', formula: 'CrO₄²⁻', charge: -2 },
  { name: 'Dichromate', formula: 'Cr₂O₇²⁻', charge: -2 },
  { name: 'Permanganate', formula: 'MnO₄⁻', charge: -1 },
  { name: 'Acetate', formula: 'C₂H₃O₂⁻', charge: -1, description: 'Common anion' },
  { name: 'Peroxide', formula: 'O₂²⁻', charge: -2 },
  { name: 'Cyanide', formula: 'CN⁻', charge: -1 },
  { name: 'Thiocyanate', formula: 'SCN⁻', charge: -1 },
] as const;
