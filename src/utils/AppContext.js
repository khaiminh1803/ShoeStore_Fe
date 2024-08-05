import { createContext, useState } from "react";


export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const { children } = props
    // data sử dụng chung 
    const [isLogin, setisLogin] = useState(false)
    const [infoUser, setinfoUser] = useState({})
    const [dataCart, setdataCart] = useState([])
    const [dataOrder, setdataOrder] = useState([])
    const [dataVoucher, setdataVoucher] = useState([])
    const [selectedVoucher, setselectedVoucher] = useState(null)
    const [dataFavorite, setdataFavorite] = useState([])
    return (
        <AppContext.Provider value={{ isLogin, setisLogin, infoUser, setinfoUser, dataCart, setdataCart, dataOrder, setdataOrder, dataVoucher, setdataVoucher, selectedVoucher, setselectedVoucher, dataFavorite, setdataFavorite }}>
            {children}
        </AppContext.Provider>
    )
}

