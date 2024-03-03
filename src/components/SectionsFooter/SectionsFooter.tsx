
interface Options {
    text:string;
    url:string | null;
}

interface SectionFooterProp {
    styleUl?:string;
    styleLi?:string;
    styleTitle?:string
    widthUl?:string;
    heightUl?:string;
    options:Options[];
}

function SectionsFooter({styleUl, styleLi, styleTitle, widthUl = "180px", heightUl = "200px", options }:SectionFooterProp) {
  return (
    <ul className={`${styleUl} w-[${widthUl}] h-[${heightUl}]`}>
        {options.map(option => (
            <li className={styleLi}>
                {option.url != null 
                ? (<a href={option.url}>{option.text}</a>) 
                : (<span className={styleTitle}>{option.text}</span>)}
            </li>
        ))}
    </ul>
  )
}

export default SectionsFooter

// <li>SECCIONES</li>
//         <li>Inicio</li>
//         <li>Tienda</li>
//         <li>Nosotros</li>
//         <li>Politicas</li>