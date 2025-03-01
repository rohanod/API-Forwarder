import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
    try {
        const url = new URL(request.url)
        const { searchParams } = url
        const headers = searchParams.get('headers')
        const apiKey = searchParams.get('key')
        
        // Remove the API key from the original URL to prevent it from being logged
        if (apiKey) searchParams.delete('key')
        
        // Construct the target URL properly
        const pathParts = (await params).path
        const targetPath = pathParts.join('/')
        
        // Create the target URL and preserve all original query params except 'headers' and 'key'
        const targetUrl = new URL(targetPath.startsWith('http') ? targetPath : `https://${targetPath}`)
        
        // Copy all other query parameters except headers, which we handle separately
        for (const [key, value] of searchParams.entries()) {
            if (key !== 'headers') {
                targetUrl.searchParams.set(key, value)
            }
        }
        
        // Add API key to target URL if provided
        if (apiKey) targetUrl.searchParams.set('key', apiKey)
        
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
        
        // Log request details (but hide the API key)
        const targetUrlString = targetUrl.toString()
        console.log('Forwarding GET to:', targetUrlString.replace(apiKey || '', '****'))
        console.log('Headers:', Object.fromEntries(forwardHeaders.entries()))
        
        const response = await fetch(targetUrlString, {
            headers: forwardHeaders,
            signal: AbortSignal.timeout(120000) // 2 minute timeout
        })
        
        const contentType = response.headers.get('content-type')
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': contentType || 'application/json'
        }
        
        // Log the response status and any error details
        console.log('Response status:', response.status)
        if (response.status >= 400) {
            const errorText = await response.text()
            console.error('Error response:', errorText)
            
            try {
                const errorJson = JSON.parse(errorText)
                return NextResponse.json(errorJson, {
                    status: response.status,
                    headers: corsHeaders
                })
            } catch {
                return new NextResponse(errorText, {
                    status: response.status,
                    headers: corsHeaders
                })
            }
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
        const url = new URL(request.url)
        const { searchParams } = url
        const headers = searchParams.get('headers')
        const data = searchParams.get('d')
        const apiKey = searchParams.get('key')
        
        // Remove the API key from the original URL to prevent it from being logged
        if (apiKey) searchParams.delete('key')
        
        // Construct the target URL properly
        const pathParts = (await params).path
        const targetPath = pathParts.join('/')
        
        // Create the target URL and preserve all original query params except 'headers', 'd', and 'key'
        const targetUrl = new URL(targetPath.startsWith('http') ? targetPath : `https://${targetPath}`)
        
        // Copy all other query parameters except headers and d, which we handle separately
        for (const [key, value] of searchParams.entries()) {
            if (key !== 'headers' && key !== 'd') {
                targetUrl.searchParams.set(key, value)
            }
        }
        
        // Add API key to target URL if provided
        if (apiKey) targetUrl.searchParams.set('key', apiKey)
        
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
        
        let bodyString
        
        if (data) {
            try {
                const body = JSON.parse(decodeURIComponent(data))
                bodyString = JSON.stringify(body)
            } catch (e) {
                // If parsing fails, use the raw data string
                bodyString = decodeURIComponent(data)
            }
        } else {
            try {
                const rawBody = await request.text()
                try {
                    JSON.parse(rawBody); // Test if it's valid JSON
                    bodyString = rawBody;
                } catch {
                    bodyString = rawBody;
                }
            } catch (e) {
                bodyString = null;
            }
        }
        
        // Log request details (but hide the API key)
        const targetUrlString = targetUrl.toString()
        console.log('Forwarding POST to:', targetUrlString.replace(apiKey || '', '****'))
        console.log('Headers:', Object.fromEntries(forwardHeaders.entries()))
        console.log('Body (truncated):', bodyString?.substring(0, 500) + (bodyString && bodyString.length > 500 ? '...' : ''))
        
        const response = await fetch(targetUrlString, {
            method: 'POST',
            headers: forwardHeaders,
            body: bodyString,
            signal: AbortSignal.timeout(120000) // 2 minute timeout
        })
        
        const contentType = response.headers.get('content-type')
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': contentType || 'application/json'
        }
        
        // Log the response status
        console.log('Response status:', response.status)
        
        if (response.status >= 400) {
            const errorText = await response.text()
            console.error('Error response:', errorText)
            
            try {
                const errorJson = JSON.parse(errorText)
                return NextResponse.json(errorJson, {
                    status: response.status,
                    headers: corsHeaders
                })
            } catch {
                return new NextResponse(errorText, {
                    status: response.status,
                    headers: corsHeaders
                })
            }
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
        const url = new URL(request.url)
        const { searchParams } = url
        const headers = searchParams.get('headers')
        const data = searchParams.get('d')
        const apiKey = searchParams.get('key')
        
        // Remove the API key from the original URL to prevent it from being logged
        if (apiKey) searchParams.delete('key')
        
        // Construct the target URL properly
        const pathParts = (await params).path
        const targetPath = pathParts.join('/')
        
        // Create the target URL and preserve all original query params except 'headers', 'd', and 'key'
        const targetUrl = new URL(targetPath.startsWith('http') ? targetPath : `https://${targetPath}`)
        
        // Copy all other query parameters except headers and d, which we handle separately
        for (const [key, value] of searchParams.entries()) {
            if (key !== 'headers' && key !== 'd') {
                targetUrl.searchParams.set(key, value)
            }
        }
        
        // Add API key to target URL if provided
        if (apiKey) targetUrl.searchParams.set('key', apiKey)
        
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
        
        let bodyString
        
        if (data) {
            try {
                const body = JSON.parse(decodeURIComponent(data))
                bodyString = JSON.stringify(body)
            } catch (e) {
                // If parsing fails, use the raw data string
                bodyString = decodeURIComponent(data)
            }
        } else {
            try {
                const rawBody = await request.text()
                try {
                    JSON.parse(rawBody); // Test if it's valid JSON
                    bodyString = rawBody;
                } catch {
                    bodyString = rawBody;
                }
            } catch (e) {
                bodyString = null;
            }
        }
        
        // Log request details (but hide the API key)
        const targetUrlString = targetUrl.toString()
        console.log('Forwarding PUT to:', targetUrlString.replace(apiKey || '', '****'))
        console.log('Headers:', Object.fromEntries(forwardHeaders.entries()))
        console.log('Body (truncated):', bodyString?.substring(0, 500) + (bodyString && bodyString.length > 500 ? '...' : ''))
        
        const response = await fetch(targetUrlString, {
            method: 'PUT',
            headers: forwardHeaders,
            body: bodyString,
            signal: AbortSignal.timeout(120000) // 2 minute timeout
        })
        
        const contentType = response.headers.get('content-type')
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': contentType || 'application/json'
        }
        
        // Log the response status
        console.log('Response status:', response.status)
        
        if (response.status >= 400) {
            const errorText = await response.text()
            console.error('Error response:', errorText)
            
            try {
                const errorJson = JSON.parse(errorText)
                return NextResponse.json(errorJson, {
                    status: response.status,
                    headers: corsHeaders
                })
            } catch {
                return new NextResponse(errorText, {
                    status: response.status,
                    headers: corsHeaders
                })
            }
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
        const url = new URL(request.url)
        const { searchParams } = url
        const headers = searchParams.get('headers')
        const apiKey = searchParams.get('key')
        
        // Remove the API key from the original URL to prevent it from being logged
        if (apiKey) searchParams.delete('key')
        
        // Construct the target URL properly
        const pathParts = (await params).path
        const targetPath = pathParts.join('/')
        
        // Create the target URL and preserve all original query params except 'headers' and 'key'
        const targetUrl = new URL(targetPath.startsWith('http') ? targetPath : `https://${targetPath}`)
        
        // Copy all other query parameters except headers, which we handle separately
        for (const [key, value] of searchParams.entries()) {
            if (key !== 'headers') {
                targetUrl.searchParams.set(key, value)
            }
        }
        
        // Add API key to target URL if provided
        if (apiKey) targetUrl.searchParams.set('key', apiKey)
        
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
        
        // Log request details (but hide the API key)
        const targetUrlString = targetUrl.toString()
        console.log('Forwarding DELETE to:', targetUrlString.replace(apiKey || '', '****'))
        console.log('Headers:', Object.fromEntries(forwardHeaders.entries()))
        
        const response = await fetch(targetUrlString, {
            method: 'DELETE',
            headers: forwardHeaders,
            signal: AbortSignal.timeout(120000) // 2 minute timeout
        })
        
        const contentType = response.headers.get('content-type')
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': contentType || 'application/json'
        }
        
        // Log the response status
        console.log('Response status:', response.status)
        
        if (response.status >= 400) {
            const errorText = await response.text()
            console.error('Error response:', errorText)
            
            try {
                const errorJson = JSON.parse(errorText)
                return NextResponse.json(errorJson, {
                    status: response.status,
                    headers: corsHeaders
                })
            } catch {
                return new NextResponse(errorText, {
                    status: response.status,
                    headers: corsHeaders
                })
            }
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