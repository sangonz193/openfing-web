import { styled } from "@fluentui/react/lib/Utilities";

import { HomeBase } from "./Home.base";
import { getStyles } from "./Home.styles";
import { HomeProps, HomeStyleProps, HomeStyles } from "./Home.types";

export const Home = styled<HomeProps, HomeStyleProps, HomeStyles>(HomeBase, getStyles, undefined, undefined, true);
