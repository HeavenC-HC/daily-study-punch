import React from "react";


const AuthContext = React.createContext();


const AuthProvider = ({children}) => {
    const [user, setUser] = React.useState('')

    const login = (user, callback) => {
        setUser(user);
        callback()
    }

    const logout = callback => {
        setUser('')
        callback()
    }

    const value = {user, login, logout}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return React.useContext(AuthContext);
}


export {
    AuthContext,
    AuthProvider,
    useAuth,
};
