import { NextResponse } from "next/server";
import products from "../../db/products.json";
import fs from 'fs';

export async function GET(request, { params }) {
    try {
        const id = parseInt(params.id);
        const product = products.find((p) => p.id === id);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const id = parseInt(params.id);
        const body = await request.json();
        const { name, price, img } = body;

        if (!name || !price || !img) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Update product
        products[index] = { id, name, price, img };

        // Saqlash uchun JSON faylni yangilash
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

        return NextResponse.json(products[index], { status: 200 });
    } catch (error) {
        console.error('PUT error:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id);
        const index = products.findIndex((p) => p.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const removed = products.splice(index, 1)[0];
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

        return NextResponse.json({ success: true, removed }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
