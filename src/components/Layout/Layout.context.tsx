import React from "react";

import { LayoutOptions } from "./Layout.types";

export type LayoutContextValue = {
	setLayoutOptions: (options: RecursivePartial<LayoutOptions>) => void;
};

export const LayoutContext = React.createContext<LayoutContextValue>((undefined as unknown) as LayoutContextValue);
