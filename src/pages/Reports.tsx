import React from 'react';
import { FileText, Download, Printer, Share2 } from 'lucide-react';
import { generateMockTenders } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';

export const Reports: React.FC = () => {
  const tenders = generateMockTenders();
  const completedTenders = tenders.filter(t => t.status === 'Completed');

  const handleDownloadReport = (tenderId: string) => {
    alert(`Downloading report for tender ${tenderId}...`);
  };

  const handlePrintReport = (tenderId: string) => {
    alert(`Printing report for tender ${tenderId}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">Generate and download audit-ready evaluation reports</p>
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-blue-900" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Full Evaluation Report</h3>
          <p className="text-sm text-gray-600 mb-4">
            Complete tender evaluation with all vendor details, scores, and AI explanations
          </p>
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
              Generate
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-green-700" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Vendor Comparison</h3>
          <p className="text-sm text-gray-600 mb-4">
            Side-by-side comparison of all vendors with scoring matrix and rankings
          </p>
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
              Generate
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-red-700" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Fraud Report</h3>
          <p className="text-sm text-gray-600 mb-4">
            Detailed fraud detection report with all alerts and security flags
          </p>
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Available Reports</h2>
        
        {completedTenders.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No completed evaluations available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {completedTenders.map((tender) => (
              <div
                key={tender.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{tender.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Evaluated: {tender.evaluatedAt?.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{tender.vendorCount} Vendors</span>
                      <span>•</span>
                      <StatusBadge status={tender.status} size="sm" />
                    </div>
                  </div>
                </div>

                {/* Report Stats */}
                <div className="grid grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Pass</p>
                    <p className="text-lg font-bold text-green-700">
                      {tender.vendors.filter(v => v.status === 'Pass').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Fail</p>
                    <p className="text-lg font-bold text-red-700">
                      {tender.vendors.filter(v => v.status === 'Fail').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Review</p>
                    <p className="text-lg font-bold text-yellow-700">
                      {tender.vendors.filter(v => v.status === 'Review').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Fraud Alerts</p>
                    <p className="text-lg font-bold text-gray-900">
                      {tender.vendors.reduce((acc, v) => acc + v.fraudFlags.length, 0)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDownloadReport(tender.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button
                    onClick={() => handlePrintReport(tender.id)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
