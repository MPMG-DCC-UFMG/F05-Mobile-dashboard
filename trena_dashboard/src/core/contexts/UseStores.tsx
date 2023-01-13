import React from "react";

import { rootContext } from "./RootContext";

export const useStores = () => React.useContext(rootContext);
