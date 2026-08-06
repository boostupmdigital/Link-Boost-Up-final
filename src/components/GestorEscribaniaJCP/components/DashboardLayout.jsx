import React from "react";

const DashboardLayout = ({
  children,
  pageTitle,
  pageDescription,
}) => {
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">
      <main className="min-h-screen w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1600px]">
          <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-600">
              Sistema Integral de Gestión
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              {pageTitle}
            </h1>

            {pageDescription && (
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                {pageDescription}
              </p>
            )}
          </header>

          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;