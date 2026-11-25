import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const categories = [
  ['all', '全部'],
  ['course', '课程'],
  ['paper', '真题'],
  ['museum', '博物馆'],
];
const labels = Object.fromEntries(categories);
const RESULT_LIMIT = 40;
let indexRequest;

const normalize = text => text.normalize('NFKC').toLowerCase().replace(/(\d)\s+级/g, '$1级');

function loadIndex() {
  indexRequest ||= fetch(`${import.meta.env.BASE_URL}search-index.json`)
    .then(response => {
      if (!response.ok) throw new Error('搜索索引无法下载');
      return response.json();
    })
    .then(entries => entries.map((entry, rowId) => ({
      ...entry,
      rowId,
      title: normalize(entry.t),
      searchable: normalize(`${entry.t} ${entry.s} ${entry.p}`),
    })))
    .catch(error => {
      indexRequest = undefined;
      throw error;
    });
  return indexRequest;
}

export default function SiteSearchModal({ onClose }) {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const titleId = useId();
  const listId = useId();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement;
    dialog.showModal();
    inputRef.current.focus();
    return () => {
      dialog.close();
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    loadIndex().then(entries => {
      if (mounted) setIndex(entries);
    }).catch(() => {
      if (mounted) setFailed(true);
    });
    return () => { mounted = false; };
  }, [attempt]);

  const matches = useMemo(() => {
    const normalized = normalize(query.trim());
    const words = normalized ? normalized.split(/\s+/) : [];
    const filtered = (index || []).filter(entry => (
      (category === 'all' || category === entry.c)
      && words.every(word => entry.searchable.includes(word))
    ));
    if (!normalized) return filtered;
    const rank = entry => entry.title === normalized ? 2 : entry.title.includes(normalized) ? 1 : 0;
    return filtered.sort((a, b) => rank(b) - rank(a));
  }, [index, query, category]);

  const visible = matches.slice(0, RESULT_LIMIT);
  const optionId = index => `${listId}-${index}`;
  const handleKey = event => {
    if (event.nativeEvent.isComposing || !visible.length) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      const next = (active + step + visible.length) % visible.length;
      setActive(next);
      document.getElementById(optionId(next))?.scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter') {
      event.preventDefault();
      navigate(visible[active].p);
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onKeyDown={event => { if (event.key === 'Escape') event.stopPropagation(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      className="fixed inset-x-0 top-[min(12vh,6rem)] bottom-auto m-auto w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-[var(--mw-radius-m)] border border-[var(--mw-rule-strong)] bg-[var(--mw-surface)] text-[var(--mw-ink)] shadow-[var(--mw-shadow-overlay)] backdrop:bg-[var(--mw-ink)]/50"
    >
      <div className="flex max-h-[80dvh] flex-col gap-3 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 id={titleId} className="text-xl font-extrabold">站内搜索</h2>
          <button type="button" onClick={onClose} aria-label="关闭搜索" className="mw-button mw-button--secondary mw-button--small min-h-11">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="relative">
          <Search size={18} aria-hidden="true" className="pointer-events-none absolute top-3.5 left-3 text-[var(--mw-ink-3)]" />
          <input
            ref={inputRef}
            value={query}
            onChange={event => { setQuery(event.target.value); setActive(0); }}
            onKeyDown={handleKey}
            role="combobox"
            aria-label="搜索课程、真题或展品"
            aria-controls={listId}
            aria-expanded={visible.length > 0}
            aria-activedescendant={visible.length ? optionId(active) : undefined}
            aria-autocomplete="list"
            placeholder="搜课名、考点或洛谷题号"
            className="min-h-11 w-full rounded-[var(--mw-radius-m)] border border-[var(--mw-rule-strong)] bg-[var(--mw-canvas)] py-2 pr-3 pl-10"
          />
        </div>
        <div role="group" aria-label="搜索分类" className="flex flex-wrap gap-2">
          {categories.map(([id, label]) => (
            <button
              type="button"
              key={id}
              aria-pressed={category === id}
              onClick={() => { setCategory(id); setActive(0); inputRef.current?.focus(); }}
              className="min-h-11 rounded-[var(--mw-radius-m)] border border-[var(--mw-rule-strong)] px-3 text-sm font-semibold hover:bg-[var(--mw-surface-sunk)] aria-pressed:border-b-4 aria-pressed:border-[var(--mw-line-cpp-text)] aria-pressed:bg-[var(--mw-line-cpp-tint)]"
            >
              {label}
            </button>
          ))}
        </div>
        <p role="status" className="text-sm text-[var(--mw-ink-2)]">
          {failed ? '搜索索引加载失败，请重试。' : !index ? '正在加载搜索索引…' : matches.length === 0
            ? '没有找到匹配内容，可以换一个关键词。'
            : `${matches.length} 条结果${matches.length > RESULT_LIMIT ? `，显示前 ${RESULT_LIMIT} 条` : ''}`}
        </p>
        {failed && (
          <button type="button" className="mw-button mw-button--secondary self-start" onClick={() => { setFailed(false); setAttempt(attempt + 1); inputRef.current?.focus(); }}>
            重试加载
          </button>
        )}
        <ul id={listId} role="listbox" aria-label="搜索结果" className="min-h-0 overflow-y-auto overscroll-contain">
          {visible.map((entry, index) => (
            <li key={entry.rowId} role="presentation">
              <Link
                id={optionId(index)}
                to={entry.p}
                role="option"
                aria-selected={active === index}
                tabIndex={-1}
                onClick={onClose}
                className="block min-h-11 border-t border-[var(--mw-rule)] px-3 py-2 hover:bg-[var(--mw-canvas)] aria-selected:bg-[var(--mw-line-cpp-tint)]"
              >
                <span className="block font-semibold">{entry.t}</span>
                <span className="block text-sm text-[var(--mw-ink-2)]">{labels[entry.c]} · {entry.s}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
