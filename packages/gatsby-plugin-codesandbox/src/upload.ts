import fetch from 'node-fetch'
import { CodesandboxInput } from './types'

const BASE_URL = 'https://codesandbox.io/api/v1'
const DEFINE_URL = 'sandboxes/define'

export const upload = async (sandbox: CodesandboxInput): Promise<string> => {
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
