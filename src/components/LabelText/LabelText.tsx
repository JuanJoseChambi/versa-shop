interface LabelTextProp {
    text:string
    label:string
    styleText?: string;
    styleLabel?: string;
}
function LabelText ({text, label, styleText, styleLabel}: LabelTextProp) {
    return (
        <section className="w-auto relative flex justify-center items-start flex-col -z-10">
            <label className={`${styleLabel ? styleLabel : "text-nowrap text-neutral-600 font-semibold absolute -top-3 text-xs"}`}>{label}</label>
            <p className={`${styleText ? styleText : "text-neutral-800 font-bold"}`}>{text}</p>
        </section>
    )
}
export default LabelText