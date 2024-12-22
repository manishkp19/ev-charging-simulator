import { NextResponse } from 'next/server';

import { KM_TO_KWH, ARRIVAL_PROBABILITIES, RANGE_PROBABILITIES, CHARGING_POWER, _15_MINS_INTERVALS, MINS_PER_DAY, INTERVALS_PER_HOUR } from '@/contants'

// convering time to hour to get the probability from ARRIVAL_PROBABILITIES data
const getArrivalProbability = (time: number) => ARRIVAL_PROBABILITIES[Math.floor(time / 60)];
const getChargeDemand = () => {
    // randomly selecting the demand of a car arriving at a charging station
    const random = Math.random();
    let cumulative = 0;
    for (const prob of RANGE_PROBABILITIES) {
        cumulative += prob.range;
        if (random <= cumulative) return prob.range * KM_TO_KWH;
    }
    return 0;
};

const simulateCharging = (numChargepoints: number) => {

    // charge demand per 15 mins time slots for whole year
    const timeline = Array(_15_MINS_INTERVALS).fill(0);
    // charge demand for whole year
    let totalEnergy = 0;

    for (let currInterval = 0; currInterval < _15_MINS_INTERVALS; currInterval++) {
        for (let c = 0; c < numChargepoints; c++) {
            // Calculation for each charging station
            if (Math.random() < getArrivalProbability(currInterval % MINS_PER_DAY)) {
                // Randomly selecting the arrival of a car for a charging station
                const chargeDemand = getChargeDemand();

                // chargeTime is in 15mins interval
                const chargeTime = Math.ceil((chargeDemand / CHARGING_POWER) * INTERVALS_PER_HOUR);
                for (let i = currInterval; i < Math.min(currInterval + chargeTime, _15_MINS_INTERVALS); i++) {
                    timeline[i] += Math.min(CHARGING_POWER, chargeDemand);
                }
                totalEnergy += chargeDemand;
            }
        }
    }

    const maxDemand = Math.max(...timeline);
    const theoreticalMax = numChargepoints * CHARGING_POWER;
    const concurrencyFactor = maxDemand / theoreticalMax;

    return { totalEnergy, maxDemand, concurrencyFactor };
};

export async function GET(request: Request) {
    const url = new URL(request.url);
    const numChargepoints = Number(url.searchParams.get('charging_points'));

    if (!numChargepoints || isNaN(numChargepoints)) {
        return NextResponse.json({ error: "Missing data: charging_points" }, { status: 400 });
    }

    const result = simulateCharging(numChargepoints);

    return NextResponse.json({
        data: result,
        title: `EV charging data for ${numChargepoints} charging stations.`
    });
}
