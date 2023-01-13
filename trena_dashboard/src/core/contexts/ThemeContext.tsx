/* eslint-disable @typescript-eslint/no-empty-function */
import { Theme } from "@mui/material";
import React, { createContext, ReactNode, useState } from "react";
import {
	darkDefaultTheme,
	darkTrenaTheme,
	defaultTheme,
	trenaTheme,
} from "../../utils/theme";

type ThemeContextProviderProps = {
	children: ReactNode;
};

type ThemeContextType = {
	theme: Theme;
	setTheme: (newTheme: Theme) => void;
	toggleTheme: () => void;
	isDark: boolean;
	setIsDark: (newState: boolean) => void;
};

const initialValue = {
	theme: defaultTheme,
	setTheme: () => {},
	toggleTheme: () => {},
	isDark: false,
	setIsDark: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(initialValue);

export const ThemeContextProvider = ({
	children,
}: ThemeContextProviderProps) => {
	const [theme, setTheme] = useState(initialValue.theme);
	const [isDark, setIsDark] = useState(initialValue.isDark);

	const toggleTheme = () => {
		setTheme(
			(theme === defaultTheme && darkDefaultTheme) ||
				(theme === darkDefaultTheme && defaultTheme) ||
				(theme === trenaTheme && darkTrenaTheme) ||
				(theme === darkTrenaTheme && trenaTheme) ||
				theme
		);
		setIsDark(isDark === false ? true : false);
	};

	document.cookie = `theme= ${theme}`;

	return (
		<ThemeContext.Provider
			value={{
				theme,
				setTheme,
				toggleTheme,
				isDark,
				setIsDark,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
