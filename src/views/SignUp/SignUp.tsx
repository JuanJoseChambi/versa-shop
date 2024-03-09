import { useEffect, useState } from "react"
import { DataUser, UserProp } from "../../interfaces/interfaces"
import { fetchPOST } from "../../utils/fetchPOST"



function SignUp() {
    const [dataUser, setDataUser] = useState<DataUser | null>()

    const [signUpData, setSignUpData] = useState<UserProp>({
        name:undefined,
        lastname:undefined
    })

    async function handlerSendSignUpData (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const {data} = await fetchPOST("http://localhost:3001/user/create", signUpData);

        setDataUser(data as DataUser)
        localStorage.setItem("ID", JSON.stringify(data as DataUser));

    }

    function handlerCerrarSesion () {
        localStorage.removeItem("ID")
    }

    function getLocal () {
        const id = localStorage.getItem("ID")
        console.log(id);
    }

    useEffect(() => {
        console.log(dataUser);
        
    },[dataUser])

  return (
    <header className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-[#EAEAEA] to-[#E5E5E5]">
        <section className="area flex justify-center items-center bg-redd-500">
            <section className="w-[600px] bg-blue-500 flex flex-col justify-center items-center py-5 gap-y-4">
                <button onClick={handlerCerrarSesion}>Cerrar Sesion</button>
                <button onClick={getLocal}>ID</button>
                <article className="text-4xl tracking-widest font-black">Registro</article>
                <form className="flex flex-col justify-center items-center gap-y-4" onSubmit={handlerSendSignUpData}>
                    <input type="text" placeholder="Nombre" onChange={(e) => setSignUpData({...signUpData, name:e.target.value})}/>
                    <input type="text" placeholder="Apellido" onChange={(e) => setSignUpData({...signUpData, lastname:e.target.value})}/>
                    <button type="submit">Enviar</button>
                </form>
            </section>
        </section>
    </header>
  )
}

export default SignUp