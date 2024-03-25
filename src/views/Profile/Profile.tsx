import { useParams } from "react-router-dom"
import useApi from "../../hooks/useApi"
import { ProfileUser } from "../../interfaces/interfaces"
import Cookies from "js-cookie"
import Nav from "../../components/Nav/Nav"

function Profile() {
    const { id } = useParams()
    const token  = Cookies.get("_Re_sU")
    // console.log(token);
    
    const { data } = useApi(`http://localhost:3001/user/info/${id}`, token) as { data:ProfileUser }

    // console.log(data);
    // console.log(id);
    
  return (
    <header>
        <Nav style="text-white"/>
        <section className="w-full h-[250px] flex justify-evenly items-center bg-gradient-to-r from-neutral-950 to-neutral-800">
            <article className="pt-10 bg-redd-500">
                <h3 className="text-white text-6xl font-semibold">{data?.name} {data?.lastname}</h3>
                <p className="text-sm text-neutral-400"># {data?.nickname}</p>
            </article>
            <picture className="w-[250px] h-[250px] flex justify-center items-center bg-neutral-200 rounded-full overflow-hidden translate-y-24">
                <img src="https://www.timburnslaw.com/wp-content/uploads/2017/12/no-user.png" alt="Profile Image" />
            </picture>
        </section>




    </header>
  )
}

export default Profile