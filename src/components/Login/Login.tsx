import { useState } from "react";
import { LogInProp } from "../../interfaces/components";
import Input from "../Input/Input"
import { error } from "../../utils/alert";
import { fetchPOST } from "../../utils/fetchPOST";
import { ResponseData } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie" 
const { VITE_C_RE_SU } = import.meta.env


function Login({visible}:LogInProp) {
    if (visible !== "login") return null;

    const [login, setLogin] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate()

    async function handlerLogin (e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!login.email || !login.password) return error("Faltan Datos por completar")

        const { data } = await fetchPOST("http://localhost:3001/user/login", login) as {data: ResponseData}
        
        if (data.error) return error(data.message)
        if (!data.error && data.token) {
            Cookies.set(VITE_C_RE_SU, data.token, { expires: 7 })
            return navigate("/shop")
        }
    }



  return (
    <form className="w-[80%] min-h-[300px] max-h-[500px] flex flex-col justify-evenly items-center gap-y-7 bg-blued-500" onSubmit={handlerLogin}>

        <Input placeholder="Email" name="Correo Electronico" type="email" icon="bx bx-envelope-open"onChange={(e) => setLogin({...login, email:e.target.value})}/>
        <Input placeholder="Password" name="Contraseña" type="password"onChange={(e) => setLogin({...login, password:e.target.value})}/>

        <button type="submit" className="w-full rounded-full mt-auto py-3 text-sm text-white bg-neutral-800">Enviar</button>
    </form>
  )
}

export default Login