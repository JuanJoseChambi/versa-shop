import { useState } from "react";
import { LogInProp } from "../../interfaces/components";
import Input from "../Input/Input"


function Login({visible}:LogInProp) {
    if (visible !== "login") return null;

    const [login, setLogin] = useState({
        email:"",
        password:""
    })


    function handlerLogin () {

    }



  return (
    <form className="w-[80%] min-h-[300px] max-h-[500px] flex flex-col justify-evenly items-center gap-y-5 bg-blued-500"
    >
        {/* <div className="w-full flex justify-center items-start flex-col gap-y-5 bg-redd-500"> */}
            <Input placeholder="Email" name="Correo Electronico" type="email" icon="bx bx-envelope-open"/>
            <Input placeholder="Password" name="Contraseña" type="password"/>
        {/* </div> */}
        <button type="submit" className="w-full rounded-full mt-auto py-3 text-sm text-white bg-neutral-800">Enviar</button>

    </form>
  )
}

export default Login