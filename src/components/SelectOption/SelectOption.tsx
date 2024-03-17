import { CategoryData, ColorData, SizeData, TypeData } from "../../interfaces/interfaces";

type OptionType = CategoryData | TypeData | ColorData | SizeData | string;

interface SelectOptionProp {
    options?: OptionType[];
    titleOption?: string;
    style?: string;
}

const styleDefault = "w-[80%]";

function SelectOption({ options, titleOption, style = styleDefault }: SelectOptionProp) {
    return (
        <select className={style}>
            <option value="">{titleOption}</option>
            {options?.map((option) => {
                if (typeof option === 'object') {
                    switch (true) {
                        case 'id' in option && 'category' in option:
                            const category = option as CategoryData;
                            return (
                                <option key={category.id} value={category.id}>
                                    {category.category}
                                </option>
                            );
                        case 'id' in option && 'type' in option:
                            const type = option as TypeData;
                            return (
                                <option key={type.id} value={type.id}>
                                    {type.type}
                                </option>
                            );
                        case 'color_id' in option && 'color' in option:
                            const color = option as ColorData;
                            return (
                                <option key={color.color_id} value={color.color_id}>
                                    {color.color}
                                </option>
                            );
                        case 'size_id' in option && 'size' in option:
                            const size = option as SizeData;
                            return (
                                <option key={size.size_id} value={size.size_id}>
                                    {size.size}
                                </option>
                            );
                        default:
                            break;
                    }
                } else {
                    return (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    );
                }
            })}
        </select>
    );
}

export default SelectOption;
