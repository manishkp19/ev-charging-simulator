// Array index is start time of time range, ex: 0:00-1:00 is index 0, 23:00-24:00 is index 23
// Values of array is probabilities as per Math.random() format.
export const ARRIVAL_PROBABILITIES = [
    0.0094, 0.0094, 0.0094, 0.0094, 0.0094, 0.0094, 0.0094, 0.0094,
    0.0283, 0.0283, 0.0566, 0.0566, 0.0566, 0.0755, 0.0755, 0.0755,
    0.1038, 0.1038, 0.1038, 0.0472, 0.0472, 0.0472, 0.0094, 0.0094
];

// probability to range mapping, range in Km
export const RANGE_PROBABILITIES = [
    { probability: 0.3431, range: 0 },
    { probability: 0.049, range: 5 },
    { probability: 0.098, range: 10 },
    { probability: 0.1176, range: 20 },
    { probability: 0.0882, range: 30 },
    { probability: 0.1176, range: 50 },
    { probability: 0.1078, range: 100 },
    { probability: 0.049, range: 200 },
    { probability: 0.0294, range: 300 }
];

// kW per chargepoint
export const CHARGING_POWER = 11;

// kWh per Km
export const KM_TO_KWH = 18 / 100;

// 15 mins intervals for non leap year
export const _15_MINS_INTERVALS = 365 * 24 * 60 / 15;

// No. of minutes in a day
export const MINS_PER_DAY = 1440;

// 4 Intervals of 15mins per hour
export const INTERVALS_PER_HOUR = 60 / 15;