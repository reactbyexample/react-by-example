/* eslint-disable class-methods-use-this */
const BASE = '//api.tenor.com/v1'

interface TenorResult {
  results: {
    media: {
      tinygif: { url: string }
    }[]
  }[]
}

class TenorApiImpl {
  async search(query: string): Promise<string[]> {
    const response = await fetch(
      `${BASE}/search?q=${query}&contentfilter=high&limit=9&media_filter=minimal`,
    )
    const json = (await response.json()) as TenorResult

    return json.results.map((result) => result.media[0].tinygif.url)
  }
}

export const TenorApi = new TenorApiImpl()
