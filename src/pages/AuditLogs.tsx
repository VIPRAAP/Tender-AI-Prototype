import React, { useState } from 'react';
import { Search, ScrollText } from 'lucide-react';
import { generateMockAuditLogs } from '../data/mockData';
import { format } from 'date-fns';

export const AuditLogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const auditLogs = generateMockAuditLogs();

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600 mt-1">Complete activity trail for compliance and security</p>
        </div>

        {/* Search */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search logs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Total Logs</p>
          <p className="text-2xl font-bold text-gray-900">{auditLogs.length}</p>
        </div>
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
          <p className="text-sm font-medium text-blue-800 mb-1">User Actions</p>
          <p className="text-2xl font-bold text-blue-900">
            {auditLogs.filter(l => l.user !== 'system').length}
          </p>
        </div>
        <div className="bg-indigo-50 rounded-lg border border-indigo-200 p-4">
          <p className="text-sm font-medium text-indigo-800 mb-1">System Actions</p>
          <p className="text-2xl font-bold text-indigo-900">
            {auditLogs.filter(l => l.user === 'system').length}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg border border-green-200 p-4">
          <p className="text-sm font-medium text-green-800 mb-1">Last 24 Hours</p>
          <p className="text-2xl font-bold text-green-900">
            {auditLogs.filter(l => l.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000)).length}
          </p>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Action</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">User</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Timestamp</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">IP Address</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <ScrollText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No logs found</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{log.action}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${log.user === 'system' ? 'bg-blue-500' : 'bg-green-500'}`} />
                        <span className="text-gray-700">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">
                        {format(log.timestamp, 'MMM dd, yyyy')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(log.timestamp, 'hh:mm:ss a')}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {log.ipAddress}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{log.details || '—'}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
