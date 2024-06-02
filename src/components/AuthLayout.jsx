import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if (authentication && authentication !== authStatus) {
            navigate("/login")
        } else if (!authentication && authentication !== authStatus) {
            navigate("/")
        }
        setLoader(false)
    }, [navigate, authStatus, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}
