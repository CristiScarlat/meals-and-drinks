import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        message: 'Welcome to the mealswithdrinks API root',
        endpoints: [
            '/meals',
            '/drinks',
            'iradio'
        ]
    })
}

export async function POST(request: Request) {
    const body = await request.json()
    return NextResponse.json({
        received: body
    })
}