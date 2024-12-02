"use client";

import { useAdmin } from "@/hooks/useAdmin";

export default function AdminConsoleLogger() {
  const { admin, loading, error } = useAdmin();

  // Log admin data to console whenever it updates
  useEffect(() => {
    if (admin) {
      console.log("Fetched Admin Data:", admin);
    }
  }, [admin]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state
  }

  if (error) {
    console.error("Error fetching admin data:", error);
    return <div>Error: {error}</div>; // Handle errors
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Data Logger</h1>
      <p>Check the console for fetched admin data.</p>
    </div>
  );
}
