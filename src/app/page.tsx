'use client';

import { useState } from "react";

import { LineChart } from '@/components/LineChart';

export default function Home() {
  const [chargepoints, setChargepoints] = useState(20);
  const [multiplier, setMultiplier] = useState(100);
  const [consumption, setConsumption] = useState(18);
  const [chargingPower, setChargingPower] = useState(11);
  const [results, setResults] = useState<number[]>([]);

  // Simulate Charging Demand dummy data generator
  const simulateCharging = () => {
    const data: number[] = [];
    const _15minIntervalsPerDay = 96;
    for (let i = 0; i < _15minIntervalsPerDay; i++) {
      const demand =
        Math.random() * chargingPower * chargepoints * (multiplier / 100);
      data.push(demand);
    }
    setResults(data);
  };

  return (
    <div className="p-8">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-blue-500">Task 1:</h1>
        <p>Result can be checked here <a className="text-green-500 font-bold underline" href="http://localhost:3000/api/simulate?charging_points=20" target="blank">http://localhost:3000/api/simulate?charging_points=20</a></p>
      </div>
      <p className="w-full border-b-2 border-solid border-black my-10"></p>
      <div>
        <h1 className="text-2xl font-bold mb-6 text-blue-500">Task 2a:</h1>
        <h1 className="text-xl font-bold mb-6">EV Charging Simulator</h1>
        {/* Input Form */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block font-bold mb-2">Number of Chargepoints</label>
            <input
              type="number"
              value={chargepoints}
              onChange={(e) => setChargepoints(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Multiplier (%)</label>
            <input
              type="number"
              value={multiplier}
              onChange={(e) => setMultiplier(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Car Consumption (kWh/100km)</label>
            <input
              type="number"
              value={consumption}
              onChange={(e) => setConsumption(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Charging Power (kW)</label>
            <input
              type="number"
              value={chargingPower}
              onChange={(e) => setChargingPower(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Simulate Button */}
        <button
          onClick={simulateCharging}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Simulate
        </button>

        {/* Results */}
        <h2 className="text-xl font-bold mt-8">Simulation Results</h2>
        {results.length > 0 && <LineChart data={results} />}
      </div>
    </div>
  );
}