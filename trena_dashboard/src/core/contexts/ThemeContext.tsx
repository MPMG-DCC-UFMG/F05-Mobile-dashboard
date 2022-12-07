import React, {createContext, useState} from 'react'

type ThemeContextProviderProps = {
    children: React.ReactNode
};

type ThemeContextType = {
    theme: string;
    setTheme: (theme: string) => void;
};

const initialValue ={
  theme: 'defaultTheme',
  setTheme: () => {},
}

export const ThemeContext = createContext<ThemeContextType>(initialValue);

export const ThemeContextProvider = ({children} : ThemeContextProviderProps) =>{

    const [theme, setTheme] = useState(initialValue.theme);

    const change = ()=>{
        setTheme(theme ==='defaultTheme' ? 'trenaTheme' : 'defaultTheme')
    }

    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}