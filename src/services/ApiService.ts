import axios from 'axios';

import {
  CryptoCurrency,
  GlobalStats,
  CryptoResponse,
  GlobalStatsResponse,
} from '../models/CryptoCurrency';

export class ApiService {
  private static BASE_URL = 'https://api.coinlore.net/api';

  static async getGlobalStats(): Promise<GlobalStats> {
    const response = await axios.get<GlobalStatsResponse>(
      `${this.BASE_URL}/global/`,
    );
    return response.data[0];
  }

  static async getCryptos(
    start: number = 0,
    limit: number = 100,
  ): Promise<CryptoResponse> {
    const response = await axios.get<CryptoResponse>(
      `${this.BASE_URL}/tickers/?start=${start}&limit=${limit}`,
    );
    return response.data;
  }

  static async getCryptoDetails(id: string): Promise<CryptoCurrency> {
    const response = await axios.get<CryptoCurrency[]>(
      `${this.BASE_URL}/ticker/?id=${id}`,
    );
    return response.data[0];
  }
}
