import React, { useState } from 'react';
import { AlertTriangle, Filter } from 'lucide-react';
import { generateMockTenders } from '../data/mockData';
import { FraudFlag } from '../types';

interface FraudAlertWithVendor extends FraudFlag {
  vendorName: string;
  tenderId: string;
}

export const FraudAlerts: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  
  // Collect all fraud flags from all tenders
  const tenders = generateMockTenders();
  const allFraudAlerts: FraudAlertWithVendor[] = [];
  
  tenders.forEach((tender) => {
    tender.vendors.forEach((vendor) => {
      vendor.fraudFlags.forEach((flag) => {
        allFraudAlerts.push({
          ...flag,
          vendorName: vendor.name,
          tenderId: tender.id,
        });
      });
    });
  });

  const filteredAlerts = filter === 'All' 
    ? allFraudAlerts 
    : allFraudAlerts.filter(alert => alert.severity === filter);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fraud Alerts</h1>
          <p className="text-gray-600 mt-1">
            Monitoring {allFraudAlerts.length} fraud alerts across all tenders
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Severity</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Total Alerts</p>
          <p className="text-2xl font-bold text-gray-900">{allFraudAlerts.length}</p>
        </div>
        <div className="bg-red-50 rounded-lg border border-red-200 p-4">
          <p className="text-sm font-medium text-red-800 mb-1">High Severity</p>
          <p className="text-2xl font-bold text-red-900">
            {allFraudAlerts.filter(a => a.severity === 'High').length}
          </p>
        </div>
        <div className="bg-orange-50 rounded-lg border border-orange-200 p-4">
          <p className="text-sm font-medium text-orange-800 mb-1">Medium Severity</p>
          <p className="text-2xl font-bold text-orange-900">
            {allFraudAlerts.filter(a => a.severity === 'Medium').length}
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
          <p className="text-sm font-medium text-yellow-800 mb-1">Low Severity</p>
          <p className="text-2xl font-bold text-yellow-900">
            {allFraudAlerts.filter(a => a.severity === 'Low').length}
          </p>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Vendor Name</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Issue Type</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Severity</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Details</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAlerts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No fraud alerts found</p>
                </td>
              </tr>
            ) : (
              filteredAlerts.map((alert, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{alert.vendorName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-gray-900">{alert.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700 max-w-md">{alert.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{alert.detectedAt.toLocaleString()}</p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
