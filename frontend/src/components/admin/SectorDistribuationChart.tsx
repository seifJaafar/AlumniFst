import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface SectorDistributionChartProps {
  data: Array<{ sector: string; count: number }>;
}

const COLORS = [
  "hsl(37, 100%, 45%)",
  "hsl(217, 91%, 60%)",
  "hsl(142, 71%, 45%)",
  "hsl(271, 81%, 56%)",
  "hsl(10, 79%, 58%)",
];

export const SectorDistributionChart = ({
  data,
}: SectorDistributionChartProps) => {
  const chartData = data.map((item) => ({
    name: item.sector,
    value: item.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alumni by Industry Sector</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
