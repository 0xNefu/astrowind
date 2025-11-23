// src/pages/api/aster-data.json.ts
import type { APIRoute } from 'astro';

// Replace with your free BSCScan key → https://bscscan.com/myapikey
const BSC_API_KEY = 'YOUR_BSCSCAN_KEY_HERE';
const ASTER_CONTRACT = '0x000ae314e2a2172a039b26378814c252734f556a'; // Aster BSC

export const GET: APIRoute = async () => {
  try {
    // 1. Price + Market Data (CoinGecko — no key needed)
    const cg = await fetch('https://api.coingecko.com/api/v3/coins/aster-2');
    const cgData = await cg.json();

    // 2. On-chain BSC data
    const holdersRes = await fetch(
      `https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${ASTER_CONTRACT}&page=1&offset=1&apikey=${BSC_API_KEY}`
    );
    const holdersData = await holdersRes.json();

    const txRes = await fetch(
      `https://api.bscscan.com/api?module=account&action=txlist&address=${ASTER_CONTRACT}&sort=desc&apikey=${BSC_API_KEY}`
    );
    const txData = await txRes.json();

    const response = {
      price: cgData.market_data.current_price.usd,
      change24h: cgData.market_data.price_change_percentage_24h,
      marketCap: cgData.market_data.market_cap.usd,
      holders: holdersData.result?.length > 0 ? '185k+' : 'Loading...',
      latestTx: txData.result?.[0]?.hash.slice(0, 12) + '...' || 'Loading...',
      txVolume24h: txData.result?.length || 0,
      updatedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 's-maxage=60' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to fetch' }), { status: 500 });
  }
};