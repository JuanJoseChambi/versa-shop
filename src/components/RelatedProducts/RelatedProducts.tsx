
function RelatedProducts() {


    const imagesTest = ["https://res.cloudinary.com/dth62bdky/image/upload/v1716939795/Versa/ttego2fbajnkt7hlg0gf.webp", "https://res.cloudinary.com/dth62bdky/image/upload/v1716939654/Versa/sot5z4gqff9wzftszyce.webp", "https://res.cloudinary.com/dth62bdky/image/upload/v1716939695/Versa/tpvym9q4ftfche2kdi1w.webp", "https://res.cloudinary.com/dth62bdky/image/upload/v1716939654/Versa/sot5z4gqff9wzftszyce.webp", "https://res.cloudinary.com/dth62bdky/image/upload/v1716939695/Versa/tpvym9q4ftfche2kdi1w.webp", "https://res.cloudinary.com/dth62bdky/image/upload/v1716939695/Versa/tpvym9q4ftfche2kdi1w.webp"]

  return (
    <aside className="w-area h-auto flex justify-center items-center flex-col gap-0 bg-redd-500">
        <h3 className="text-4xl text-neutral-800 tracking-wider font-semibold">PRODUCTOS RELACIONADOS</h3>
        <section className="w-area h-auto flex justify-center md:justify-between items-center flex-wrap flex-row bg-greend-500">
            {imagesTest.map((image) => (
                <picture className="w-[155px] max-w-[170px] md:w-[200px] md:min-h-[250px] overflow-hidden flex justify-center items-center bg-redd-500">
                    <img src={image} alt="" className="w-[100%] h-full object-cover "/>
                </picture>
            ))}
        </section>
    </aside>
  )
}

export default RelatedProducts