
interface TitleDashboardProp {
    titles:TitlesAtributes[];
}
interface TitlesAtributes {
    text:string;
    width:string;
}
function TitleDashboard({titles}:TitleDashboardProp) {
  return (
    <section className="w-full h-[30px] text-sm text-neutral-500 text-center flex justify-center items-center bg-redd-500 border-b border-neutral-500 divide-x divide-neutral-400">
            {titles.map((title) => (
                <div className={`${title.width}`}>{title.text}</div>
            ))}
    </section>
  )
}

export default TitleDashboard