import React from "react";

import {rootContext} from "../contexts/RootContext";

export const useStores =() => React.useContext(rootContext)