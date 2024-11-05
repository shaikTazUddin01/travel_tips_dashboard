import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'June', totalUsers: 1000, verifiedUsers: 800, activeUsers: 600 },
  { name: 'July', totalUsers: 800, verifiedUsers: 900, activeUsers: 700 },
  { name: 'August', totalUsers: 1400, verifiedUsers: 1000, activeUsers: 800 },
  { name: 'September', totalUsers: 1300, verifiedUsers: 1100, activeUsers: 900 },
  { name: 'October', totalUsers: 1200, verifiedUsers: 1200, activeUsers: 1100 },
  { name: 'November', totalUsers: 1500, verifiedUsers: 1300, activeUsers: 1200 },
];

export const StackedAreaChart = () => {
  return (
    <div className="w-full h-96 bg-gray-50 rounded-lg py-10 px-5 shadow-md">
      <h3 className="text-center mb-5 text-lg text-gray-800">User Activity Trends</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" stroke="#333" />
          <YAxis stroke="#333" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="totalUsers"
            stackId="1"
            stroke="#4f46e5"
            fill="rgba(79, 70, 229, 0.2)"
            strokeWidth={2}
            dot={{ fill: "#4f46e5", r: 3 }}
          />
          <Area
            type="monotone"
            dataKey="verifiedUsers"
            stackId="1"
            stroke="#82ca9d"
            fill="rgba(130, 202, 157, 0.2)"
            strokeWidth={2}
            dot={{ fill: "#82ca9d", r: 3 }}
          />
          <Area
            type="monotone"
            dataKey="activeUsers"
            stackId="1"
            stroke="#ffc658"
            fill="rgba(255, 198, 88, 0.2)"
            strokeWidth={2}
            dot={{ fill: "#ffc658", r: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
