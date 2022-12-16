import { Theme } from '@mui/material';
import React, {createContext, ReactNode, useState} from 'react'
import { defaultTheme } from '../../utils/theme';

type ThemeContextProviderProps = {
    children: ReactNode;
};

type ThemeContextType = {
    theme: Theme;
    setTheme: (newTheme: Theme) => void;
};

const initialValue ={
  theme: defaultTheme,
  setTheme: () => {},
}

export const ThemeContext = createContext<ThemeContextType>(initialValue);

export const ThemeContextProvider = ({children} : ThemeContextProviderProps) =>{

    const [theme, setTheme] = useState(initialValue.theme);

    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}