import { _fs, fs } from "@sangonz193/utils/node/fs"
import type { ChildProcess } from "child_process"
import path from "path"
import simpleGit from "simple-git"
import SSH2Promise from "ssh2-promise"
import * as yup from "yup"

import { projectPath } from "../../_utils/projectPath"
import { createCommand } from "../_utils/createCommand"

const command = createCommand({
	command: "deploy" as const,

	describe: "Deploys the app",

	builder: (yargs) => yargs,

	handler: async () => {
		const {
			SSH_KEY,
			DESTINATION_PATH,
			DESTINATION_REPO_PATH,
			REMOTE_DESTINATION_REPO_PATH,
			SSH_HOST,
			SSH_USERNAME,
		} = yup
			.object({
				SSH_KEY: yup.string().required(),
				REMOTE_DESTINATION_REPO_PATH: yup.string().required(),
				DESTINATION_REPO_PATH: yup.string().required(),
				DESTINATION_PATH: yup.string().required(),
				SSH_HOST: yup.string().required(),
				SSH_USERNAME: yup.string().required(),
			})
			.validateSync(process.env)

		const copyRecursive = async (options: { fromPath: string; toPath: string }) => {
			const { fromPath } = options
			let { toPath } = options
			const isDirectory = _fs.lstatSync(fromPath).isDirectory()

			if (!isDirectory) {
				await fs.copyFile(fromPath, toPath)
			} else {
				let stats: _fs.Stats | undefined
				try {
					stats = await fs.lstat(toPath)
				} catch (e) {}

				let shouldCreateFolder = true

				if (stats) {
					if (stats.isSymbolicLink()) {
						toPath = await fs.readlink(toPath)
						stats = await fs.lstat(toPath)
					}

					if (stats.isDirectory()) {
						shouldCreateFolder = false
					}
				}

				if (shouldCreateFolder) {
					await fs.mkdir(toPath)
				}

				const folderContent = await fs.readdir(fromPath)

				for (const item of folderContent) {
					await copyRecursive({
						fromPath: path.join(fromPath, item),
						toPath: path.join(toPath, item),
					})
				}
			}

			console.log(`- copied: ${fromPath} to ${toPath}`)
		}

		const ssh = new SSH2Promise({
			host: SSH_HOST,
			username: SSH_USERNAME,
			privateKey: Buffer.from(SSH_KEY, "base64"),
		})

		await ssh.connect()
		await copyRecursive({
			fromPath: path.join(projectPath, "build"),
			toPath: DESTINATION_PATH,
		})

		const git = simpleGit({
			baseDir: DESTINATION_REPO_PATH,
		})

		const status = await git.status()

		if (!status.isClean()) {
			await git.add(["--all", "."])
			await git.commit("deploy")
			await git.push()
		} else {
			console.log("No changes detected, won't commit")
		}

		const gitPullSpawn = (await ssh.spawn(`cd "${REMOTE_DESTINATION_REPO_PATH}" && git pull`).catch((e) => {
			console.log(e)
			throw e
		})) as ChildProcess
		gitPullSpawn.stdout?.pipe(process.stdout)
		gitPullSpawn.stderr?.pipe(process.stderr)

		console.log("- done")
		await new Promise((resolve, reject) => {
			;(gitPullSpawn as ChildProcess).on("exit", (code) => {
				if (code === 0) {
					resolve(code)
				} else {
					reject(code)
				}
			})
		})

		console.log("- done")
		await ssh.close()
	},
})

export default command
