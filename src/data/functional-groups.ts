export type FunctionalGroup = {
  readonly name: string;
  readonly structure: string;
  readonly formula: string;
  readonly suffix: string;
  readonly description: string;
  readonly examples: readonly string[];
};

export const FUNCTIONAL_GROUPS: readonly FunctionalGroup[] = [
  {
    name: 'Alcohol',
    structure: '-OH',
    formula: '-OH',
    suffix: '-ol',
    description: 'Contains hydroxyl group',
    examples: ['Ethanol (C₂H₅OH)', 'Methanol (CH₃OH)', 'Propanol (C₃H₇OH)'],
  },
  {
    name: 'Carboxylic Acid',
    structure: '-COOH',
    formula: '-COOH',
    suffix: '-oic acid',
    description: 'Contains carboxyl group',
    examples: ['Acetic acid (CH₃COOH)', 'Formic acid (HCOOH)'],
  },
  {
    name: 'Amine',
    structure: '-NH₂',
    formula: '-NH₂',
    suffix: '-amine',
    description: 'Contains amino group',
    examples: ['Methylamine (CH₃NH₂)', 'Amino acids'],
  },
  {
    name: 'Aldehyde',
    structure: '-CHO',
    formula: '-CHO',
    suffix: '-al',
    description: 'Contains carbonyl group at end',
    examples: ['Formaldehyde (HCHO)', 'Acetaldehyde (CH₃CHO)'],
  },
  {
    name: 'Ketone',
    structure: 'C=O',
    formula: 'C=O',
    suffix: '-one',
    description: 'Contains carbonyl group in middle',
    examples: ['Acetone (CH₃COCH₃)', 'Propanone'],
  },
  {
    name: 'Ester',
    structure: '-COO-',
    formula: '-COO-',
    suffix: '-oate',
    description: 'Formed from carboxylic acid and alcohol',
    examples: ['Ethyl acetate', 'Methyl acetate'],
  },
  {
    name: 'Amide',
    structure: '-CONH₂',
    formula: '-CONH₂',
    suffix: '-amide',
    description: 'Contains amide linkage',
    examples: ['Acetamide (CH₃CONH₂)', 'Peptide bonds in proteins'],
  },
  {
    name: 'Ether',
    structure: '-O-',
    formula: '-O-',
    suffix: 'ether',
    description: 'Oxygen between two carbon chains',
    examples: ['Diethyl ether (C₂H₅OC₂H₅)', 'Anesthetic'],
  },
] as const;
