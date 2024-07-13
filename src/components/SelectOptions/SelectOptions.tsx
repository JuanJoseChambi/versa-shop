

interface PropSelectOptions {
    label: string;
    options: string[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectOptions({label, onChange, options}: PropSelectOptions) {
  return (
    <div className="w-auto h-auto flex justify-center items-center relative bg-redd-500">
        <label className="absolute -top-4 left-0 text-xs text-neutral-600 font-semibold">{label}</label>
        <select className="outline-none text-sm rounded-lg py-2 px-3 border border-neutral-600" onChange={onChange}>
                {options.map(option => (
                    <option value={option}>{option}</option>
                ))}
        </select>
    </div>
  )
}

export default SelectOptions