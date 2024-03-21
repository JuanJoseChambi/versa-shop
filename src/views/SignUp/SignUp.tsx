import { useState } from "react"
import { ResponseData, UserProp } from "../../interfaces/interfaces"
import { fetchPOST } from "../../utils/fetchPOST"
import flowerGrey from "../../assets/asHome/FlowerWhite.png"
import Input from "../../components/Input/Input"
// import { setCookie } from "../../utils/cookies"
import { error, success } from "../../utils/alert"
import ArrowBefore from "../../components/ArrowBefore/ArrowBefore"
import { useNavigate } from "react-router-dom"


function SignUp() {

    const [signUpData, setSignUpData] = useState<UserProp>({
        name:undefined,
        lastname:undefined,
        nickname:undefined,
        email:undefined,
        password:undefined,
        repeatPassword:undefined
    })

    const navigate = useNavigate()

    async function handlerSendSignUpData (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!signUpData.name || !signUpData.lastname || !signUpData.nickname || !signUpData.email || !signUpData.password || !signUpData.repeatPassword ) return error("Faltan datos por completar")
        
        if (signUpData.password !== signUpData.repeatPassword) return error("La contraseña no coincide")
        
        const { data } = await fetchPOST("http://localhost:3001/user/create", signUpData) as {data: ResponseData};
        if (data.error) return error(data.message)
        if(!data.error) {
            navigate("/shop")
            return success(data.message)
        }

    }

  return (
    <header className="w-full h-screen flex justify-center items-center bg-[#efefef]">
        <ArrowBefore redirect="/" text="Inicio"/>
        <section className="w-[1000px] h-[550px] flex justify-center items-center bg-redd-500 rounded-lg overflow-hidden border border-neutral-400 shadow-[15px_15px_15px_0_grey]">

            <picture className="w-[30%] h-full relative flex bg-gradient-to-b from-[#242424] to-[#474545] select-none pointer-events-none">
                <h3 className="absolute top-10 text-center w-full tracking-widest font-light font-noto text-3xl text-white bg-redd-500">Versa</h3>
                <img src={flowerGrey} alt="" className="object-cover"/>
            </picture>

            <section className="w-[70%] h-full bg-blued-500 bg-[#f5f5f5] flex flex-col justify-start items-start py-5 px-7 gap-y-4">
                <article className="text-5xl tracking-widest font-thin">REGISTRARSE</article>

                <form className="w-full h-[80%] flex flex-col justify-center items-center gap-y-5 bg-redd-500" onSubmit={handlerSendSignUpData}>
                    <div className="w-full flex justify-center items-start flex-col gap-y-5 bg-redd-500">

                        <div className="w-full flex justify-center items-center gap-x-5">
                            <Input 
                                placeholder="Nombre" 
                                icon="bx bx-user" 
                                onChange={(e) => setSignUpData({...signUpData, name:e.target.value})}/>
                            <Input 
                                placeholder="Apellido" 
                                icon="bx bx-user" 
                                onChange={(e) => setSignUpData({...signUpData, lastname:e.target.value})}/>
                        </div>
                        <Input 
                            placeholder="Nombre de usuario" 
                            icon="bx bx-hash" 
                            onChange={(e) => setSignUpData({...signUpData, nickname:e.target.value})}/>
                        <Input 
                            type="email" 
                            placeholder="Correo Electronico" 
                            icon="bx bx bx-envelope-open"
                            onChange={(e) => setSignUpData({...signUpData, email:e.target.value})}/>

                        <div className="w-full flex justify-center items-center gap-x-5">
                            <Input 
                                type="password" 
                                placeholder="Contraseña"
                                onChange={(e) => setSignUpData({...signUpData, password:e.target.value})}/>
                            <Input 
                                type="password" 
                                placeholder="Repita Contraseña"
                                onChange={(e) => setSignUpData({...signUpData, repeatPassword:e.target.value})}/>
                        </div>

                    </div>

                    <div className="bg-neutral-400 w-full h-[1px]"></div>

                    <h3>Registro de terceros</h3>

                    <button type="submit" className="w-full rounded-full py-3 mt-auto text-sm text-white bg-neutral-800">Enviar</button>
                </form>

            

            </section>

        </section>
    </header>
  )
}

export default SignUp
