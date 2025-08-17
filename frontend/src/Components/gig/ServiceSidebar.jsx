"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Check, Clock, Shield, X } from "lucide-react";

const ServiceSidebar = ({ basic = {}, standard = {}, pro = {} ,username}) => {
  // Build normalized tiers from props
  const serviceTiers = useMemo(() => {
    const getPrice = (t) =>
      // prefer explicit price, then hourlyPay, then fallback 0
      (t && (t.price ?? t.hourlyPay ?? t.amount)) ?? 0;

    const normalize = (key, t, defaultName) => ({
      key,
      name: t.name ?? defaultName,
      price: getPrice(t),
      meta: t ?? {},
      // support common fields with fallbacks
      deliveryTime: t?.deliveryTime ?? t?.duration ?? t?.days ?? null,
      revisions: t?.revisions ?? t?.code_reviews ?? t?.revs ?? 0,
      pages: t?.pages ?? t?.numPages ?? null,
    });

    return {
      basic: normalize("basic", basic, "Basic"),
      standard: normalize("standard", standard, "Standard"),
      pro: normalize("pro", pro, "Pro"),
    };
  }, [basic, standard, pro]);

  // default to the first available tier key
  const firstKey = useMemo(() => Object.keys(serviceTiers)[0], [serviceTiers]);
  const [selectedTier, setSelectedTier] = useState(firstKey);

  // keep selection synced if props change (e.g., parent loads data asynchronously)
  useEffect(() => {
    setSelectedTier(firstKey);
  }, [firstKey]);

  // safe selected object
  const selected = serviceTiers[selectedTier] ?? serviceTiers[firstKey];

  return (
    <div className="lg:w-96">
      <div className="sticky top-6 space-y-6">
        {/* Service Tier Selection */}
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white text-lg">Select service tier</h3>
            <a
              href="#"
              className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
            >
              Compare tiers
            </a>
          </div>

          <div className="space-y-4 mb-6">
            {Object.entries(serviceTiers).map(([key, tier]) => {
              const id = `serviceTier-${key}`;
              const isSelected = selectedTier === key;

              return (
                <label
                  key={key}
                  htmlFor={id}
                  className="flex items-center space-x-4 cursor-pointer group"
                >
                  <input
                    id={id}
                    type="radio"
                    name="serviceTier"
                    value={key}
                    checked={isSelected}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-5 h-5 text-cyan-500 bg-gray-900 border-gray-600 focus:ring-cyan-400 focus:ring-2"
                  />

                  <div
                    className={`flex-1 flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                      isSelected
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30"
                        : "bg-gray-900/30 border border-gray-700/30 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10"
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-white">{tier.name}</span>
                      {tier.deliveryTime != null && (
                        <div className="text-xs text-gray-400">{`${tier.deliveryTime} days`}</div>
                      )}
                    </div>

                    <span className="font-bold text-xl text-cyan-400">
                      ${tier.price}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Example CTA area that uses selectedTier */}
          <div className="pt-4 border-t border-gray-800/30">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-gray-400">Selected</div>
                <div className="font-semibold text-white">{selected.name}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Price</div>
                <div className="font-bold text-xl text-cyan-400">${selected.price}</div>
              </div>
            </div>

            <button className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition-colors text-black font-semibold">
              Continue
            </button>
          </div>
        </div>

        {/* Tier details / features */}
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10">
          <h4 className="font-bold text-white mb-3 text-lg">Basic Token Deployment</h4>
          <p className="text-sm text-gray-400 mb-6">
            Deploy an ERC-20 token contract with basic settings
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Delivery Time</span>
              <span className="font-semibold text-cyan-300">
                {selected.deliveryTime ?? "TBD"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 underline">Number of Revisions</span>
              <span className="font-semibold text-cyan-300">{selected.revisions}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 underline">custom_ui</span>
              <span className="font-semibold text-gray-300">
                {selected.custom_ui=="Yes" ?  <Check className="w-5 h-5 text-green-400" /> : <X className="w-5 h-5 text-red-400" />}
              </span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300 underline">Content Upload</span>
              <Check className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300 underline">Responsive Design</span>
              <Check className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300 underline">Source Code</span>
              <Check className="w-5 h-5 text-green-400" />
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
            <Clock className="w-4 h-4" />
            <span>
              {selected.deliveryTime
                ? `${selected.deliveryTime} days delivery`
                : "Delivery time: TBD"}
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-6">Revisions may occur after this date.</p>

          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg transform hover:scale-105">
              Continue (${selected.price})
            </button>
            <button className="w-full border-2 border-cyan-500/50 text-white py-4 px-6 rounded-lg font-semibold hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300">
              Message {username}
            </button>
          </div>
        </div>

        {/* Payment Protection */}
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-lg">Upwork Payment Protection</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Fund the project upfront. Sribabu gets paid once you are satisfied with the work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSidebar;
