export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24_native: number;
  csupply: string;
  tsupply: string;
  msupply: string;
}

export interface GlobalStats {
  coins_count: number;
  active_markets: number;
  total_mcap: number;
  total_volume: number;
  btc_d: string;
  eth_d: string;
  mcap_change: string;
  volume_change: string;
  avg_change_percent: string;
  volume_ath: number;
  mcap_ath: number;
}

export type GlobalStatsResponse = GlobalStats[];

export interface CryptoResponse {
  data: CryptoCurrency[];
  info?: {
    coins_num: number;
    time: number;
  };
}
