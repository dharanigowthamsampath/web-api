"use client";

import { useState, useEffect } from "react";

interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  sample: string;
}

export default function Home() {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
  const [openEndpoint, setOpenEndpoint] = useState<number | null>(null);

  useEffect(() => {
    // This is a placeholder. In a real scenario, you'd fetch this data from your API
    setEndpoints([
      {
        method: "GET",
        path: "/api/jobs",
        description: "Get all jobs",
        sample: `{
  "jobs": [
    {
      "id": 1,
      "title": "Software Engineer",
      "company": "Tech Co"
    }
  ],
  "metadata": {
    "currentPage": 1,
    "totalPages": 1,
    "totalJobs": 1,
    "limit": 5
  }
}`,
      },
      {
        method: "POST",
        path: "/api/jobs",
        description: "Create a new job",
        sample: `{
  "title": "Frontend Developer",
  "company": "Web Solutions Inc",
  "description": "Exciting opportunity for a skilled frontend developer"
}`,
      },
    ]);
  }, []);

  const toggleEndpoint = (index: number) => {
    setOpenEndpoint(openEndpoint === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white">
      <main>
        <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
        <div className="space-y-4">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="border border-gray-700 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    endpoint.method === "GET" ? "bg-blue-600" : "bg-green-600"
                  }`}
                >
                  {endpoint.method}
                </span>
                <span className="font-mono">{endpoint.path}</span>
              </div>
              <p className="text-gray-300">{endpoint.description}</p>
              <button
                onClick={() => toggleEndpoint(index)}
                className="text-blue-400 hover:underline mt-2 inline-block focus:outline-none"
              >
                {openEndpoint === index ? "Hide Details" : "View Details"}
              </button>
              {openEndpoint === index && (
                <div className="mt-4 bg-gray-800 p-4 rounded">
                  <h3 className="font-semibold mb-2 text-gray-200">
                    Sample {endpoint.method === "GET" ? "Response" : "Request"}:
                  </h3>
                  <pre className="bg-gray-700 p-2 rounded overflow-x-auto text-gray-300">
                    <code>{endpoint.sample}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
