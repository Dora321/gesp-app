import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Pencil, MousePointer2, Eraser, Undo2, Redo2, Trash2, X } from 'lucide-react';
import './PageAnnotations.css';

const colors = [['红色', '#dc2626'], ['蓝色', '#2563eb'], ['绿色', '#15803d'], ['黄色', '#eab308']];

export default function PageAnnotations() {
  const location = useLocation();
  return <AnnotationLayer key={`${location.pathname}${location.search}`} />;
}

function AnnotationLayer() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('browse');
  const [color, setColor] = useState(colors[0][1]);
  const [width, setWidth] = useState(3);
  const [strokes, setStrokes] = useState([]);
  const [redo, setRedo] = useState([]);
  const [draft, setDraft] = useState(null);
  const gesture = useRef(null);
  const group = useRef(null);

  useEffect(() => {
    const syncScroll = () => group.current?.setAttribute('transform', `translate(${-window.scrollX}, ${-window.scrollY})`);
    const escape = (event) => {
      if (event.key === 'Escape') {
        gesture.current = null;
        setDraft(null);
        setMode('browse');
      }
    };
    syncScroll();
    window.addEventListener('scroll', syncScroll, { passive: true });
    window.addEventListener('keydown', escape);
    return () => {
      window.removeEventListener('scroll', syncScroll);
      window.removeEventListener('keydown', escape);
    };
  }, []);

  const start = (event) => {
    if (mode !== 'pen' || gesture.current || event.button !== 0 || !event.isPrimary) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const x = event.clientX + window.scrollX;
    const y = event.clientY + window.scrollY;
    const stroke = { color, width, d: `M ${x} ${y} l 0.01 0` };
    gesture.current = { pointerId: event.pointerId, stroke };
    setDraft(stroke);
  };
  const move = (event) => {
    const active = gesture.current;
    if (!active || event.pointerId !== active.pointerId) return;
    active.stroke = { ...active.stroke, d: `${active.stroke.d} L ${event.clientX + window.scrollX} ${event.clientY + window.scrollY}` };
    setDraft(active.stroke);
  };
  const finish = (event, cancelled = false) => {
    const active = gesture.current;
    if (!active || event.pointerId !== active.pointerId) return;
    if (!cancelled) {
      setStrokes(previous => [...previous, active.stroke]);
      setRedo([]);
    }
    gesture.current = null;
    setDraft(null);
  };
  const change = (next) => {
    setRedo(previous => [...previous, strokes]);
    setStrokes(next);
  };
  // History stores whole edits, so both erasing and clearing can be undone.
  const [history, setHistory] = useState([]);
  const edit = (next) => {
    setHistory(previous => [...previous, strokes]);
    setStrokes(next);
    setRedo([]);
  };
  const finishStroke = (event) => {
    if (gesture.current?.pointerId === event.pointerId) setHistory(previous => [...previous, strokes]);
    finish(event);
  };

  return <>
    <svg className={`annotation-layer annotation-layer--${mode}`} aria-hidden="true"
      onPointerDown={start} onPointerMove={move} onPointerUp={finishStroke}
      onPointerCancel={event => finish(event, true)} onLostPointerCapture={event => finish(event, true)}>
      <g ref={group}>
        {strokes.map((stroke, index) => <path key={index} {...stroke} stroke={stroke.color} strokeWidth={stroke.width}
          fill="none" strokeLinecap="round" strokeLinejoin="round"
          style={{ pointerEvents: mode === 'erase' ? 'stroke' : 'none' }}
          onPointerDown={event => {
            if (mode !== 'erase') return;
            event.stopPropagation();
            edit(strokes.filter((_, i) => i !== index));
          }} />)}
        {draft && <path d={draft.d} stroke={draft.color} strokeWidth={draft.width} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
      </g>
    </svg>
    <div className="annotation-tools">
      {open && <div className="annotation-panel" role="region" aria-label="页面标注工具">
        <div className="annotation-heading"><strong>页面标注</strong><button aria-label="收起标注工具" onClick={() => { setOpen(false); setMode('browse'); }}><X size={18} /></button></div>
        <div className="annotation-row" role="group" aria-label="标注模式">
          <button aria-pressed={mode === 'browse'} onClick={() => setMode('browse')}><MousePointer2 size={17} />浏览</button>
          <button aria-pressed={mode === 'pen'} onClick={() => setMode('pen')}><Pencil size={17} />画笔</button>
          <button aria-pressed={mode === 'erase'} onClick={() => setMode('erase')}><Eraser size={17} />擦除</button>
        </div>
        <div className="annotation-row" role="group" aria-label="画笔颜色">
          {colors.map(([name, value]) => <button key={value} className="annotation-color" aria-label={name} aria-pressed={color === value} onClick={() => setColor(value)}><span style={{ background: value }} /></button>)}
          <label>粗细<select aria-label="画笔粗细" value={width} onChange={event => setWidth(Number(event.target.value))}><option value="3">细</option><option value="6">中</option><option value="10">粗</option></select></label>
        </div>
        <div className="annotation-row">
          <button aria-label="撤销标注" disabled={!history.length} onClick={() => { change(history[history.length - 1]); setHistory(previous => previous.slice(0, -1)); }}><Undo2 size={17} />撤销</button>
          <button aria-label="重做标注" disabled={!redo.length} onClick={() => {
            setHistory(previous => [...previous, strokes]);
            setStrokes(redo[redo.length - 1]);
            setRedo(previous => previous.slice(0, -1));
          }}><Redo2 size={17} />重做</button>
          <button disabled={!strokes.length} onClick={() => edit([])}><Trash2 size={17} />清空</button>
        </div>
        <p aria-live="polite">{mode === 'pen' ? '拖动画笔标注，Esc 返回浏览。' : mode === 'erase' ? '点选笔画可整笔擦除。' : '浏览模式可正常点击、滚动页面。'}</p>
        <p>临时标注，刷新或切换页面后清除。</p>
      </div>}
      {!open && <button className="annotation-launcher" aria-label="打开页面标注" onClick={() => { setOpen(true); setMode('pen'); }}><Pencil size={19} />标注</button>}
    </div>
  </>;
}

