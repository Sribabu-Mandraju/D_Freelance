import { Check } from "lucide-react";

const ServiceTiersTable = ({ basic, standard, pro }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        What's included
      </h2>
      <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20">
                <th className="text-left py-4 px-6 font-semibold text-white">
                  Service Tiers
                </th>
                <th className="text-center py-4 px-6 font-semibold text-white flex flex-col items-center">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg p-3">
                    Basic
                    <br />
                    <span className=" flex text-2xl font-bold clear-start">
                      {" "}
                      <span>$</span> {basic.hourlyPay}
                    </span>
                  </div>
                </th>
                <th className="text-center py-4 px-6 font-semibold text-white">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-3">
                    Standard
                    <br />
                    <span className=" flex text-2xl font-bold clear-start">
                      {" "}
                      <span>$</span> {standard.hourlyPay}
                    </span>
                  </div>
                </th>
                <th className="text-center py-4 px-6 font-semibold text-white">
                  <div className="bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg p-3">
                    Pro
                    <br />
                    <span className=" flex text-2xl font-bold clear-start">
                      {" "}
                      <span>$</span> {pro.hourlyPay}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-cyan-500/20 hover:bg-cyan-500/10 transition-colors">
                <td className="py-4 px-6 text-gray-300 font-medium">
                  Delivery Time
                </td>
                <td className="text-center py-4 px-6 text-gray-300">
                  {basic.duration} days
                </td>
                <td className="text-center py-4 px-6 text-gray-300">
                  {standard.duration} days
                </td>
                <td className="text-center py-4 px-6 text-gray-300">
                  {pro.duration} days
                </td>
              </tr>
              <tr className="border-b border-cyan-500/20 hover:bg-cyan-500/10 transition-colors">
                <td className="py-4 px-6 text-gray-300 underline font-medium">
                  Number of Revisions
                </td>
                <td className="text-center py-4 px-6 text-gray-300">
                  {basic.code_reviews}
                </td>
                <td className="text-center py-4 px-6 text-gray-300">
                  {standard.code_reviews}
                </td>
                <td className="text-center py-4 px-6 text-gray-300">
                  {pro.code_reviews}
                </td>
              </tr>
              <tr className="border-b border-cyan-500/20 hover:bg-cyan-500/10 transition-colors">
                <td className="py-4 px-6 text-gray-300 underline font-medium">
                  Number of Pages
                </td>
                <td className="text-center py-4 px-6 text-gray-300">1</td>
                <td className="text-center py-4 px-6 text-gray-300">2</td>
                <td className="text-center py-4 px-6 text-gray-300">3</td>
              </tr>
              <tr className="border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 hover:bg-cyan-500/10 transition-colors">
                <td className="py-4 px-6 text-gray-300 underline font-medium">
                  Design Customization
                </td>

                <td className="text-center py-4 px-6 text-gray-300">
                  {basic.custom_ui ? (
                    <Check className="w-6 h-6 text-green-400 mx-auto" />
                  ) : (
                    ""
                  )}
                </td>
                <td className="text-center py-4 px-6">
                {basic.custom_ui ? (
                    <Check className="w-6 h-6 text-green-400 mx-auto" />
                  ) : (
                    ""
                  )}
                </td>
                <td className="text-center py-4 px-6">
                 {basic.custom_ui ? (
                    <Check className="w-6 h-6 text-green-400 mx-auto" />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr className="border-b border-cyan-500/20 hover:bg-cyan-500/10 transition-colors">
                <td className="py-4 px-6 text-gray-300 font-medium">
                  Content Upload
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="w-6 h-6 text-green-400 mx-auto" />
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="w-6 h-6 text-green-400 mx-auto" />
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="w-6 h-6 text-green-400 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 hover:bg-cyan-500/10 transition-colors">
                <td className="py-4 px-6 text-gray-300 underline font-medium">
                  Responsive Design
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="w-6 h-6 text-green-400 mx-auto" />
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="w-6 h-6 text-green-400 mx-auto" />
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="w-6 h-6 text-green-400 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-cyan-500/10 transition-colors">
                <td className="py-4 px-6 text-gray-300 underline font-medium">
                  Source Code
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="w-6 h-6 text-gray-300 mx-auto" />
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="w-6 h-6 text-green-400 mx-auto" />
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="w-6 h-6 text-green-400 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border-t border-cyan-500/20">
          <h3 className="font-semibold text-white mb-2">Optional add-ons</h3>
          <p className="text-sm text-gray-400 mb-3">
            You can add these on the next page.
          </p>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Fast Delivery</span>
            <span className="text-cyan-400 font-semibold">+$50 - $100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTiersTable;
