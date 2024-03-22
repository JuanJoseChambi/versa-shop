import Cookies from "js-cookie"
import { DecodeToken } from "../interfaces/interfaces";
import { useEffect, useState } from "react";

export function useDecode (name:string) {
    const [decode, setDecode] = useState<DecodeToken>()

    useEffect(() => {
        function decodeToken () {
            const token = Cookies.get(name)
            if (!token) return false

            const tokenPayload:DecodeToken = JSON.parse(atob(token.split('.')[1])).usuario;
            if (tokenPayload) {
                setDecode(tokenPayload)
            }
        }
        decodeToken()
    },[])
    
    return { role:decode?.role ? decode.role : null, id:decode?.user_id }
}