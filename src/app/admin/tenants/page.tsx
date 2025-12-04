"use client";

import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tenant, columns } from "./columns";
import { DataTable } from "./data-table";

// In a real app, you would fetch this data from your API
async function getTenants(): Promise<Tenant[]> {
  // For now, return an empty array
  return [];
}

export default function TenantManagementPage() {
  const [data, setData] = useState<Tenant[]>([]);

  useEffect(() => {
    getTenants().then((tenants) => setData(tenants));
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tenant Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Tenant
        </Button>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
