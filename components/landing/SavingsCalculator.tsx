"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";

export function SavingsCalculator() {
  const [monthlyOrders, setMonthlyOrders] = useState(800);
  const [avgTicket, setAvgTicket] = useState(2500);

  const totalMonthlySales = monthlyOrders * avgTicket;
  const aggregatorCut = Math.round(totalMonthlySales * 0.28); // 28% typical commission
  const menuCostAnnual = 25000; // Flat nominal setup
  const yearlySavings = aggregatorCut * 12 - menuCostAnnual;

  return (
    <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-xl">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
            Interactive Calculator
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">
            Calculate Your Aggregator Savings
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2">
            See how much cash stays in your restaurant&apos;s bank account with 0% commission direct WhatsApp ordering.
          </p>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Monthly Orders
              </label>
              <span className="text-sm font-black font-mono text-[#C8553D] dark:text-[#D4A24C]">
                {monthlyOrders.toLocaleString()} orders
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="5000"
              step="50"
              value={monthlyOrders}
              onChange={(e) => setMonthlyOrders(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#C8553D]"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
              <span>100</span>
              <span>2,500</span>
              <span>5,000+</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Average Order Value
              </label>
              <span className="text-sm font-black font-mono text-[#C8553D] dark:text-[#D4A24C]">
                Rs {avgTicket.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="8000"
              step="100"
              value={avgTicket}
              onChange={(e) => setAvgTicket(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#C8553D]"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
              <span>Rs 500</span>
              <span>Rs 4,000</span>
              <span>Rs 8,000</span>
            </div>
          </div>
        </div>

        {/* Result Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Estimated Yearly Savings
          </span>
          <div className="text-3xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight my-2">
            Rs {yearlySavings.toLocaleString()}
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
            Based on eliminating 28% third-party marketplace commissions across Rs {totalMonthlySales.toLocaleString()}/mo in order volume.
          </p>
        </div>
      </div>
    </section>
  );
}
