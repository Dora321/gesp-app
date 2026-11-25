import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import { placementQuestions, scorePlacement } from '../data/placementDiagnostic';

const disclaimer = '这是站内选课参考，不代表官方考级评定。';

function PlacementResult({ result, onRestart, headingRef }) {
  return (
    <section className="space-y-5 border-t-4 border-[var(--mw-line)] pt-5">
      <div>
        <p className="text-sm text-[var(--mw-ink-2)]">答对 {result.correctCount} / {placementQuestions.length} 题</p>
        <h2 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-extrabold">建议从 GESP C++ {result.level} 级开始</h2>
        <p className="mt-2 leading-relaxed">
          {result.firstGap ? `先补「${result.firstGap}」，再试一套本级真题。` : '这组题的基础检查全部通过，可以用一套六级真题检验应用能力。'}
        </p>
      </div>
      <div>
        <h3 className="font-bold">优先补练的互动课</h3>
        <ul className="mt-2 divide-y divide-[var(--mw-rule)] border-y border-[var(--mw-rule)]">
          {result.lessons.map(lesson => (
            <li key={lesson.path}>
              <Link to={lesson.path} className="mw-text-link flex min-h-11 items-center py-2">{lesson.fullTitle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-bold">首套练手真题</h3>
        <Link to={result.paperPath} className="mw-text-link inline-flex min-h-11 items-center">{result.paperTitle}</Link>
      </div>
      <details className="border-t border-[var(--mw-rule)]">
        <summary className="min-h-11 cursor-pointer py-3 font-semibold">查看逐题解析</summary>
        <ol className="divide-y divide-[var(--mw-rule)]">
          {result.responses.map((question, index) => (
            <li className="py-3" key={question.id}>
              <p className="font-bold">{index + 1}. {question.topic} · {question.correct ? '答对' : question.selected === -1 ? '不确定' : '答错'}</p>
              <p className="mt-1 text-sm text-[var(--mw-ink-2)]">你的选择：{question.options[question.selected] ?? '不确定'}</p>
              <p className="mt-1 text-sm leading-6">{question.explanation}</p>
            </li>
          ))}
        </ol>
      </details>
      <button type="button" className="mw-button mw-button--secondary" onClick={onRestart}>重新自测</button>
    </section>
  );
}

export default function PlacementQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const headingRef = useRef(null);
  const question = placementQuestions[step];

  useEffect(() => { headingRef.current?.focus({ preventScroll: true }); }, [step]);

  return (
    <div className="mw-line-cpp min-h-screen bg-[var(--mw-canvas)] text-[var(--mw-ink)]">
      <Navigation />
      <main className="mx-auto w-full max-w-3xl px-5 pt-24 pb-12 sm:px-8">
        <header className="mb-6">
          <h1 className="text-[length:var(--mw-text-display)] font-extrabold">起点定级诊断</h1>
          <p className="mt-2 leading-relaxed">约 3 分钟，共 {placementQuestions.length} 道题。从输入输出到树与动态规划，看看哪一级适合作为你的起点。</p>
          <p className="mt-1 text-sm text-[var(--mw-ink-2)]">{disclaimer}</p>
        </header>
        <div className="rounded-[var(--mw-radius-m)] border border-[var(--mw-rule)] bg-[var(--mw-surface)] p-4 sm:p-6">
          {question ? (
            <form onSubmit={event => {
              event.preventDefault();
              if (answers[question.id] !== undefined) setStep(step + 1);
            }}>
              <p className="text-sm font-semibold text-[var(--mw-line-ink)]">第 {step + 1} / {placementQuestions.length} 题 · {question.topic}</p>
              <h2 id="placement-question" ref={headingRef} tabIndex={-1} className="my-3 text-lg font-bold leading-relaxed">{question.prompt}</h2>
              {question.code && (
                <pre tabIndex={0} role="region" aria-label="题目代码" className="mw-code mb-4! overflow-x-auto p-3! text-sm">{question.code}</pre>
              )}
              <div role="radiogroup" aria-labelledby="placement-question" className="space-y-2" key={question.id}>
                {[...question.options, '不确定'].map((option, index) => {
                  const value = index === question.options.length ? -1 : index;
                  return (
                    <label key={option} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--mw-radius-m)] border border-[var(--mw-rule-strong)] px-3 py-2 leading-relaxed has-checked:border-[var(--mw-line-ink)] has-checked:bg-[var(--mw-line-wash)]">
                      <input
                        type="radio"
                        name={question.id}
                        checked={answers[question.id] === value}
                        onChange={() => setAnswers({ ...answers, [question.id]: value })}
                        className="h-4 w-4 shrink-0 accent-[var(--mw-line-ink)]"
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="mw-button mw-button--secondary">上一题</button>}
                <button type="submit" disabled={answers[question.id] === undefined} className="mw-button mw-button--primary disabled:opacity-50">
                  {step + 1 === placementQuestions.length ? '看我的起点' : '下一题'} <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </form>
          ) : (
            <PlacementResult result={scorePlacement(answers)} headingRef={headingRef} onRestart={() => { setAnswers({}); setStep(0); }} />
          )}
        </div>
      </main>
    </div>
  );
}
