interface Issue {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

export function IssueTable({ issues }: { issues: Issue[] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h2 className="text-lg font-medium mb-3">Open Issues</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="pb-2">Title</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {issues?.map((issue) => (
            <tr key={issue.id} className="border-b border-gray-50">
              <td className="py-2 text-gray-800">{issue.title}</td>
              <td className="py-2">
                <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-800">
                  {issue.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
