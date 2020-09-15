import React from "react";

import { Course } from "./components/Course";
import { Courses } from "./components/Courses";
import { Faqs } from "./components/Faqs";
import { Home } from "./components/Home";
import { Redirect } from "./components/Redirect";
import { Settings } from "./components/Settings";
import { Updates } from "./components/Updates";

export type RouteConfig<TMatchParams = {}, TGetPathOptions = TMatchParams> = {
	path: {} extends TGetPathOptions ? string : (options: TGetPathOptions) => string;
	element: (props: TMatchParams) => React.ReactNode;
	matchConfig: {
		path: string;
		exact?: boolean;
		_matchParams?: TMatchParams;
	};
};

export type GetCoursePathOptions = {
	courseClassListCode: string;
} & (
	| {
			courseClassNo?: undefined;
			startOnSeconds?: undefined;
			endOnSeconds?: undefined;
	  }
	| {
			courseClassNo: number;
			startOnSeconds?: undefined;
			endOnSeconds?: undefined;
	  }
	| {
			courseClassNo: number;
			startOnSeconds?: number;
			endOnSeconds?: undefined;
	  }
	| {
			courseClassNo: number;
			startOnSeconds: number;
			endOnSeconds?: number;
	  }
);

const homeConfig: RouteConfig = {
	path: `/`,
	element: () => <Home />,
	matchConfig: {
		path: `/`,
	},
};

export const routeConfigMap: {
	home: RouteConfig;
	course: RouteConfig<{ courseClassListCode: string; courseClassNo: string | undefined }, GetCoursePathOptions>;
	courses: RouteConfig;
	updates: RouteConfig;
	faqs: RouteConfig;
	settings: RouteConfig;
	_: RouteConfig;
} = {
	home: homeConfig,

	courses: {
		path: `/courses`,
		element: () => <Courses />,
		matchConfig: {
			path: `/courses`,
		},
	},

	course: {
		path: (options: GetCoursePathOptions): string => {
			let result = `/courses/${options.courseClassListCode}`;

			if (options.courseClassNo) {
				result += `/${options.courseClassNo}`;

				if (options.startOnSeconds)
					result += `?t=${options.startOnSeconds}${options.endOnSeconds ? `,${options.endOnSeconds}` : ""}`;
			}

			return result;
		},
		element: (props) => {
			return <Course courseClassListCode={props.courseClassListCode} courseClassNo={props.courseClassNo} />;
		},
		matchConfig: {
			path: "/courses/:courseClassListCode/:courseClassNo?",
		},
	},

	updates: {
		path: `/updates`,
		element: () => <Updates />,
		matchConfig: {
			path: `/updates`,
		},
	},

	faqs: {
		path: `/faqs`,
		element: () => <Faqs />,
		matchConfig: {
			path: `/faqs`,
		},
	},

	settings: {
		path: `/settings`,
		element: () => <Settings />,
		matchConfig: {
			path: `/settings`,
		},
	},

	_: {
		path: "",
		element: () => <Redirect to={homeConfig.path} />,
		matchConfig: {
			path: "",
			exact: false,
		},
	},
};
