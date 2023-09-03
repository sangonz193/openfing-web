import type { ParamParseKey, Params, PathMatch, PathPattern } from "react-router-dom"

// TODO: delete when https://github.com/remix-run/react-router/pull/10768 is merged.

export function matchPath<ParamKey extends ParamParseKey<Path>, Path extends string>(
	pattern: PathPattern<Path> | Path,
	pathname: string
): PathMatch<ParamKey> | null {
	if (typeof pattern === "string") {
		pattern = { path: pattern, caseSensitive: false, end: true }
	}

	const [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end)

	const match = pathname.match(matcher)
	if (!match) {
		return null
	}

	const matchedPathname = match[0]
	let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1")
	const captureGroups = match.slice(1)
	const params: Params = paramNames.reduce<Mutable<Params>>((memo, { paramName, isOptional }, index) => {
		// We need to compute the pathnameBase here using the raw splat value
		// instead of using params["*"] later because it will be decoded then
		if (paramName === "*") {
			const splatValue = captureGroups[index] || ""
			pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1")
		}

		const value = captureGroups[index]
		if (isOptional && !value) {
			memo[paramName] = undefined
		} else {
			memo[paramName] = safelyDecodeURIComponent(value || "", paramName)
		}
		return memo
	}, {})

	return {
		params,
		pathname: matchedPathname,
		pathnameBase,
		pattern,
	}
}

type Mutable<T> = {
	-readonly [P in keyof T]: T[P]
}

function compilePath(
	path: string,
	caseSensitive = false,
	end = true
): [RegExp, Array<{ paramName: string; isOptional: boolean }>] {
	warning(
		path === "*" || !path.endsWith("*") || path.endsWith("/*"),
		`Route path "${path}" will be treated as if it were ` +
			`"${path.replace(/\*$/, "/*")}" because the \`*\` character must ` +
			`always follow a \`/\` in the pattern. To get rid of this warning, ` +
			`please change the route path to "${path.replace(/\*$/, "/*")}".`
	)

	const paramNames: Array<{ paramName: string; isOptional: boolean }> = []
	let regexpSource =
		"^" +
		path
			.replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
			.replace(/^\/*/, "/") // Make sure it has a leading /
			.replace(/[\\.*+^${}|()[\]]/g, "\\$&") // Escape special regex chars
			.replace(/\/:(\w+)(\?)?/g, (_: string, paramName: string, ...rest) => {
				const isOptional = rest[0] != null
				paramNames.push({ paramName, isOptional })
				return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)"
			})

	if (path.endsWith("*")) {
		paramNames.push({ paramName: "*", isOptional: false })
		regexpSource +=
			path === "*" || path === "/*"
				? "(.*)$" // Already matched the initial /, just match the rest
				: "(?:\\/(.+)|\\/*)$" // Don't include the / in params["*"]
	} else if (end) {
		// When matching to the end, ignore trailing slashes
		regexpSource += "\\/*$"
	} else if (path !== "" && path !== "/") {
		// If our path is non-empty and contains anything beyond an initial slash,
		// then we have _some_ form of path in our regex so we should expect to
		// match only if we find the end of this path segment.  Look for an optional
		// non-captured trailing slash (to match a portion of the URL) or the end
		// of the path (if we've matched to the end).  We used to do this with a
		// word boundary but that gives false positives on routes like
		// /user-preferences since `-` counts as a word boundary.
		regexpSource += "(?:(?=\\/|$))"
	} else {
		// Nothing to match for "" or "/"
	}

	const matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i")

	return [matcher, paramNames]
}

function safelyDecodeURIComponent(value: string, paramName: string) {
	try {
		return decodeURIComponent(value)
	} catch (error) {
		warning(
			false,
			`The value for the URL param "${paramName}" will not be decoded because` +
				` the string "${value}" is a malformed URL segment. This is probably` +
				` due to a bad percent encoding (${error as string}).`
		)

		return value
	}
}

function warning(cond: any, message: string) {
	if (!cond) {
		// eslint-disable-next-line no-console
		if (typeof console !== "undefined") {
			console.warn(message)
		}

		try {
			// Welcome to debugging history!
			//
			// This error is thrown as a convenience so you can more easily
			// find the source for a warning that appears in the console by
			// enabling "pause on exceptions" in your JavaScript debugger.
			throw new Error(message)
			// eslint-disable-next-line no-empty
		} catch (e) {}
	}
}
