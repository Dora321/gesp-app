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
      className={`inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 ${className}`}
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
        <span className="inline-flex min-w-0 items-center gap-1.5 text-sm font-semibold text-slate-600">
          <Icon size={14} className="shrink-0 text-slate-500" aria-hidden="true" />
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
        className="max-h-96 overflow-auto whitespace-pre p-3 font-mono text-[15px] leading-6 text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-500"
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
  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
    <Icon size={14} className="text-slate-500" aria-hidden="true" />
    {children}
  </span>
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

  // 题面是主角：只有一层白底（由外层页面提供），小节用「标题 + 1px 分隔线」，
  // 不再一节一张卡；只有样例代码框保留边框。正文列限宽 720px，约 36 字/行。
  const renderSection = (section, index) => {
    const Icon = SECTION_ICONS[section.key] || FileText;
    const isConstraints = section.key === 'constraints';
    return (
      <motion.section
        key={section.key}
        {...enter(index + 1)}
        className="coding-section border-t border-slate-200 pt-5 first:border-t-0 first:pt-0"
      >
        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <Icon size={18} className="shrink-0 text-slate-500" aria-hidden="true" />
          {section.label}
        </h3>
        <div className={`mt-2 min-w-0 ${isConstraints ? 'rounded-r-lg border-l-4 border-amber-500 bg-amber-50 px-4 py-3' : ''}`}>
          <MarkdownRenderer
            content={section.markdown}
            className={`text-[17px] font-normal leading-8 md:text-lg ${isConstraints ? 'text-amber-950' : 'text-slate-800'}`}
          />
        </div>
      </motion.section>
    );
  };

  const actionBar = showSidebar ? (
    <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:flex-wrap sm:items-center">
      {luoguUrl && (
        <a
          href={luoguUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mw-button mw-button--primary mw-button--small"
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
          className="min-h-10 border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-100"
        />
      )}
      {showReveal && (
        <button
          type="button"
          onClick={onReveal}
          className="mw-button mw-button--secondary mw-button--small"
        >
          <Lightbulb size={16} aria-hidden="true" />
          看思路与参考代码
        </button>
      )}
      {actions}
      <p className="text-sm leading-6 text-slate-600 sm:basis-full">
        {isExam
          ? '编程题这里不判分：写完可以去洛谷提交，交卷后可在解析模式对照参考代码。'
          : '先自己想一想，写完再看思路哦。'}
      </p>
    </div>
  ) : null;

  const body = (
    <div className="coding-problem space-y-6">
      <motion.header {...enter(0)} className="border-b border-slate-200 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
            <Code2 size={14} aria-hidden="true" />
            编程题
          </span>
          <span className="text-base text-slate-600">第 {questionNumber} 题</span>
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-[28px] md:leading-tight">{title}</h2>
        {(score !== undefined || timeLimit || memoryLimit || tags.length > 0) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {score !== undefined && <InfoChip icon={Award}>{score} 分</InfoChip>}
            {timeLimit && <InfoChip icon={Clock}>时间限制 {timeLimit}</InfoChip>}
            {memoryLimit && <InfoChip icon={Cpu}>内存限制 {memoryLimit}</InfoChip>}
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-sm text-slate-600">
                <Tags size={13} aria-hidden="true" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.header>

      {actionBar}

      <div className="min-w-0 max-w-[720px] space-y-6">
        {preSections.map((section) => renderSection(section, sections.indexOf(section)))}

        {samples.length > 0 && (
          <motion.section
            {...enter(sections.length + 1)}
            className="coding-section border-t border-slate-200 pt-5"
          >
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <FlaskConical size={18} className="shrink-0 text-slate-500" aria-hidden="true" />
              样例
            </h3>

            <div className="mt-3 space-y-5">
              {samples.map((sample, index) => (
                <div key={index}>
                  {samples.length > 1 && <div className="mb-2 text-base font-semibold text-slate-700">样例 {index + 1}</div>}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                    <div role="note" className="mt-3 flex items-start gap-2 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 px-3 py-2.5 text-base leading-7 text-amber-950">
                      <Lightbulb size={16} className="mt-1.5 shrink-0 text-amber-700" aria-hidden="true" />
                      <div className="min-w-0">
                        <MarkdownRenderer content={sample.note} className="text-base font-normal leading-7 text-amber-950" />
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
            className="coding-section border-t border-slate-200 pt-5"
          >
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Lightbulb size={18} className="shrink-0 text-amber-600" aria-hidden="true" />
              样例说明
            </h3>
            <div className="mt-2 space-y-2">
              {extraNotes.map((note, index) => (
                <MarkdownRenderer
                  key={index}
                  content={note}
                  className="text-[17px] font-normal leading-8 text-slate-800 md:text-lg"
                />
              ))}
            </div>
          </motion.section>
        )}
        {postSections.map((section) => renderSection(section, sections.indexOf(section) + 2))}
      </div>
    </div>
  );

  if (isReview) {
    return (
      <details className="group rounded-xl border border-slate-200 bg-white">
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2.5 px-4 py-3 text-sm font-semibold text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-500 md:px-5 [&::-webkit-details-marker]:hidden">
          <span
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
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
        <div className="border-t border-slate-100 p-4 md:p-6">{body}</div>
      </details>
    );
  }

  return body;
}
