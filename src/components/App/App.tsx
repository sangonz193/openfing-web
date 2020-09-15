import { styled } from "@fluentui/react/lib/Utilities";

import { AppBase } from "./App.base";
import { getStyles } from "./App.styles";
import { AppProps, AppStyleProps, AppStyles } from "./App.types";

export const App = styled<AppProps, AppStyleProps, AppStyles>(AppBase, getStyles, undefined, undefined, true);
