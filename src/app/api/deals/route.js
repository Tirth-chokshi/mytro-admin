import { NextResponse } from 'next/server'

const deals = [
    {
        id: 1,
        name: 'Shop 1',
        image: 'https://api.mytro.in/storebackend_dev/assets/dist/img/deal_categories/Cafe.jpg',
        banner: 'https://api.mytro.in/storebackend_dev/assets/dist/img/deal_banners/logo(1).png',
        status: 'Active',
        action: 'Edit'
    },
    {
        id: 2,
        name: 'Shop 2',
        image: 'https://api.mytro.in/storebackend_dev/assets/dist/img/deal_categories/Electronics.jpg',
        banner: 'https://api.mytro.in/storebackend_dev/assets/dist/img/deal_banners/4.jpg',
        status: 'Inactive',
        action: 'Edit'
    },
    {
        id: 3,
        name: 'Shop 3',
        image: 'https://api.mytro.in/storebackend_dev/assets/dist/img/deal_categories/Medical1.jpg',
        banner: 'https://api.mytro.in/storebackend_dev/assets/dist/img/deal_banners/hospital.jpg',
        status: 'Active',
        action: 'Edit'
    },
]

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 10

    const search = searchParams.get('search')?.toLowerCase()

    let filteredDeals = deals
    if (search) {
        filteredDeals = deals.filter(deal => 
            deal.name.toLowerCase().includes(search) ||
            deal.status.toLowerCase().includes(search)
        )
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedDeals = filteredDeals.slice(startIndex, endIndex)
    
    const response = {
        data: paginatedDeals,
        pagination: {
            total: filteredDeals.length,
            page,
            limit,
            totalPages: Math.ceil(filteredDeals.length / limit)
        }
    }
    
    return NextResponse.json(response)
}

export async function POST(request) {
    try {
        const body = await request.json()
        
        // Check if required fields exist
        if (!body.name || !body.image || !body.banner) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }
        
        
        const newDeal = {
            id: deals.length + 1,
            name: body.name,
            image: body.image,
            banner: body.banner,
            status: body.status || 'Inactive',
            action: 'Edit'
        }
        
        
        deals.push(newDeal)
        
        return NextResponse.json(newDeal, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        )
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = Number(searchParams.get('id'))
        
        if (!id) {
            return NextResponse.json(
                { error: 'Deal ID is required' },
                { status: 400 }
            )
        }
        
        const dealIndex = deals.findIndex(deal => deal.id === id)
        
        if (dealIndex === -1) {
            return NextResponse.json(
                { error: 'Deal not found' },
                { status: 404 }
            )
        }
        
        deals.splice(dealIndex, 1)
        
        return NextResponse.json(
            { message: 'Deal deleted successfully' },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Error deleting deal' },
            { status: 500 }
        )
    }
}