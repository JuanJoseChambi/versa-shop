
interface Options {
    text:string;
    url:string | null;
}

interface SectionFooterProp {
    styleUl?:string;
    styleA?:string;
    styleTitle?:string
    widthUl?:string;
    heightUl?:string;
    options:Options[];
}

function SectionsFooter({styleUl, styleA, styleTitle, widthUl = "180px", heightUl = "200px", options }:SectionFooterProp) {
  return (
    <ul className={`${styleUl} w-[${widthUl}] h-[${heightUl}]`}>
        {options.map(option => (
            <li>
                {option.url != null 
                ? (<a href={option.url}  className={styleA}>{option.text}</a>) 
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