import React, { useState } from 'react';
import { FileText, Check, X, AlertTriangle, Award, TrendingUp, DollarSign, ShieldAlert } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { generateMockTenders } from '../data/mockData';
import { Vendor } from '../types';

export const Evaluations: React.FC = () => {
  const tenders = generateMockTenders();
  const completedTender = tenders.find((t) => t.status === 'Completed' && t.vendors.length > 0);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(
    completedTender?.vendors[0] || null
  );

  if (!completedTender) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">No Evaluations Found</h2>
        <p className="text-gray-600">Upload a tender to start evaluation</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{completedTender.name}</h1>
        <p className="text-gray-600 mt-1">
          Evaluated {completedTender.vendorCount} vendors • Completed on{' '}
          {completedTender.evaluatedAt?.toLocaleDateString()}
        </p>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Vendor List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Vendors</h2>
            <div className="space-y-2">
              {completedTender.vendors.map((vendor) => (
                <button
                  key={vendor.id}
                  onClick={() => setSelectedVendor(vendor)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedVendor?.id === vendor.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-sm">{vendor.name}</h3>
                    <StatusBadge status={vendor.status} size="sm" />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>{vendor.finalScore}</span>
                    </div>
                    {vendor.fraudFlags.length > 0 && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{vendor.fraudFlags.length}</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Vendor Details */}
        {selectedVendor && (
          <div className="lg:col-span-2 space-y-6">
            {/* Vendor Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedVendor.name}</h2>
                  <p className="text-sm text-gray-600">
                    Submitted on {selectedVendor.submittedAt.toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={selectedVendor.status} size="lg" />
              </div>

              {/* Score Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-900" />
                    <p className="text-sm font-medium text-gray-700">Technical</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{selectedVendor.technicalScore}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-700" />
                    <p className="text-sm font-medium text-gray-700">Financial</p>
                  </div>
                  <p className="text-2xl font-bold text-green-700">{selectedVendor.financialScore}</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-indigo-700" />
                    <p className="text-sm font-medium text-gray-700">Final Score</p>
                  </div>
                  <p className="text-2xl font-bold text-indigo-700">{selectedVendor.finalScore}</p>
                </div>
              </div>
            </div>

            {/* Eligibility Checklist */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Eligibility Checklist</h3>
              <div className="space-y-3">
                {selectedVendor.eligibilityCriteria.map((criterion, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-4 rounded-lg ${
                      criterion.passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {criterion.passed ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <X className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{criterion.name}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm">
                        <span className="text-gray-600">Required: {criterion.required}</span>
                        <span className={criterion.passed ? 'text-green-700' : 'text-red-700'}>
                          Actual: {criterion.actual}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fraud Flags */}
            {selectedVendor.fraudFlags.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldAlert className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg font-bold text-red-900">Fraud Alerts</h3>
                </div>
                <div className="space-y-3">
                  {selectedVendor.fraudFlags.map((flag, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        flag.severity === 'High'
                          ? 'bg-red-50 border-red-200'
                          : flag.severity === 'Medium'
                          ? 'bg-orange-50 border-orange-200'
                          : 'bg-yellow-50 border-yellow-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-gray-900">{flag.type}</p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            flag.severity === 'High'
                              ? 'bg-red-200 text-red-900'
                              : flag.severity === 'Medium'
                              ? 'bg-orange-200 text-orange-900'
                              : 'bg-yellow-200 text-yellow-900'
                          }`}
                        >
                          {flag.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{flag.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Detected: {flag.detectedAt.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Explanation */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">AI Explanation</h3>
              <div className="space-y-2">
                {selectedVendor.status === 'Fail' && (
                  <div className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800">
                      <strong>Rejected:</strong> Vendor does not meet minimum eligibility requirements.
                      {selectedVendor.turnover < completedTender.requirements.minTurnover &&
                        ` Turnover ₹${selectedVendor.turnover}Cr is below required ₹${completedTender.requirements.minTurnover}Cr.`}
                      {!selectedVendor.hasCertification && ' Required certifications not provided.'}
                    </p>
                  </div>
                )}
                {selectedVendor.status === 'Pass' && (
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800">
                      <strong>Approved:</strong> Vendor meets all eligibility criteria with a strong score of{' '}
                      {selectedVendor.finalScore}/100. Technical and financial evaluations are satisfactory.
                    </p>
                  </div>
                )}
                {selectedVendor.status === 'Review' && (
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800">
                      <strong>Requires Review:</strong> Vendor meets eligibility criteria but has {selectedVendor.fraudFlags.length} fraud alert(s) that require manual verification before final approval.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
