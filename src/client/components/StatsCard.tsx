interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: number;
}

export function StatsCard({ title, value, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
      {trend !== undefined && (
        <p className={`text-xs mt-1 ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
          {trend >= 0 ? "+" : ""}{trend}% from last week
        </p>
      )}
    </div>
  );
}
