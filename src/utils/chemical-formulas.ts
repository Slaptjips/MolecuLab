import { getElementBySymbol } from '../data/elements';
import type { MolarMassResult, CalculationResult } from '../types/calculation';

export type FormulaParts = readonly { readonly element: string; readonly count: number }[];

/**
 * Parse a chemical formula into its constituent elements and counts
 * Pure function - no side effects
 */
export const parseFormula = (formula: string): CalculationResult<FormulaParts> => {
  if (!formula || formula.trim().length === 0) {
    return { success: false, error: 'Formula cannot be empty' };
  }

  const parts: Array<{ element: string; count: number }> = [];
  let i = 0;

  while (i < formula.length) {
    // Skip whitespace and symbols like +, ->, =
    if (/[\s+→=]/.test(formula[i])) {
      i++;
      continue;
    }

    // Read element symbol (one or two characters, first uppercase)
    if (!/[A-Z]/.test(formula[i])) {
      return { success: false, error: `Invalid formula: expected element at position ${i}` };
    }

    let element = formula[i];
    i++;

    // Check for second lowercase letter
    if (i < formula.length && /[a-z]/.test(formula[i])) {
      element += formula[i];
      i++;
    }

    // Read number (if present)
    let countStr = '';
    while (i < formula.length && /\d/.test(formula[i])) {
      countStr += formula[i];
      i++;
    }

    const count = countStr === '' ? 1 : parseInt(countStr, 10);
    if (isNaN(count) || count < 1) {
      return { success: false, error: `Invalid count for element ${element}` };
    }

    parts.push({ element, count });
  }

  return { success: true, data: parts };
};

/**
 * Calculate molar mass from a chemical formula
 * Pure function - no side effects
 */
export const calculateMolarMass = (formula: string): MolarMassResult => {
  const parsed = parseFormula(formula);
  if (!parsed.success) {
    return parsed;
  }

  const breakdown: Array<{ element: string; count: number; mass: number }> = [];
  let totalMass = 0;

  for (const part of parsed.data) {
    const element = getElementBySymbol(part.element);
    if (!element) {
      return { success: false, error: `Unknown element: ${part.element}` };
    }

    const elementMass = part.count * element.atomicMass;
    totalMass += elementMass;
    breakdown.push({
      element: part.element,
      count: part.count,
      mass: elementMass,
    });
  }

  return {
    success: true,
    data: {
      molarMass: totalMass,
      breakdown,
    },
  };
};

/**
 * Count atoms of each element in a formula
 * Pure function - no side effects
 */
export const countAtoms = (formula: string): CalculationResult<Record<string, number>> => {
  const parsed = parseFormula(formula);
  if (!parsed.success) {
    return parsed;
  }

  const counts: Record<string, number> = {};
  for (const part of parsed.data) {
    counts[part.element] = (counts[part.element] || 0) + part.count;
  }

  return { success: true, data: counts };
};

/**
 * Check if a chemical equation is balanced
 * Pure function - no side effects
 */
export const isEquationBalanced = (
  reactants: readonly string[],
  products: readonly string[]
): CalculationResult<boolean> => {
  const reactantAtoms: Record<string, number> = {};
  const productAtoms: Record<string, number> = {};

  // Count atoms in reactants
  for (const reactant of reactants) {
    const counts = countAtoms(reactant);
    if (!counts.success) {
      return counts;
    }
    for (const [element, count] of Object.entries(counts.data)) {
      reactantAtoms[element] = (reactantAtoms[element] || 0) + count;
    }
  }

  // Count atoms in products
  for (const product of products) {
    const counts = countAtoms(product);
    if (!counts.success) {
      return counts;
    }
    for (const [element, count] of Object.entries(counts.data)) {
      productAtoms[element] = (productAtoms[element] || 0) + count;
    }
  }

  // Check if all atom counts match
  const allElements = new Set([...Object.keys(reactantAtoms), ...Object.keys(productAtoms)]);
  for (const element of allElements) {
    if (reactantAtoms[element] !== productAtoms[element]) {
      return { success: true, data: false };
    }
  }

  return { success: true, data: true };
};
