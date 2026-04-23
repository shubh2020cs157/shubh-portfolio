import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <h1
          className="text-2xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-on-surface)",
          }}
        >
          Admin sign-in
        </h1>
        <p
          className="text-sm mb-8"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          Enter the admin token to moderate recommendations.
        </p>
        <Suspense fallback={null}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </main>
  );
}
