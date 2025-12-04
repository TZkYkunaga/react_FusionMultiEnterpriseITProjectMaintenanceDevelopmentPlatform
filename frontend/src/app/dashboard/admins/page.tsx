"use server";
import React from 'react';

type Admin = {
  id: number;
  email: string;
  name?: string;
  createdAt?: string;
};

async function getAdmins(): Promise<Admin[]> {
  const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:5000';
  const res = await fetch(`${backendUrl}/api/admin/Admins`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch admins');
  }
  return res.json();
}

export default async function AdminsPage() {
  let admins: Admin[] = [];
  try {
    admins = await getAdmins();
  } catch (e) {
    // swallow and render empty state
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Platform Admins</h1>
      {admins.length === 0 ? (
        <div className="text-muted-foreground">No admins found.</div>
      ) : (
        <ul className="space-y-2">
          {admins.map((a) => (
            <li key={a.id} className="p-2 border rounded">
              <div className="font-medium">{a.name ?? '—'}</div>
              <div className="text-sm text-muted-foreground">{a.email}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
