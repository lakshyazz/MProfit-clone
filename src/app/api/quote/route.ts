import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  try {
    // Attempt to fetch from Yahoo Finance
    const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      },
      next: { revalidate: 60 } // Cache for 60s
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    const result = data.chart?.result?.[0];
    
    if (result && result.meta && result.meta.regularMarketPrice !== undefined) {
      // Calculate change percent if available
      const price = result.meta.regularMarketPrice;
      const prevClose = result.meta.chartPreviousClose || price;
      const changePercent = prevClose > 0 ? ((price - prevClose) / prevClose) * 100 : 0;

      return NextResponse.json({ 
        price,
        changePercent 
      });
    } else {
      return NextResponse.json({ error: 'Price not found' }, { status: 404 });
    }
  } catch (error: any) {
    console.error('API Route Error fetching quote:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch quote' }, { status: 500 });
  }
}
