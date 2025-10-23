import { requireUser } from "@/lib/auth";
import { ReactNode } from "react";
import Link from "next/link";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireUser("/dashboard");

  if (user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-amber-900 mb-3">Access Restricted</h1>
          <p className="text-sm text-amber-700/70 mb-8">
            You need an admin role to access the dashboard. Contact support if this is a mistake.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white font-semibold hover:shadow-lg hover:shadow-amber-600/30 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-orange-50/30 dark:bg-gradient-to-br dark:from-gray-950 dark:via-black dark:to-gray-900">
      <DashboardNav userName={user.name} userEmail={user.email} />
      <main className="pt-[120px] lg:pt-16 lg:pl-64">
        <div className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
