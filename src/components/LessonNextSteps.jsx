import { ArrowLeft, ArrowRight, ClipboardCheck, FileQuestion, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';

const linkCardBase =
  'group flex min-h-24 flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md';

export default function LessonNextSteps({
  previous,
  next,
  practiceLinks = [],
  reviewTasks = [],
  className = '',
}) {
  return (
    <section
      className={`mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm ${className}`}
      aria-label="课后衔接"
    >
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 ring-1 ring-slate-200">
            <ListChecks size={14} />
            下一步
          </div>
          <h2 className="mt-2 text-xl font-black text-slate-900">学完这一课，别停在这里</h2>
        </div>
        <p className="text-sm font-medium text-slate-500">用复习、练习和下一课把知识接上。</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {previous && (
          <Link to={previous.path} className={linkCardBase}>
            <div className="flex items-center gap-2 text-sm font-black text-slate-500">
              <ArrowLeft size={16} />
              回看上一课
            </div>
            <div className="mt-3">
              <div className="text-base font-black text-slate-900">{previous.title}</div>
              {previous.reason && <div className="mt-1 text-sm leading-relaxed text-slate-500">{previous.reason}</div>}
            </div>
          </Link>
        )}

        {next && (
          <Link to={next.path} className={linkCardBase}>
            <div className="flex items-center gap-2 text-sm font-black text-blue-600">
              进入下一课
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </div>
            <div className="mt-3">
              <div className="text-base font-black text-slate-900">{next.title}</div>
              {next.reason && <div className="mt-1 text-sm leading-relaxed text-slate-500">{next.reason}</div>}
            </div>
          </Link>
        )}
      </div>

      {(practiceLinks.length > 0 || reviewTasks.length > 0) && (
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {practiceLinks.length > 0 && (
            <div className="rounded-lg border border-blue-100 bg-white p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-black text-blue-700">
                <FileQuestion size={16} />
                配套练习
              </div>
              <div className="space-y-2">
                {practiceLinks.map((item) => (
                  <Link
                    key={`${item.path}-${item.label}`}
                    to={item.path}
                    className="flex items-center justify-between gap-3 rounded-md bg-blue-50 px-3 py-2 text-sm font-bold text-blue-800 transition hover:bg-blue-100"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {reviewTasks.length > 0 && (
            <div className="rounded-lg border border-emerald-100 bg-white p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-black text-emerald-700">
                <ClipboardCheck size={16} />
                复习任务
              </div>
              <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
                {reviewTasks.map((task) => (
                  <li key={task} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
