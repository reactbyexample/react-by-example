import { backoff } from '@app/backoff'
import { Semaphore } from '@app/semaphore'
import fetch from 'node-fetch'
import { CodesandboxInput } from './types'

const BASE_URL = 'https://codesandbox.io/api/v1'
const DEFINE_URL = 'sandboxes/define'

const uploadUnlimited = async (sandbox: CodesandboxInput): Promise<string> => {
  const files: Record<string, { content: string }> = {}
  sandbox.files.forEach(({ name, value }) => {
    files[name] = { content: value }
  })
  const body = { files }

  const result = await fetch(`${BASE_URL}/${DEFINE_URL}?json=1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { sandbox_id } = (await result.json()) as { sandbox_id: string }

  return sandbox_id
}

const semaphore = new Semaphore()
export const upload = (sandbox: CodesandboxInput): Promise<string> => {
  return semaphore.enter(() =>
    backoff(
      (attempt) => {
        // eslint-disable-next-line no-console
        console.log(
          '[gatsby-plugin-codesandbox]',
          `uploading ${sandbox.name}`,
          attempt > 0 ? `(attempt ${attempt + 1})` : '',
        )

        return uploadUnlimited(sandbox)
      },
      { maxRetries: 5, factor: 2.8 },
    ),
  )
}
