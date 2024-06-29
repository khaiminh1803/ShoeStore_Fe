import { createContext, useState } from "react";


export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const {children} = props
    // data sử dụng chung 
    const [isLogin, setisLogin] = useState(false)
    const [infoUser, setinfoUser] = useState({})
    const [dataCart, setdataCart] = useState([])
    return (
        <AppContext.Provider value={{isLogin,setisLogin, infoUser, setinfoUser, dataCart, setdataCart}}>
            {children}
        </AppContext.Provider>
    )
}