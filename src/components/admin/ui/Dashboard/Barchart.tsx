import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  const data = [
    { name: "January", totalview: 4000 },
  { name: "February", totalview: 3000},
  { name: "March", totalview: 2000 },
  { name: "April", totalview: 2780},
  { name: "May", totalview: 1890 },
  { name: "June", totalview: 2390},
  { name: "July", totalview: 3490 },
  { name: "August", totalview: 4000},
  { name: "September", totalview: 4500 },
  { name: "October", totalview: 3700},
  { name: "November", totalview: 2900},
  { name: "December", totalview: 5000 },
  ];
  
  export default function BarChartSection() {
    return (
      <div className="w-full h-96 bg-gray-50 rounded-lg py-10 px-5 shadow-md">
        <h3 style={{ textAlign: "center", marginBottom: "20px", fontSize: "1.2rem", color: "#333" }}>User Activity Overview</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
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
            {/* <Legend wrapperStyle={{ color: "#333" }} /> */}
            <Bar dataKey="totalview" fill="#4f46e5" radius={[10, 10, 0, 0]} barSize={20} animationDuration={800} />
            
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  