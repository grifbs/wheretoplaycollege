export const Select = ({ options, ...props }) => <select {...props} className="border px-2 py-1 rounded w-full">{options.map(o => <option key={o} value={o}>{o}</option>)}</select>;
