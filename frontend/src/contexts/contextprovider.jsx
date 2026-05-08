import { createContext, useState, useContext } from "react";
import axiosClient from '../axiosClient';

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({ children }) =>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER')));
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    //const [token, _setToken] = useState(124);

    const setToken = (token) =>{
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token)
        }else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    const setUserData = (user) => {
        setUser(user)
        if (user) {
            localStorage.setItem('USER', JSON.stringify(user))
        }else{
            localStorage.removeItem('USER')
        }
    }

    
    
    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser: setUserData,
            setToken
        }}>
            {children}
        </StateContext.Provider >
    )    
    
}

export const useStateContext = () => useContext(StateContext);

