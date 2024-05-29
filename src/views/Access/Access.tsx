import ArrowBefore from "../../components/ArrowBefore/ArrowBefore"
import flowerGrey from "../../assets/asHome/FlowerWhite.png"
// import SignUp from "../../components/SignUp/SignUp"
// import { useState } from "react"
import Login from "../../components/Login/Login"

function Access() {

    // const [visible, setVisible] = useState<string>("login")


  return (
    <header className="w-full h-screen flex justify-center items-center flex-col md:flex-row bg-[#efefef] ">
    <ArrowBefore redirect="/" text="Inicio" styleText="text-white"/>

        <picture className="w-full md:w-[60%] h-full relative flex bg-gradient-to-b from-[#242424] to-[#474545] select-none pointer-events-none">
            <img src={flowerGrey} alt="" className="object-cover"/>
        </picture>
        <section className="w-full md:w-[40%] h-full md:h-[80%] flex justify-center items-center flex-col pt-5 gap-y-10 md:gap-y-6 divide-neutral-400 bg-redd-500">
            <p className="text-6xl font-noto">VERSA</p>
            <Login visible={"login"}/>
        </section>
    </header>
  )
}

export default Access