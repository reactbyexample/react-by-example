import { main } from './main'

main(process.argv[2], process.argv[3], process.argv[4]).catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exit(1)
})
