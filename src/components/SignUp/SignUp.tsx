import { useState } from "react"
import { ResponseData, UserProp } from "../../interfaces/interfaces"
import { fetchPOST } from "../../utils/fetchPOST"
import Input from "../../components/Input/Input"
import { error, success } from "../../utils/alert"
import { useNavigate } from "react-router-dom"
import { SignUpProp } from "../../interfaces/components"
const {VITE_URL_BASE} = import.meta.env

function SignUp({visible}: SignUpProp) {

    if (visible !== "signup") return null;

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
        
        const { data } = await fetchPOST(`${VITE_URL_BASE}}/user/create`, signUpData) as {data: ResponseData};
        if (data.error) return error(data.message)
        if(!data.error) {
            navigate("/shop")
            return success(data.message)
        }

    }

    return (
            <form className="w-[80%] min-h-[300px] max-h-[500px] flex flex-col justify-evenly items-center gap-y-6 bg-blued-500" onSubmit={handlerSendSignUpData}>
                    <div className="w-full flex justify-center items-center gap-x-5">
                        <Input 
                            placeholder="Lucas" 
                            name="Nombre"
                            icon="bx bx-user" 
                            onChange={(e) => setSignUpData({...signUpData, name:e.target.value})}/>
                        <Input 
                            placeholder="Tonneti" 
                            name="Apellido"
                            icon="bx bx-user" 
                            onChange={(e) => setSignUpData({...signUpData, lastname:e.target.value})}/>
                    </div>
                    <Input 
                        placeholder="Luca" 
                        name="Nombre de usuario"
                        icon="bx bx-hash" 
                        onChange={(e) => setSignUpData({...signUpData, nickname:e.target.value})}/>
                    <Input 
                        type="email" 
                        placeholder="Luca@gmail.com"
                        name="Correo Electronico" 
                        icon="bx bx-envelope-open"
                        onChange={(e) => setSignUpData({...signUpData, email:e.target.value})}/>
                    <div className="w-full flex justify-center items-center gap-x-5">
                        <Input 
                            type="password" 
                            placeholder="--------"
                            name="Contraseña"
                            onChange={(e) => setSignUpData({...signUpData, password:e.target.value})}/>
                        <Input 
                            type="password" 
                            placeholder="--------"
                            name="Repita Contraseña"
                            onChange={(e) => setSignUpData({...signUpData, repeatPassword:e.target.value})}/>
                    </div>
                <button type="submit" className="w-full rounded-full mt-auto py-3 text-sm text-white bg-neutral-800">Enviar</button>
            </form>
        
  )
}

export default SignUp
