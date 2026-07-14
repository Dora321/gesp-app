import { useState, useEffect } from 'react';
import { Code, Play, AlertTriangle, CheckCircle, Copy, Check, Unlock } from 'lucide-react';

export const CodeBlock = ({ code, title }) => (
  <div className="bg-slate-900 rounded-lg overflow-hidden my-4 shadow-lg">
    {title && (
      <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 font-mono border-b border-slate-700">
        {title}
      </div>
    )}
    <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-blue-100">
      <code>{code}</code>
    </pre>
  </div>
);

export const InteractiveCode = ({ type, onCorrect }) => {
  const [inputs, setInputs] = useState({});
  const [status, setStatus] = useState('idle'); // idle, error, success

  // Reset inputs when type changes
  useEffect(() => {
    setInputs({});
    setStatus('idle');
  }, [type]);

  const challenges = {
    'H': {
      parts: [
        { text: 'if (j == 1 || j == ' },
        { id: 'c1', answer: 'n', width: 'w-8' },
        { text: ') cout << "|";\nelse if (i == ' },
        { id: 'c2', answer: '(n+1)/2', width: 'w-20', hint: '(n+1)/2' },
        { text: ') cout << "-";\nelse cout << "a";' }
      ]
    },
    'X': {
      parts: [
        { text: 'if (i == ' },
        { id: 'c1', answer: 'j', width: 'w-8' },
        { text: ' || i + j == ' },
        { id: 'c2', answer: 'n+1', width: 'w-12', hint: 'n+1' },
        { text: ') cout << "+";\nelse cout << "-";' }
      ]
    },
    'Ri': {
      parts: [
        { text: 'if (j == 1 || j == n) cout << "|";\nelse if (i == 1 || i == n || i == ' },
        { id: 'c1', answer: '(n+1)/2', width: 'w-20' },
        { text: ') cout << "-";\nelse cout << "x";' }
      ]
    },
    'N': {
      parts: [
        { text: 'if (j == 1 || j == n || ' },
        { id: 'c1', answer: 'i==j', width: 'w-12', hint: 'i==j' },
        { text: ') cout << "+";\nelse cout << "-";' }
      ]
    }
  };

  const currentChallenge = challenges[type];

  const checkAnswer = () => {
    let isAllCorrect = true;
    currentChallenge.parts.forEach(part => {
      if (part.id) {
        // Simple normalization: remove spaces
        const val = (inputs[part.id] || '').replace(/\s/g, '');
        const ans = part.answer.replace(/\s/g, '');
        if (val !== ans) isAllCorrect = false;
      }
    });

    if (isAllCorrect) {
      setStatus('success');
      onCorrect && onCorrect();
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg p-4 shadow-lg font-mono text-sm text-blue-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 opacity-20">
        <Code size={48} />
      </div>

      <div className="mb-2 text-xs text-slate-400">补全代码逻辑 (忽略空格):</div>

      <div className="space-y-1 leading-loose">
        {currentChallenge.parts.map((part, idx) => (
          part.id ? (
            <input
              key={part.id}
              type="text"
              value={inputs[part.id] || ''}
              onChange={(e) => setInputs({ ...inputs, [part.id]: e.target.value })}
              className={`bg-slate-800 border-b-2 outline-none text-center mx-1 px-1 text-yellow-400 font-bold transition-colors ${status === 'error' ? 'border-red-500 bg-red-900/20' :
                status === 'success' ? 'border-green-500 bg-green-900/20' : 'border-slate-600 focus:border-blue-400'
                } ${part.width}`}
              placeholder="?"
            />
          ) : (
            <span key={idx} className="whitespace-pre-wrap">{part.text}</span>
          )
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={checkAnswer}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-2"
        >
          <Play size={14} /> 运行验证
        </button>

        {status === 'success' && (
          <span className="text-green-400 text-xs flex items-center gap-1 animate-fade-in">
            <CheckCircle size={14} /> 回答正确！
          </span>
        )}
        {status === 'error' && (
          <span className="text-red-400 text-xs flex items-center gap-1 animate-shake">
            <AlertTriangle size={14} /> 答案不对哦，再想想？
          </span>
        )}
      </div>
    </div>
  );
};

export const InteractiveChecklist = () => {
  const [items, setItems] = useState([
    { id: 1, text: "能手写双层循环打印图形", checked: false },
    { id: 2, text: "知道 abs(), sqrt() 在 <cmath> 头文件", checked: false },
    { id: 3, text: "习惯使用 1LL * a * b 防止乘法溢出", checked: false },
    { id: 4, text: "掌握 % 10 拆分数字的技巧", checked: false }
  ]);
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleItem = (id) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        const isNowChecked = !item.checked;
        if (isNowChecked) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
        }
        return { ...item, checked: isNowChecked };
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          <div className="text-4xl animate-bounce">🎉</div>
        </div>
      )}
      <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
        <CheckCircle size={20} />
        备考 CheckList (Interactive)
      </h3>
      <div className="grid md:grid-cols-2 gap-3">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${item.checked
              ? 'bg-blue-100 border-blue-300 text-blue-900 shadow-inner'
              : 'bg-white border-blue-100 text-slate-600 hover:border-blue-300 hover:shadow-sm'
              }`}
          >
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.checked ? 'bg-blue-500 border-blue-500' : 'border-slate-300 bg-slate-50'
              }`}>
              {item.checked && <CheckCircle size={14} className="text-white" />}
            </div>
            <span className={`text-sm ${item.checked ? 'line-through opacity-70' : ''}`}>
              {item.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export const PredictionQuiz = ({ title, code, options, correctIndex, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">{title}</h3>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">预测挑战</span>
      </div>
      <div className="p-4">
        <CodeBlock code={code} />
        <p className="text-sm font-bold text-slate-700 mb-3">这段代码的输出是什么？</p>

        <div className="grid grid-cols-1 gap-2 mb-4">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showResult}
              className={`text-left px-4 py-3 rounded-lg text-sm font-mono border transition-all ${showResult
                ? idx === correctIndex
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : idx === selected
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-slate-50 border-slate-200 opacity-50'
                : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50'
                }`}
            >
              {opt}
              {showResult && idx === correctIndex && <CheckCircle size={16} className="float-right text-green-600" />}
            </button>
          ))}
        </div>

        {showResult && (
          <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 animate-fade-in">
            <strong>💡 解析：</strong> {explanation}
          </div>
        )}
      </div>
    </div>
  );
};

