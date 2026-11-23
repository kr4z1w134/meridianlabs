import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "../components/StatsCard";
import { DeploymentList } from "../components/DeploymentList";
import { IssueTable } from "../components/IssueTable";

async function fetchStats() {
  const res = await fetch("/api/stats");
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats,
    refetchInterval: 60_000,
  });

  if (isLoading) return <div className="animate-pulse">Loading dashboard...</div>;
  if (error) return <div className="text-red-600">Error loading dashboard</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Active Users" value={data.activeUsers} trend={data.usersTrend} />
        <StatsCard title="Open Issues" value={data.openIssues} trend={data.issuesTrend} />
        <StatsCard title="Deploys (7d)" value={data.recentDeploys} />
        <StatsCard title="Uptime" value={`${data.uptime}%`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeploymentList deployments={data.recentDeployments} />
        <IssueTable issues={data.recentIssues} />
      </div>
    </div>
  );
}
