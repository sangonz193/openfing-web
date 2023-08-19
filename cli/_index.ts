import { assertNodeVersion } from "./_utils/assertNodeVersion"

const run = async () => {
	await assertNodeVersion()

	require("./cli")
}

run()
