import {createContext, useContext, useEffect, useState} from "react"

const AuthContext = createContext();

export const useAuth = ()=> useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async() => {
            try {
                const response = await getCurrentUser();
                setUser(response.data);
            } catch (error) {
                setUser(null);
            }
            finally{
                setLoading(false)
            }
        }
        checkAuth()
    }, [])
}
