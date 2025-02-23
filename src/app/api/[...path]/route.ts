import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
    try {
        const { searchParams } = new URL(request.url)
        const headers = searchParams.get('headers')
        const targetPath = (await params).path.join('/')
        const parsedHeaders = headers ? JSON.parse(decodeURIComponent(headers)) : {}
        
        const response = await fetch(targetPath.startsWith('http') ? targetPath : `https://${targetPath}`, {
            headers: parsedHeaders
        })
        
        const contentType = response.headers.get('content-type')
        if (contentType?.includes('application/json')) {
            const data = await response.json()
            return NextResponse.json(data)
        } else {
            const text = await response.text()
            return new NextResponse(text, {
                status: response.status,
                headers: {
                    'Content-Type': contentType || 'text/plain'
                }
            })
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to forward request' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
    try {
        const { searchParams } = new URL(request.url)
        const headers = searchParams.get('headers')
        const targetPath = (await params).path.join('/')
        const parsedHeaders = headers ? JSON.parse(decodeURIComponent(headers)) : {}
        const body = await request.json()
        
        const response = await fetch(targetPath.startsWith('http') ? targetPath : `https://${targetPath}`, {
            method: 'POST',
            headers: parsedHeaders,
            body: JSON.stringify(body)
        })
        
        const contentType = response.headers.get('content-type')
        if (contentType?.includes('application/json')) {
            const data = await response.json()
            return NextResponse.json(data)
        } else {
            const text = await response.text()
            return new NextResponse(text, {
                status: response.status,
                headers: {
                    'Content-Type': contentType || 'text/plain'
                }
            })
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to forward request' },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
    try {
        const { searchParams } = new URL(request.url)
        const headers = searchParams.get('headers')
        const targetPath = (await params).path.join('/')
        const parsedHeaders = headers ? JSON.parse(decodeURIComponent(headers)) : {}
        const body = await request.json()
        
        const response = await fetch(targetPath.startsWith('http') ? targetPath : `https://${targetPath}`, {
            method: 'PUT',
            headers: parsedHeaders,
            body: JSON.stringify(body)
        })
        
        const contentType = response.headers.get('content-type')
        if (contentType?.includes('application/json')) {
            const data = await response.json()
            return NextResponse.json(data)
        } else {
            const text = await response.text()
            return new NextResponse(text, {
                status: response.status,
                headers: {
                    'Content-Type': contentType || 'text/plain'
                }
            })
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to forward request' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
    try {
        const { searchParams } = new URL(request.url)
        const headers = searchParams.get('headers')
        const targetPath = (await params).path.join('/')
        const parsedHeaders = headers ? JSON.parse(decodeURIComponent(headers)) : {}
        
        const response = await fetch(targetPath.startsWith('http') ? targetPath : `https://${targetPath}`, {
            method: 'DELETE',
            headers: parsedHeaders
        })
        
        const contentType = response.headers.get('content-type')
        if (contentType?.includes('application/json')) {
            const data = await response.json()
            return NextResponse.json(data)
        } else {
            const text = await response.text()
            return new NextResponse(text, {
                status: response.status,
                headers: {
                    'Content-Type': contentType || 'text/plain'
                }
            })
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to forward request' },
            { status: 500 }
        )
    }
} 