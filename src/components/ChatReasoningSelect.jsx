export default function ChatReasoningSelect({ value, onChange, disabled }) {
    return (
        <select
            aria-label="思考强度"
            value={value}
            disabled={disabled}
            onChange={event => onChange(event.target.value)}
            className="mb-2 block min-h-11 rounded-lg border border-stone-300 bg-stone-50 px-2 text-sm text-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-70"
        >
            <option value="low">极速</option>
            <option value="medium">认真</option>
        </select>
    );
}
