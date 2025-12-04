"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Tenant = {
  id: string;
  name: string;
  domain: string;
  status: "Active" | "Inactive" | "Suspended";
};

export const columns: ColumnDef<Tenant>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "domain",
    header: "Domain",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const statusClass =
          status === "Active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800";
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>{status}</span>;
      },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tenant = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(tenant.id)}
            >
              Copy tenant ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Tenant</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete Tenant</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
