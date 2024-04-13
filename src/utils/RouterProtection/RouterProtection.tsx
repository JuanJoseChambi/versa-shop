import { Navigate, Outlet } from "react-router-dom"

interface RouterProtectionProps {
    isAllowed: boolean
    redirectTo: string
    children?: React.ReactNode
}

function RouterProtection({isAllowed, redirectTo, children}: RouterProtectionProps) {
    
    if (!isAllowed) {
        return <Navigate to={redirectTo}/>
    };

  return children ? children : <Outlet/>
}

export default RouterProtection