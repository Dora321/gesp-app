import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Award,
  BookOpen,
  Check,
  Clock,
  ChevronDown,
  Code2,
  Copy,
  Cpu,
  ExternalLink,
  FileText,
  FlaskConical,
  Gauge,
  Lightbulb,
  Link as LinkIcon,
  Sparkles,
  Tags,
} from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import HighlightedCode from './HighlightedCode';
import { parseCodingProblem } from '../utils/codingProblemSections';

const SECTION_ICONS = {
  background: Sparkles,
  description: BookOpen,
  input: ArrowDownToLine,
  output: ArrowUpFromLine,
  samples: FlaskConical,
  constraints: Gauge,
  hint: Lightbulb,
  link: LinkIcon,
  other: FileText,
};

const SECTION_TONES = {
  background: 'border-amber-200 bg-amber-50 text-amber-800',
  description: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  input: 'border-teal-200 bg-teal-50 text-teal-800',
  output: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  samples: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  constraints: 'border-amber-200 bg-amber-50 text-amber-800',
  hint: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  link: 'border-slate-200 bg-slate-100 text-slate-700',
  other: 'border-slate-200 bg-slate-100 text-slate-700',
};

const CopyTextButton = ({ text, label, copiedLabel = '已复制', ariaLabel, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!navigator.clipboard?.writeText) return;
    try {
      await navigator.clipboard.writeText(String(text ?? ''));
    } catch {
      return;
    }
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1500);
  }, [text]);

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={ariaLabel || label}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${className}`}
    >
      <Icon size={14} aria-hidden="true" />
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
};

/**
 * 浅色代码块 + 复制按钮。解析页的代码模板/参考代码和作答页样例共用同一套
 * 复制行为与滚动样式，避免每处再手写一遍 button + pre。
 */
export function CopyableCodeBlock({
  code,
  label,
  language = 'cpp',
  ariaLabel,
  codeAriaLabel,
  icon: Icon = Code2,
  className = '',
}) {
  const text = typeof code === 'string' ? code : String(code ?? '');

  return (
    <div className={`copyable-code-block min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 ${className}`}>
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 bg-white/70 px-3 py-1.5">
        <span className="inline-flex min-w-0 items-center gap-1.5 text-xs font-semibold text-slate-600">
          <Icon size={13} className="shrink-0 text-emerald-700" aria-hidden="true" />
          <span className="truncate">{label}</span>
        </span>
        <CopyTextButton
          text={text}
          label="复制"
          ariaLabel={ariaLabel || `复制${label}`}
          className="shrink-0 border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
        />
      </div>
      <pre
        tabIndex={0}
        aria-label={codeAriaLabel || label}
        className="max-h-96 overflow-auto whitespace-pre p-3 font-mono text-[13px] leading-6 text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500"
      >
        <HighlightedCode code={text} language={language} />
      </pre>
    </div>
  );
}

const SampleBlock = ({ kind, value, sampleIndex, icon: Icon }) => {
  const label = kind === 'input' ? '输入' : '输出';

  return (
    <CopyableCodeBlock
      code={value}
      label={label}
      language="text"
      icon={Icon}
      ariaLabel={`复制样例 ${sampleIndex + 1} ${label}`}
      codeAriaLabel={`样例 ${sampleIndex + 1} ${label}`}
    />
  );
};

const InfoChip = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
    <Icon size={13} className="text-emerald-700" aria-hidden="true" />
    {children}
  </span>
);

const InfoRow = ({ label, value }) => (
  <div className="flex items-start justify-between gap-3">
    <dt className="shrink-0 text-slate-500">{label}</dt>
    <dd className="text-right font-medium text-slate-800">{value}</dd>
  </div>
);

export default function CodingProblemView({
  q,
  questionNumber,
  luoguUrl = null,
  onReveal,
  variant = 'practice',
  actions = null,
}) {
  const reduceMotion = useReducedMotion();
  const parsed = useMemo(() => parseCodingProblem(q), [q]);
  const { title, sections, samples, extraNotes } = parsed;

  const isExam = variant === 'exam';
  const isReview = variant === 'review';
  const showSidebar = !isReview;
  const showReveal = !isExam && Boolean(onReveal);

  const score = q?.score;
  const timeLimit = q?.timeLimit;
  const memoryLimit = q?.memoryLimit;
  const tags = Array.isArray(q?.tags) ? q.tags.filter(Boolean) : [];
  const template = typeof q?.template === 'string' ? q.template : '';

  const enter = (index) => (reduceMotion
    ? {}
    : {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.28, delay: Math.min(index * 0.04, 0.24) },
    });

  const PRE_KEYS = ['background', 'description', 'input', 'output'];
  const preSections = sections.filter((section) => PRE_KEYS.includes(section.key));
  const postSections = sections.filter((section) => !PRE_KEYS.includes(section.key));

  const renderSection = (section, index) => {
    const Icon = SECTION_ICONS[section.key] || FileText;
    const isConstraints = section.key === 'constraints';
    return (
      <motion.section
        key={section.key}
        {...enter(index + 1)}
        className={isConstraints
          ? 'rounded-xl border border-amber-200 border-l-4 border-l-amber-500 bg-amber-50 p-4 md:p-5'
          : 'rounded-xl border border-slate-200 bg-white p-4 md:p-5'}
      >
        <h3 className="flex items-center gap-2.5 text-[15px] font-semibold text-slate-800 md:text-base">
          <span
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${SECTION_TONES[section.key] || SECTION_TONES.other}`}
            aria-hidden="true"
          >
            <Icon size={16} />
          </span>
          {section.label}
        </h3>
        <div className="mt-3 min-w-0">
          <MarkdownRenderer
            content={section.markdown}
            className={`text-[15px] font-normal leading-7 md:text-base ${isConstraints ? 'text-amber-950' : 'text-slate-700'}`}
          />
        </div>
      </motion.section>
    );
  };

  const body = (
    <div className="space-y-4">
      <motion.header
        {...enter(0)}
        className={`rounded-xl border border-slate-200 bg-white ${isReview ? 'p-4' : 'p-5 md:p-6'}`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
            <Code2 size={13} aria-hidden="true" />
            编程题
          </span>
          <span className="text-sm text-slate-500">第 {questionNumber} 题</span>
        </div>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 md:text-2xl">{title}</h2>
        {(score !== undefined || timeLimit || memoryLimit) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {score !== undefined && <InfoChip icon={Award}>{score} 分</InfoChip>}
            {timeLimit && <InfoChip icon={Clock}>时间限制 {timeLimit}</InfoChip>}
            {memoryLimit && <InfoChip icon={Cpu}>内存限制 {memoryLimit}</InfoChip>}
            {tags.map((tag) => (
              <span key={tag} className={`rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs text-emerald-800 ${isReview ? '' : 'lg:hidden'}`}>#{tag}</span>
            ))}
          </div>
        )}
      </motion.header>

      <div className={isReview ? 'space-y-4' : 'grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start'}>
        <div className="min-w-0 space-y-4">
          {preSections.map((section) => renderSection(section, sections.indexOf(section)))}

          {samples.length > 0 && (
            <motion.section
              {...enter(sections.length + 1)}
              className="rounded-xl border border-slate-200 bg-white p-4 md:p-5"
            >
              <h3 className="flex items-center gap-2.5 text-[15px] font-semibold text-slate-800 md:text-base">
                <span
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${SECTION_TONES.samples}`}
                  aria-hidden="true"
                >
                  <FlaskConical size={16} />
                </span>
                样例
              </h3>

              <div className="mt-3 space-y-4">
                {samples.map((sample, index) => (
                  <div key={index} className="sm:rounded-lg sm:border sm:border-slate-200 sm:bg-white sm:p-3">
                    <div className="mb-2 text-xs font-semibold text-slate-500">样例 {index + 1}</div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <SampleBlock
                        kind="input"
                        value={sample.input}
                        sampleIndex={index}
                        icon={ArrowDownToLine}
                      />
                      <SampleBlock
                        kind="output"
                        value={sample.output}
                        sampleIndex={index}
                        icon={ArrowUpFromLine}
                      />
                    </div>
                    {sample.note && (
                      <div role="note" className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm leading-6 text-amber-950">
                        <Lightbulb size={16} className="mt-0.5 shrink-0 text-amber-700" aria-hidden="true" />
                        <div className="min-w-0">
                          <MarkdownRenderer content={sample.note} className="text-sm font-normal leading-6 text-amber-950" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {extraNotes.length > 0 && (
            <motion.section
              {...enter(sections.length + 2)}
              className="rounded-xl border border-amber-200 bg-amber-50 p-4 md:p-5"
            >
              <h3 className="flex items-center gap-2.5 text-[15px] font-semibold text-amber-900 md:text-base">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-200 bg-amber-100 text-amber-800" aria-hidden="true">
                  <Lightbulb size={16} />
                </span>
                样例说明
              </h3>
              <div className="mt-3 space-y-2">
                {extraNotes.map((note, index) => (
                  <MarkdownRenderer
                    key={index}
                    content={note}
                    className="text-sm font-normal leading-6 text-amber-950"
                  />
                ))}
              </div>
            </motion.section>
          )}
          {postSections.map((section) => renderSection(section, sections.indexOf(section) + 2))}
        </div>

        {showSidebar && (
          <aside className="space-y-4 lg:sticky lg:top-28">
          <section className="hidden rounded-xl border border-slate-200 bg-white p-4 lg:block">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Tags size={15} className="text-emerald-700" aria-hidden="true" />
              题目信息
            </h3>
            <dl className="mt-3 space-y-2 text-sm">
              <InfoRow label="题号" value={`第 ${questionNumber} 题`} />
              {score !== undefined && <InfoRow label="分值" value={`${score} 分`} />}
              {timeLimit && <InfoRow label="时间限制" value={timeLimit} />}
              {memoryLimit && <InfoRow label="内存限制" value={memoryLimit} />}
            </dl>
            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs text-emerald-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Sparkles size={15} className="text-amber-600" aria-hidden="true" />
              开始做题
            </h3>
            <div className="mt-3 space-y-2">
              {luoguUrl && (
                <a
                  href={luoguUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  去洛谷提交代码
                </a>
              )}
              {template && (
                <CopyTextButton
                  text={template}
                  label="复制代码模板"
                  ariaLabel="复制代码模板"
                  className="w-full border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                />
              )}
              {showReveal && (
                <button
                  type="button"
                  onClick={onReveal}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-100"
                >
                  <Lightbulb size={16} aria-hidden="true" />
                  看思路与参考代码
                </button>
              )}
              {actions}
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              {isExam
                ? '考试模式下编程题不自动判分，交卷后会提示人工评阅。'
                : '先自己想一想，写完再看思路哦。'}
            </p>
          </section>
        </aside>
        )}
      </div>
    </div>
  );

  if (isReview) {
    return (
      <details className="group rounded-xl border border-slate-200 bg-white">
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2.5 px-4 py-3 text-sm font-semibold text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500 md:px-5 [&::-webkit-details-marker]:hidden">
          <span
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800"
            aria-hidden="true"
          >
            <BookOpen size={16} />
          </span>
          <span className="min-w-0 flex-1 truncate">
            题面回顾{title ? <span className="font-normal text-slate-600"> · {title}</span> : null}
          </span>
          <span className="shrink-0 text-xs font-normal text-slate-600 group-open:hidden">点开再看一遍</span>
          <ChevronDown size={16} className="shrink-0 text-slate-500 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="border-t border-slate-100 p-3 md:p-4">{body}</div>
      </details>
    );
  }

  return body;
}
