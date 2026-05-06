import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Activity, AlertTriangle, Clock, Upload, TrendingUp } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StatCard } from '../components/StatCard';
import { getDashboardStats, generateMockTenders } from '../data/mockData';
import { format } from 'date-fns';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const stats = getDashboardStats();
  const tenders = generateMockTenders();

  // Vendor scores data for bar chart
  const vendorScoresData = tenders
    .find(t => t.status === 'Completed')
    ?.vendors.map(v => ({
      name: v.name.split(' ')[0],
      score: v.finalScore,
    })) || [];

  // Status distribution for pie chart
  const allVendors = tenders.flatMap(t => t.vendors);
  const statusCounts = {
    Pass: allVendors.filter(v => v.status === 'Pass').length,
    Fail: allVendors.filter(v => v.status === 'Fail').length,
    Review: allVendors.filter(v => v.status === 'Review').length,
  };

  const statusData = [
    { name: 'Pass', value: statusCounts.Pass, color: '#10B981' },
    { name: 'Fail', value: statusCounts.Fail, color: '#EF4444' },
    { name: 'Review', value: statusCounts.Review, color: '#F59E0B' },
  ];

  // Recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'evaluation',
      message: 'Highway Construction Project - NH44 evaluated',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 2,
      type: 'fraud',
      message: 'Fraud detected in QuickBuild Co. - Duplicate PAN',
      time: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: 3,
      type: 'upload',
      message: 'Smart City Infrastructure - Phase 2 uploaded',
      time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: 4,
      type: 'evaluation',
      message: 'Metro Rail Extension Project completed',
      time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of tender evaluation activities</p>
        </div>
        <button
          onClick={() => navigate('/upload')}
          className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center gap-2 shadow-lg"
        >
          <Upload className="w-5 h-5" />
          Upload New Tender
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tenders Evaluated"
          value={stats.totalTenders}
          icon={<FileText className="w-6 h-6 text-blue-900" />}
          trend="+12% from last month"
          trendUp={true}
        />
        <StatCard
          title="Active Evaluations"
          value={stats.activeEvaluations}
          icon={<Activity className="w-6 h-6 text-indigo-600" />}
        />
        <StatCard
          title="Fraud Alerts"
          value={stats.fraudAlerts}
          icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
          trend="-8% from last month"
          trendUp={false}
        />
        <StatCard
          title="Avg Evaluation Time"
          value={stats.avgEvaluationTime}
          icon={<Clock className="w-6 h-6 text-green-600" />}
          trend="-15% improvement"
          trendUp={true}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor Scores Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-900" />
            Vendor Scores - Latest Tender
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendorScoresData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#1E3A8A" name="Final Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Vendor Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'fraud'
                    ? 'bg-red-100'
                    : activity.type === 'evaluation'
                    ? 'bg-green-100'
                    : 'bg-blue-100'
                }`}
              >
                {activity.type === 'fraud' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                {activity.type === 'evaluation' && <FileText className="w-5 h-5 text-green-600" />}
                {activity.type === 'upload' && <Upload className="w-5 h-5 text-blue-600" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {format(activity.time, 'MMM dd, yyyy • hh:mm a')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
