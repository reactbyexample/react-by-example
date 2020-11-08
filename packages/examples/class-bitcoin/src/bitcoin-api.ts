const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

class BitcoinAPIImpl {
  private BASE_URL = 'https://api.coingecko.com'

  async getPrice(fiat: string): Promise<number> {
    const coin = 'bitcoin'
    const result = await fetch(this.priceUrl(coin, fiat))
    const json = (await result.json()) as Record<string, Record<string, number>>
    await delay(1000 * Math.random())
    return Number(json[coin][fiat])
  }

  private priceUrl(coin: string, fiat: string): string {
    return `${this.BASE_URL}/api/v3/simple/price?ids=${coin}&vs_currencies=${fiat}`
  }
}

export const BitcoinAPI = new BitcoinAPIImpl()
