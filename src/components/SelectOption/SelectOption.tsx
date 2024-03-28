// import { CategoryData, ColorData, SizeData, TypeData } from "../../interfaces/interfaces";

// type OptionType = CategoryData | TypeData | ColorData | SizeData | string;

interface SelectOptionProp {
    options?: string[];
    titleOption?: string;
    style?: string;
}

const styleDefault = "w-[80%]";

function SelectOption({ options, titleOption, style = styleDefault }: SelectOptionProp) {
    return (
        <select className={style}>
            <option value="">{titleOption}</option>
            {options?.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
}

export default SelectOption;
