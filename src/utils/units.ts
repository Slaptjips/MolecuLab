/**
 * Unit conversion utilities
 * All pure functions - no side effects
 */

/**
 * Convert temperature from Celsius to Kelvin
 */
export const celsiusToKelvin = (celsius: number): number => {
  return celsius + 273.15;
};

/**
 * Convert temperature from Kelvin to Celsius
 */
export const kelvinToCelsius = (kelvin: number): number => {
  return kelvin - 273.15;
};

/**
 * Convert pressure from atm to kPa
 */
export const atmToKPa = (atm: number): number => {
  return atm * 101.325;
};

/**
 * Convert pressure from kPa to atm
 */
export const kpaToAtm = (kpa: number): number => {
  return kpa / 101.325;
};

/**
 * Convert pressure from mmHg to atm
 */
export const mmhgToAtm = (mmhg: number): number => {
  return mmhg / 760;
};

/**
 * Convert pressure from atm to mmHg
 */
export const atmToMmhg = (atm: number): number => {
  return atm * 760;
};

/**
 * Convert volume from liters to milliliters
 */
export const litersToMilliliters = (liters: number): number => {
  return liters * 1000;
};

/**
 * Convert volume from milliliters to liters
 */
export const millilitersToLiters = (milliliters: number): number => {
  return milliliters / 1000;
};
