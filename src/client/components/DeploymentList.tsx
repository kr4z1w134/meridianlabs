interface Deployment {
  id: string;
  environment: string;
  branch: string;
  status: string;
  createdAt: string;
}

export function DeploymentList({ deployments }: { deployments: Deployment[] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h2 className="text-lg font-medium mb-3">Recent Deployments</h2>
      <ul className="divide-y divide-gray-100">
        {deployments?.map((d) => (
          <li key={d.id} className="py-2 flex justify-between text-sm">
            <span className="font-mono text-gray-700">{d.branch}</span>
            <span className={d.status === "success" ? "text-green-600" : "text-yellow-600"}>
              {d.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
