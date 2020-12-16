import React from "react";

import { RecursivePartial } from "../../typings/utils";
import { LayoutOptions } from "./Layout.types";

export type LayoutContextValue = {
	setLayoutOptions: (options: RecursivePartial<LayoutOptions>) => void;
};

export const LayoutContext = React.createContext<LayoutContextValue>((undefined as unknown) as LayoutContextValue);
