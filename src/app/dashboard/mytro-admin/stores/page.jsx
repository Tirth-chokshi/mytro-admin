import DataTable from "./Table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div>
      <div className="flex justify-end items-center gap-4 mb-4">
        <Link href="/dashboard/mytro-admin/stores/new">
          <Button variant="outline" className="flex items-center gap-2">
            <Plus size={16} />
            <span>Add New Zone</span>
          </Button>
        </Link>
      </div>
      <DataTable />
    </div>
  );
}
