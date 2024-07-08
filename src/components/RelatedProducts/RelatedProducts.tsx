
function RelatedProducts() {


    const imagesTest = ["https://res.cloudinary.com/dth62bdky/image/upload/v1720144366/Versa/crkvnb1idasyrhq0ypoc.webp",
        "https://res.cloudinary.com/dth62bdky/image/upload/v1720144366/Versa/crkvnb1idasyrhq0ypoc.webp",
        "https://res.cloudinary.com/dth62bdky/image/upload/v1720144366/Versa/crkvnb1idasyrhq0ypoc.webp",
        "https://res.cloudinary.com/dth62bdky/image/upload/v1720144366/Versa/crkvnb1idasyrhq0ypoc.webp",
        "https://res.cloudinary.com/dth62bdky/image/upload/v1720144366/Versa/crkvnb1idasyrhq0ypoc.webp"
    ]

  return (
    <aside className="w-area h-auto flex justify-center items-center flex-col gap-0 bg-redd-500">
        <h3 className="text-4xl text-neutral-800 tracking-wider font-semibold">PRODUCTOS RELACIONADOS</h3>
        <section className="w-area h-auto py-5 flex justify-start sm:justify-between items-center gap-x-5 sm:gap-x-0 max-sm:overflow-x-auto scroll flex-row bg-greend-500">
            {imagesTest.map((image) => (
                <picture className="max-sm:min-w-[200px] max-sm:h-[200px] sm:w-[155px] sm:max-w-[200px] overflow-hidden flex justify-center items-center bg-redd-500">
                    <img src={image} alt="" className="w-[100%] h-full object-cover "/>
                </picture>
            ))}
        </section>
    </aside>
  )
}

export default RelatedProducts