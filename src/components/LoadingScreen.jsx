import React from 'react';
import { LoaderCircle } from 'lucide-react';

export default function LoadingScreen({ message = '正在为您加载...', variant = 'light' }) {
  const isDark = variant === 'dark';
  const surface = isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900';
  const panel = isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white';
  const muted = isDark ? 'text-slate-400' : 'text-slate-500';
  const skeleton = isDark ? 'bg-slate-800' : 'bg-slate-200';

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${surface}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-full max-w-sm px-6">
        <div className={`rounded-lg border p-6 shadow-sm ${panel}`}>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
              <LoaderCircle className="animate-spin motion-reduce:animate-none" size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-base font-black">{message}</p>
              <p className={`mt-1 text-sm ${muted}`}>内容马上就绪</p>
            </div>
          </div>

          <div className="mt-6 space-y-3" aria-hidden="true">
            <div className={`h-3 w-11/12 animate-pulse rounded motion-reduce:animate-none ${skeleton}`} />
            <div className={`h-3 w-full animate-pulse rounded motion-reduce:animate-none ${skeleton}`} />
            <div className={`h-3 w-7/12 animate-pulse rounded motion-reduce:animate-none ${skeleton}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
