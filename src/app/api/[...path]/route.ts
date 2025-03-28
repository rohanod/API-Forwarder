import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
    try {
        const { searchParams } = new URL(request.url)
        const headers = searchParams.get('headers')
        const targetPath = (await params).path.join('/')
        
        const forwardHeaders = new Headers(request.headers)
        forwardHeaders.delete('accept-encoding')
        
        if (headers) {
            try {
                const customHeaders = JSON.parse(decodeURIComponent(headers))
                Object.entries(customHeaders).forEach(([key, value]) => {
                    forwardHeaders.set(key, value as string)
                })
            } catch (e) {
                if (headers.includes(':')) {
                    const [key, value] = headers.split(':')
                    forwardHeaders.set(key.trim(), value.trim())
                }
            }
        }
        
        const response = await fetch(targetPath.startsWith('http') ? targetPath : `https://${targetPath}`, {
            headers: forwardHeaders
        })
        
        const contentType = response.headers.get('content-type')
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': contentType || 'application/json'
        }

        if (contentType?.includes('application/json')) {
            const data = await response.json()
            return NextResponse.json(data, {
                status: response.status,
                headers: corsHeaders
            })
        } else {
            const text = await response.text()
            return new NextResponse(text, {
                status: response.status,
                headers: corsHeaders
            })
        }
    } catch (error: any) {
        console.error('Error:', error)
        return NextResponse.json(
            { error: 'Failed to forward request', details: error?.message || 'Unknown error' },
            { 
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json'
                }
            }
        )
    }
}

export async function OPTIONS(request: NextRequest) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    })
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
    try {
        const { searchParams } = new URL(request.url)
        const headers = searchParams.get('headers')
        const data = searchParams.get('d')
        const targetPath = (await params).path.join('/')
        
        const forwardHeaders = new Headers(request.headers)
        forwardHeaders.delete('accept-encoding')
        
        if (headers) {
            try {
                const customHeaders = JSON.parse(decodeURIComponent(headers))
                Object.entries(customHeaders).forEach(([key, value]) => {
                    forwardHeaders.set(key, value as string)
                })
            } catch (e) {
                if (headers.includes(':')) {
                    const [key, value] = headers.split(':')
                    forwardHeaders.set(key.trim(), value.trim())
                }
            }
        }
        
        let body
        if (data) {
            try {
                body = JSON.parse(decodeURIComponent(data))
            } catch (e) {
                body = data
            }
        } else {
            try {
                body = await request.json()
            } catch (e) {
                body = null
            }
        }
        
        const response = await fetch(targetPath.startsWith('http') ? targetPath : `https://${targetPath}`, {
            method: 'POST',
            headers: forwardHeaders,
            body: JSON.stringify(body),
            // Add longer timeout and streaming support
            signal: AbortSignal.timeout(120000), // 2 minute timeout
            cache: 'no-store'
        })
        
        const contentType = response.headers.get('content-type')
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': contentType || 'application/json'
        }

        if (contentType?.includes('application/json')) {
            const data = await response.json()
            return NextResponse.json(data, {
                status: response.status,
                headers: corsHeaders
            })
        } else {
            const text = await response.text()
            return new NextResponse(text, {
                status: response.status,
                headers: corsHeaders
            })
        }
    } catch (error: any) {
        console.error('Error:', error)
        return NextResponse.json(
            { error: 'Failed to forward request', details: error?.message || 'Unknown error' },
            { 
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json'
                }
            }
        )
    }
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
    try {
        const { searchParams } = new URL(request.url)
        const headers = searchParams.get('headers')
        const data = searchParams.get('d')
        const targetPath = (await params).path.join('/')
        
        const forwardHeaders = new Headers(request.headers)
        forwardHeaders.delete('accept-encoding')
        
        if (headers) {
            try {
                const customHeaders = JSON.parse(decodeURIComponent(headers))
                Object.entries(customHeaders).forEach(([key, value]) => {
                    forwardHeaders.set(key, value as string)
                })
            } catch (e) {
                if (headers.includes(':')) {
                    const [key, value] = headers.split(':')
                    forwardHeaders.set(key.trim(), value.trim())
                }
            }
        }
        
        let body
        if (data) {
            try {
                body = JSON.parse(decodeURIComponent(data))
            } catch (e) {
                body = data
            }
        } else {
            try {
                body = await request.json()
            } catch (e) {
                body = null
            }
        }
        
        const response = await fetch(targetPath.startsWith('http') ? targetPath : `https://${targetPath}`, {
            method: 'PUT',
            headers: forwardHeaders,
            body: JSON.stringify(body)
        })
        
        const contentType = response.headers.get('content-type')
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': contentType || 'application/json'
        }

        if (contentType?.includes('application/json')) {
            const data = await response.json()
            return NextResponse.json(data, {
                status: response.status,
                headers: corsHeaders
            })
        } else {
            const text = await response.text()
            return new NextResponse(text, {
                status: response.status,
                headers: corsHeaders
            })
        }
    } catch (error: any) {
        console.error('Error:', error)
        return NextResponse.json(
            { error: 'Failed to forward request', details: error?.message || 'Unknown error' },
            { 
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json'
                }
            }
        )
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
    try {
        const { searchParams } = new URL(request.url)
        const headers = searchParams.get('headers')
        const targetPath = (await params).path.join('/')
        
        const forwardHeaders = new Headers(request.headers)
        forwardHeaders.delete('accept-encoding')
        
        if (headers) {
            try {
                const customHeaders = JSON.parse(decodeURIComponent(headers))
                Object.entries(customHeaders).forEach(([key, value]) => {
                    forwardHeaders.set(key, value as string)
                })
            } catch (e) {
                if (headers.includes(':')) {
                    const [key, value] = headers.split(':')
                    forwardHeaders.set(key.trim(), value.trim())
                }
            }
        }
        
        const response = await fetch(targetPath.startsWith('http') ? targetPath : `https://${targetPath}`, {
            method: 'DELETE',
            headers: forwardHeaders
        })
        
        const contentType = response.headers.get('content-type')
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': contentType || 'application/json'
        }

        if (contentType?.includes('application/json')) {
            const data = await response.json()
            return NextResponse.json(data, {
                status: response.status,
                headers: corsHeaders
            })
        } else {
            const text = await response.text()
            return new NextResponse(text, {
                status: response.status,
                headers: corsHeaders
            })
        }
    } catch (error: any) {
        console.error('Error:', error)
        return NextResponse.json(
            { error: 'Failed to forward request', details: error?.message || 'Unknown error' },
            { 
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json'
                }
            }
        )
    }
}