import React from "react";

import { useHistory } from "../hooks/useHistory";

export const Redirect = (props: { to: string }) => {
	const history = useHistory();

	React.useEffect(() => {
		history.push(props.to);
	}, []);

	return null;
};
