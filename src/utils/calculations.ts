import type {
  GasLawResult,
  PHResult,
  SpecificHeatResult,
} from '../types/calculation';

const AVOGADRO_NUMBER = 6.022e23;

/**
 * Convert moles to mass
 * Pure function - no side effects
 */
export const molesToMass = (moles: number, molarMass: number): number => {
  if (molarMass <= 0) {
    throw new Error('Molar mass must be positive');
  }
  return moles * molarMass;
};

/**
 * Convert mass to moles
 * Pure function - no side effects
 */
export const massToMoles = (mass: number, molarMass: number): number => {
  if (molarMass <= 0) {
    throw new Error('Molar mass must be positive');
  }
  return mass / molarMass;
};

/**
 * Convert moles to number of particles
 * Pure function - no side effects
 */
export const molesToParticles = (moles: number): number => {
  return moles * AVOGADRO_NUMBER;
};

/**
 * Convert number of particles to moles
 * Pure function - no side effects
 */
export const particlesToMoles = (particles: number): number => {
  if (particles < 0) {
    throw new Error('Particle count cannot be negative');
  }
  return particles / AVOGADRO_NUMBER;
};

/**
 * Calculate stoichiometry (mole-to-mole conversion using balanced equation)
 * Pure function - no side effects
 */
export const calculateMoleRatio = (
  molesA: number,
  coefficientA: number,
  coefficientB: number
): number => {
  if (coefficientA <= 0 || coefficientB <= 0) {
    throw new Error('Coefficients must be positive');
  }
  return (molesA / coefficientA) * coefficientB;
};

/**
 * Ideal Gas Law: PV = nRT
 * Solves for the missing variable
 * Pure function - no side effects
 * R = 0.0821 L·atm/(mol·K) for atm
 */
export const idealGasLaw = (params: {
  pressure?: number; // atm
  volume?: number; // L
  moles?: number; // mol
  temperature?: number; // K
  gasConstant?: number; // defaults to 0.0821 L·atm/(mol·K)
}): GasLawResult => {
  const { pressure, volume, moles, temperature, gasConstant = 0.0821 } = params;
  const known = [pressure, volume, moles, temperature].filter((v) => v !== undefined).length;

  if (known < 3) {
    return { success: false, error: 'At least 3 variables must be provided' };
  }

  if (known === 4) {
    // All provided - verify equation holds
    const calculated = (moles! * gasConstant * temperature!) / volume!;
    const difference = Math.abs(calculated - pressure!);
    if (difference > 0.01) {
      return { success: false, error: 'Provided values do not satisfy PV = nRT' };
    }
    return {
      success: true,
      data: {
        pressure: pressure!,
        volume: volume!,
        moles: moles!,
        temperature: temperature!,
        unit: 'L·atm/(mol·K)',
      },
    };
  }

  // Solve for missing variable
  if (pressure === undefined) {
    if (moles === undefined || temperature === undefined || volume === undefined) {
      return { success: false, error: 'Missing required variables to calculate pressure' };
    }
    const calculated = (moles * gasConstant * temperature) / volume;
    return {
      success: true,
      data: {
        pressure: calculated,
        volume,
        moles,
        temperature,
        unit: 'atm',
      },
    };
  }

  if (volume === undefined) {
    if (moles === undefined || temperature === undefined) {
      return { success: false, error: 'Missing required variables to calculate volume' };
    }
    const calculated = (moles * gasConstant * temperature) / pressure;
    return {
      success: true,
      data: {
        pressure,
        volume: calculated,
        moles,
        temperature,
        unit: 'L',
      },
    };
  }

  if (moles === undefined) {
    if (temperature === undefined) {
      return { success: false, error: 'Missing required variables to calculate moles' };
    }
    const calculated = (pressure * volume) / (gasConstant * temperature);
    return {
      success: true,
      data: {
        pressure,
        volume,
        moles: calculated,
        temperature,
        unit: 'mol',
      },
    };
  }

  // temperature is undefined
  const calculated = (pressure * volume) / (gasConstant * moles);
  return {
    success: true,
    data: {
      pressure,
      volume,
      moles,
      temperature: calculated,
      unit: 'K',
    },
  };
};

/**
 * Calculate pH from H+ concentration
 * Pure function - no side effects
 */
export const pHfromH = (concentration: number): number => {
  if (concentration <= 0) {
    throw new Error('Concentration must be positive');
  }
  return -Math.log10(concentration);
};

/**
 * Calculate H+ concentration from pH
 * Pure function - no side effects
 */
export const hFromPH = (pH: number): number => {
  return Math.pow(10, -pH);
};

/**
 * Calculate pOH from OH- concentration
 * Pure function - no side effects
 */
export const pOHfromOH = (concentration: number): number => {
  if (concentration <= 0) {
    throw new Error('Concentration must be positive');
  }
  return -Math.log10(concentration);
};

/**
 * Calculate OH- concentration from pOH
 * Pure function - no side effects
 */
export const ohFromPOH = (pOH: number): number => {
  return Math.pow(10, -pOH);
};

/**
 * Calculate pH, pOH, and concentrations from H+ or OH- concentration
 * Pure function - no side effects
 */
