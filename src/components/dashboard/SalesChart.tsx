import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { chartData } from "@/data/mockData";

const chartConfig = {
  vendite: {
    label: "Vendite",
    color: "var(--chart-1)",
  },
};

export function SalesChart() {
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Grafico Vendite Mensili</h2>
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="vendite" fill="var(--color-vendite)" radius={5} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
