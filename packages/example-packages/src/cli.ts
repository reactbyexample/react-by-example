import { main } from './main'

const [
  templatesDirectory,
  examplesDirectory,
  outputDirectory,
] = process.argv.slice(2)

main(templatesDirectory, examplesDirectory, outputDirectory).catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exit(1)
})
