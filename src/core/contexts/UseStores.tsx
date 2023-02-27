import React from "react";

import { ThemeContext } from "./ThemeContext";

export const useStores = () => React.useContext(ThemeContext);