export const PitfallCard = ({ title, code, fix, result, desc }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className={`bg-white p-5 rounded-xl border shadow-sm relative overflow-hidden group transition-all duration-500 ${isRevealed ? 'border-green-200' : 'border-red-100 hover:border-red-300'}`}>
      <div className={`absolute top-0 right-0 p-2 opacity-10 transition-opacity ${isRevealed ? 'text-green-500' : 'text-red-500'}`}>
        {isRevealed ? <CheckCircle size={64} /> : <AlertTriangle size={64} />}
      </div>

      <h3 className={`font-bold mb-3 flex items-center justify-between ${isRevealed ? 'text-green-700' : 'text-red-600'}`}>
        {title}
        {!isRevealed && <Unlock size={16} className="opacity-50" />}
      </h3>

      <div className="space-y-2 mb-3">
        <div className="bg-red-50 text-red-800 text-xs p-2 rounded line-through decoration-red-500/50 font-mono border border-red-100">
          {code}
        </div>

        {/* Revealed Content */}
        <div className={`transition-all duration-500 overflow-hidden ${isRevealed ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-green-50 text-green-800 text-xs p-2 rounded font-mono flex items-center justify-between border border-green-100 mt-2">
            {fix} <CheckCircle size={12} />
          </div>
          {result && <div className="text-xs text-slate-500 pl-1 mt-1">{result}</div>}
        </div>
      </div>

      <div className="mt-4">
        {!isRevealed ? (
          <button
            onClick={() => setIsRevealed(true)}
            className="w-full py-2 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
          >
            <Unlock size={14} /> 点击拆除错误
          </button>
        ) : (
          <p className="text-sm text-slate-600 animate-fade-in">
            {desc}
          </p>
        )}
      </div>
    </div>
  );
};

export const TemplateBlock = ({ title, desc, code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-700 text-sm">{title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
        </div>
        <button onClick={handleCopy} className="text-slate-500 hover:text-blue-600 flex items-center gap-1 text-xs bg-white px-2 py-1 rounded border">
          {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? '已复制' : '复制'}
        </button>
      </div>
      <div className="p-4 bg-slate-900 overflow-x-auto">
        <pre className="text-sm font-mono text-green-400"><code>{code}</code></pre>
      </div>
    </div>
  );
};
