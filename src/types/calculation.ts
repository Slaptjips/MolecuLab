export type CalculationResult<T> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: string };

export type MolarMassResult = CalculationResult<{
  readonly molarMass: number;
  readonly breakdown: readonly { readonly element: string; readonly count: number; readonly mass: number }[];
}>;

export type StoichiometryResult = CalculationResult<{
  readonly moles: number;
  readonly mass: number;
  readonly particles: number;
  readonly steps: readonly string[];
}>;

export type GasLawResult = CalculationResult<{
  readonly pressure: number;
  readonly volume: number;
  readonly moles: number;
  readonly temperature: number;
  readonly unit: string;
}>;

export type PHResult = CalculationResult<{
  readonly pH: number;
  readonly pOH: number;
  readonly hConcentration: number;
  readonly ohConcentration: number;
}>;

export type SpecificHeatResult = CalculationResult<{
  readonly heat: number;
  readonly steps: readonly string[];
}>;
