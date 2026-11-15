export default function ChatReasoningSelect({ value, onChange, disabled }) {
    return (
        <label className="mb-2 flex w-fit flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-700">
            思考强度
            <select
                value={value}
                disabled={disabled}
                onChange={event => onChange(event.target.value)}
                className="min-h-11 rounded-lg border border-stone-300 bg-stone-50 px-2 text-sm text-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-70"
            >
                <option value="low">低 · 极速</option>
                <option value="medium">中 · 认真思考</option>
            </select>
        </label>
    );
}
