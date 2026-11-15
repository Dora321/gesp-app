import { BrainCircuit, Zap } from 'lucide-react';

const levels = [
    { value: 'low', label: '极速', Icon: Zap },
    { value: 'medium', label: '认真', Icon: BrainCircuit },
];

export default function ChatReasoningSelect({ value, onChange, disabled }) {
    return (
        <div role="group" aria-label="思考强度" className="mb-2 inline-grid grid-cols-2 gap-0.5 rounded-xl border border-stone-200 bg-stone-100 p-0.5">
            {levels.map(({ value: level, label, Icon }) => {
                const selected = value === level;
                return (
                    <button
                        key={level}
                        type="button"
                        aria-pressed={selected}
                        disabled={disabled}
                        onClick={() => onChange(level)}
                        className={`flex min-h-11 items-center justify-center gap-1.5 rounded-[9px] border px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-stone-600 disabled:opacity-70 sm:min-h-9 ${
                            selected
                                ? 'border-[#dfc58d] bg-[#f9edd2] text-[#533b1c]'
                                : 'border-transparent text-stone-600 enabled:hover:bg-stone-200/70'
                        }`}
                    >
                        <Icon size={15} aria-hidden="true" className="shrink-0" />
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
