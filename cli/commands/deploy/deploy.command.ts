import path from "path"
import SSH2Promise from "ssh2-promise"
import type SFTP from "ssh2-promise/dist/sftp"
import type { Stats } from "ssh2-streams"
import type { CommandModule } from "yargs"
import * as yup from "yup"

import { _fs, fs } from "../../_utils/fs"
import { projectPath } from "../../_utils/projectPath"

const command: CommandModule<{}, {}> = {
	command: "deploy" as const,

	describe: "Deploys the app",

	builder: (yargs) => yargs,

	handler: async () => {
		const { SSH_KEY, DESTINATION_PATH, SSH_HOST, SSH_USERNAME } = yup
			.object({
				SSH_KEY: yup.string().required(),
				DESTINATION_PATH: yup.string().required(),
				SSH_HOST: yup.string().required(),
				SSH_USERNAME: yup.string().required(),
			})
			.validateSync(process.env)

		const uploadRecursive = async (options: { fromPath: string; toPath: string; sftp: SFTP }) => {
			const { fromPath, sftp } = options
			let { toPath } = options
			const isDirectory = _fs.lstatSync(fromPath).isDirectory()

			if (!isDirectory) {
				await new Promise(async (resolve, reject) => {
					const readStream = _fs.createReadStream(fromPath)
					const writeStream = await sftp.createWriteStream(toPath)

					writeStream.on("close", resolve)
					writeStream.on("error", reject)

					readStream.pipe(writeStream)
				})
			} else {
				let stats: Stats | undefined
				try {
					stats = await sftp.lstat(toPath)
				} catch (e) {}

				let shouldCreateFolder = true

				if (stats) {
					if (stats.isSymbolicLink()) {
						toPath = await sftp.readlink(toPath)
						stats = await sftp.lstat(toPath)
					}

					if (stats.isDirectory()) {
						shouldCreateFolder = false
					}
				}

				if (shouldCreateFolder) {
					await sftp.mkdir(toPath)
				}

				const folderContent = await fs.readdir(fromPath)

				for (const item of folderContent) {
					await uploadRecursive({
						fromPath: path.join(fromPath, item),
						toPath: path.join(toPath, item),
						sftp,
					})
				}
			}

			console.log(`- uploaded: ${fromPath} to ${toPath}`)
		}

		const ssh = new SSH2Promise({
			host: SSH_HOST,
			username: SSH_USERNAME,
			privateKey: Buffer.from(SSH_KEY, "base64"),
		})

		await ssh.connect()
		const sftp = ssh.sftp()

		await uploadRecursive({
			fromPath: path.join(projectPath, "dist"),
			toPath: DESTINATION_PATH,
			sftp,
		})

		console.log("- done")
		ssh.close()
	},
}

export default command
