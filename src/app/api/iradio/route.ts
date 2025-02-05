import { NextResponse, NextRequest } from 'next/server';
import { getIRadioStations } from '@/services/iradioDB';

export async function GET(request: NextRequest) {
    const searchParams: URLSearchParams = request.nextUrl.searchParams;
    const limit: string | null = searchParams.get('limit');
    const offset: string | null = searchParams.get('offset');
    if(Number(limit) >= 0 && Number(offset) >= 0) {
        const stations = await getIRadioStations(Number(limit), Number(offset));
        return NextResponse.json({
            status: 200,
            statusText: 'OK',
            stations
        })
    }
    return NextResponse.json({
        status: 422,
        message: 'Limit or Offset missing',
    })
}