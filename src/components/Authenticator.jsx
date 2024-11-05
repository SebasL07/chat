import { useState } from "react"
import { Outlet } from "react-router-dom"

export default function Authenticator() {

    const [token, setToken] = useState(null);
    return(

        <div>
            <h1>Autenticador</h1>
            {token && <Outlet />}
        </div>
    )
}