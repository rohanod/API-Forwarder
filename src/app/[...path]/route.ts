import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
    try {
        const { searchParams } = new URL(request.url)
        const headers = searchParams.get('headers')
        const targetPath = (await params).path.join('/')
        
        const forwardHeaders = new Headers(request.headers)
        
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
            'Access-Control-Allow-Headers': '*'
        }

        if (contentType?.includes('application/json')) {
            const data = await response.json()
            return NextResponse.json(data, {
                status: response.status,
                headers: {
                    'Content-Type': contentType,
                    ...corsHeaders
                }
            })
        } else {
            const text = await response.text()
            return new NextResponse(text, {
                status: response.status,
                headers: {
                    'Content-Type': contentType || 'text/plain',
                    ...corsHeaders
                }
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
                    'Access-Control-Allow-Headers': '*'
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
        const targetPath = (await params).path.join('/')
        
        const forwardHeaders = new Headers(request.headers)
        
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
        
        const body = await request.json()
        
        const response = await fetch(targetPath.startsWith('http') ? targetPath : `https://${targetPath}`, {
            method: 'POST',
            headers: forwardHeaders,
            body: JSON.stringify(body)
        })
        
        const contentType = response.headers.get('content-type')
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }

        if (contentType?.includes('application/json')) {
            const data = await response.json()
            return NextResponse.json(data, {
                status: response.status,
                headers: {
                    'Content-Type': contentType,
                    ...corsHeaders
                }
            })
        } else {
            const text = await response.text()
            return new NextResponse(text, {
                status: response.status,
                headers: {
                    'Content-Type': contentType || 'text/plain',
                    ...corsHeaders
                }
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
                    'Access-Control-Allow-Headers': '*'
                }
            }
        )
    }
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
    try {
        const { searchParams } = new URL(request.url)
        const headers = searchParams.get('headers')
        const targetPath = (await params).path.join('/')
        
        const forwardHeaders = new Headers(request.headers)
        
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
        
        const body = await request.json()
        
        const response = await fetch(targetPath.startsWith('http') ? targetPath : `https://${targetPath}`, {
            method: 'PUT',
            headers: forwardHeaders,
            body: JSON.stringify(body)
        })
        
        const contentType = response.headers.get('content-type')
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }

        if (contentType?.includes('application/json')) {
            const data = await response.json()
            return NextResponse.json(data, {
                status: response.status,
                headers: {
                    'Content-Type': contentType,
                    ...corsHeaders
                }
            })
        } else {
            const text = await response.text()
            return new NextResponse(text, {
                status: response.status,
                headers: {
                    'Content-Type': contentType || 'text/plain',
                    ...corsHeaders
                }
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
                    'Access-Control-Allow-Headers': '*'
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
            'Access-Control-Allow-Headers': '*'
        }

        if (contentType?.includes('application/json')) {
            const data = await response.json()
            return NextResponse.json(data, {
                status: response.status,
                headers: {
                    'Content-Type': contentType,
                    ...corsHeaders
                }
            })
        } else {
            const text = await response.text()
            return new NextResponse(text, {
                status: response.status,
                headers: {
                    'Content-Type': contentType || 'text/plain',
                    ...corsHeaders
                }
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
                    'Access-Control-Allow-Headers': '*'
                }
            }
        )
    }
} 