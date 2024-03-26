import Cookies from "js-cookie"
import { DecodeToken } from "../interfaces/interfaces";
import { useEffect, useState } from "react";

export function useDecode (name:string) {
    const [decode, setDecode] = useState<DecodeToken>()

    useEffect(() => {
        function decodeToken () {
            const token = Cookies.get(name);
            if (!token) return false

            const tokenJwt:string = window.atob(token)
            const tokenPayload:DecodeToken = JSON.parse(window.atob(tokenJwt.split('.')[1])).usuario;
            if (tokenPayload) {
                const infoToken = {
                    email: tokenPayload?.email,
                    lastname: tokenPayload?.lastname,
                    name: tokenPayload?.name,
                    nickname: tokenPayload?.nickname,
                    role: tokenPayload?.role,
                    user_id: tokenPayload?.user_id,
                    token:token
                }
                setDecode(infoToken)
            }
        }
        decodeToken()
    },[])
    
    return { role:decode?.role ? decode.role : null, id:decode?.user_id, token:decode?.token}
}