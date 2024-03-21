import ArrowBefore from "../../components/ArrowBefore/ArrowBefore"
import flowerGrey from "../../assets/asHome/FlowerWhite.png"
import SignUp from "../../components/SignUp/SignUp"
import { useState } from "react"
import Login from "../../components/Login/Login"

function Access() {

    const [visible, setVisible] = useState<string>("login")


  return (
    <header className="w-full h-screen flex justify-center items-center bg-[#efefef]">
    <ArrowBefore redirect="/" text="Inicio" styleText="text-white"/>

        <picture className="w-[60%] h-full relative flex bg-gradient-to-b from-[#242424] to-[#474545] select-none pointer-events-none">
            <img src={flowerGrey} alt="" className="object-cover"/>
        </picture>
        <section className="w-[40%] flex justify-center items-center flex-col gap-y-6 divide-neutral-400 bg-redd-500">
            <p className="text-6xl font-noto">VERSA</p>
            <h3 className="w-[80%] text-xs text-center text-neutral-600 font-light">Únete a Versa y descubre la moda que te define. Regístrate ahora para acceder a ofertas exclusivas y novedades irresistibles.</h3>
            <section className="flex justify-center items-center text-xs  bg-neutral-800 divide-x-2 rounded-sm text-white">
                <button className="px-9 py-2" onClick={() => setVisible("signup")}>SIGNUP</button>
                <button className="px-9 py-2" onClick={() => setVisible("login")}>LOGIN</button>
            </section>

            <div className="w-[80%] h-[1px] bg-neutral-400"></div>

            <SignUp visible={visible}/>
            <Login visible={visible}/>
        </section>
    </header>
  )
}

export default Access