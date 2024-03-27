import Cookies from "js-cookie"
import { DecodeToken } from "../interfaces/interfaces";
import { useEffect, useState } from "react";

export function useDecode (name:string) {
    const [decode, setDecode] = useState<DecodeToken>()

    useEffect(() => {
        function decodeToken () {
            const token = Cookies.get(name);
            if (!token) return false
            
            const tokenJwt:string = atob(token)
            const tokenPayload:DecodeToken = JSON.parse(atob(tokenJwt.split('.')[1])).usuario;
            
            if (tokenPayload) {
                const infoToken = {
                    email: tokenPayload?.email,
                    lastname: tokenPayload?.lastname,
                    name: tokenPayload?.name,
                    nickname: tokenPayload?.nickname,
                    role: tokenPayload?.role,
                    user_id: tokenPayload?.user_id,
                    token:tokenJwt
                }
                setDecode(infoToken)
            }
        }
        decodeToken()
    },[])
    
    return { 
        name: decode?.name, 
        lastname: decode?.lastname,
        nickname:decode?.nickname,
        role:decode?.role || null, 
        id:decode?.user_id, 
        token:decode?.token
    }
}