export const calculatePH = (params: {
  hConcentration?: number; // mol/L
  ohConcentration?: number; // mol/L
  pH?: number;
  pOH?: number;
}): PHResult => {
  const { hConcentration, ohConcentration, pH, pOH } = params;

  // If pH is provided
  if (pH !== undefined) {
    const h = hFromPH(pH);
    const calculatedPOH = 14 - pH;
    const oh = ohFromPOH(calculatedPOH);
    return {
      success: true,
      data: {
        pH,
        pOH: calculatedPOH,
        hConcentration: h,
        ohConcentration: oh,
      },
    };
  }

  // If pOH is provided
  if (pOH !== undefined) {
    const oh = ohFromPOH(pOH);
    const calculatedPH = 14 - pOH;
    const h = hFromPH(calculatedPH);
    return {
      success: true,
      data: {
        pH: calculatedPH,
        pOH,
        hConcentration: h,
        ohConcentration: oh,
      },
    };
  }

  // If H+ concentration is provided
  if (hConcentration !== undefined) {
    if (hConcentration <= 0) {
      return { success: false, error: 'H+ concentration must be positive' };
    }
    const calculatedPH = pHfromH(hConcentration);
    const calculatedPOH = 14 - calculatedPH;
    const oh = ohFromPOH(calculatedPOH);
    return {
      success: true,
      data: {
        pH: calculatedPH,
        pOH: calculatedPOH,
        hConcentration,
        ohConcentration: oh,
      },
    };
  }

  // If OH- concentration is provided
  if (ohConcentration !== undefined) {
    if (ohConcentration <= 0) {
      return { success: false, error: 'OH- concentration must be positive' };
    }
    const calculatedPOH = pOHfromOH(ohConcentration);
    const calculatedPH = 14 - calculatedPOH;
    const h = hFromPH(calculatedPH);
    return {
      success: true,
      data: {
        pH: calculatedPH,
        pOH: calculatedPOH,
        hConcentration: h,
        ohConcentration,
      },
    };
  }

  return { success: false, error: 'At least one parameter must be provided' };
};

/**
 * Calculate heat energy using q = mcΔT
 * Pure function - no side effects
 */
export const specificHeatCalculation = (params: {
  mass?: number; // g
  specificHeat?: number; // J/(g·°C)
  temperatureChange?: number; // °C
  heat?: number; // J
}): SpecificHeatResult => {
  const { mass, specificHeat, temperatureChange, heat } = params;
  const known = [mass, specificHeat, temperatureChange, heat].filter((v) => v !== undefined).length;

  if (known < 3) {
    return { success: false, error: 'At least 3 variables must be provided' };
  }

  const steps: string[] = [];
  let calculatedHeat: number;
  let calculatedMass: number;
  let calculatedSpecificHeat: number;
  let calculatedDeltaT: number;

  if (heat === undefined) {
    // Calculate heat
    if (mass === undefined || specificHeat === undefined || temperatureChange === undefined) {
      return { success: false, error: 'Missing required variables to calculate heat' };
    }
    calculatedHeat = mass * specificHeat * temperatureChange;
    steps.push(`q = m × c × ΔT`);
    steps.push(`q = ${mass.toFixed(2)} g × ${specificHeat.toFixed(3)} J/(g·°C) × ${temperatureChange.toFixed(2)} °C`);
    steps.push(`q = ${calculatedHeat.toFixed(2)} J`);
    return {
      success: true,
      data: {
        heat: calculatedHeat,
        steps,
      },
    };
  }

  if (mass === undefined) {
    // Calculate mass
    if (specificHeat === undefined || temperatureChange === undefined) {
      return { success: false, error: 'Missing required variables to calculate mass' };
    }
    calculatedMass = heat / (specificHeat * temperatureChange);
    steps.push(`m = q / (c × ΔT)`);
    steps.push(`m = ${heat.toFixed(2)} J / (${specificHeat.toFixed(3)} J/(g·°C) × ${temperatureChange.toFixed(2)} °C)`);
    steps.push(`m = ${calculatedMass.toFixed(2)} g`);
    return {
      success: true,
      data: {
        heat,
        steps,
      },
    };
  }

  if (specificHeat === undefined) {
    // Calculate specific heat
    if (temperatureChange === undefined) {
      return { success: false, error: 'Missing required variables to calculate specific heat' };
    }
    calculatedSpecificHeat = heat / (mass * temperatureChange);
    steps.push(`c = q / (m × ΔT)`);
    steps.push(`c = ${heat.toFixed(2)} J / (${mass.toFixed(2)} g × ${temperatureChange.toFixed(2)} °C)`);
    steps.push(`c = ${calculatedSpecificHeat.toFixed(3)} J/(g·°C)`);
    return {
      success: true,
      data: {
        heat,
        steps,
      },
    };
  }

  // temperatureChange is undefined
  calculatedDeltaT = heat / (mass * specificHeat);
  steps.push(`ΔT = q / (m × c)`);
  steps.push(`ΔT = ${heat.toFixed(2)} J / (${mass.toFixed(2)} g × ${specificHeat.toFixed(3)} J/(g·°C))`);
  steps.push(`ΔT = ${calculatedDeltaT.toFixed(2)} °C`);
  return {
    success: true,
    data: {
      heat,
      steps,
    },
  };
};
