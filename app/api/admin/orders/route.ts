import { NextResponse } from "next/server"
import { getCollection, isMongoDBAvailable } from "@/lib/mongodb"
import { getAdminSession } from "@/lib/auth"

const mockOrders = [
  {
    _id: "order-1",
    orderNumber: "MYS-001234",
    customer: {
      name: "Marko Horvat",
      email: "marko@example.com",
      phone: "+385 91 234 5678",
      address: {
        street: "Ilica 100",
        city: "Zagreb",
        postalCode: "10000",
        country: "Hrvatska",
      },
    },
    items: [
      { productId: "1", name: "FCB Lover Box", quantity: 1, price: 50 },
      { productId: "2", name: "Basket Box", quantity: 1, price: 50 },
    ],
    total: 100,
    subtotal: 100,
    discount: 0,
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "card",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "order-2",
    orderNumber: "MYS-001235",
    customer: {
      name: "Ana Kovačević",
      email: "ana@example.com",
      phone: "+385 92 345 6789",
      address: {
        street: "Vukovarska 50",
        city: "Split",
        postalCode: "21000",
        country: "Hrvatska",
      },
    },
    items: [{ productId: "3", name: "Real Box", quantity: 2, price: 50 }],
    total: 100,
    subtotal: 100,
    discount: 0,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "card",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "order-3",
    orderNumber: "MYS-001236",
    customer: {
      name: "Ivan Babić",
      email: "ivan@example.com",
      phone: "+385 98 456 7890",
      address: {
        street: "Europska avenija 10",
        city: "Osijek",
        postalCode: "31000",
        country: "Hrvatska",
      },
    },
    items: [
      { productId: "5", name: "Sport Mix Box", quantity: 1, price: 100 },
      { productId: "10", name: "Dunk Dream Box", quantity: 1, price: 75 },
    ],
    total: 175,
    subtotal: 175,
    discount: 0,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "bank_transfer",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "order-4",
    orderNumber: "MYS-001237",
    customer: {
      name: "Petra Novak",
      email: "petra@example.com",
      phone: "+385 99 567 8901",
      address: {
        street: "Korzo 25",
        city: "Rijeka",
        postalCode: "51000",
        country: "Hrvatska",
      },
    },
    items: [{ productId: "15", name: "Home Luxury Box", quantity: 1, price: 75 }],
    total: 75,
    subtotal: 75,
    discount: 0,
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "cod",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "order-5",
    orderNumber: "MYS-001238",
    customer: {
      name: "Luka Jurić",
      email: "luka@example.com",
      phone: "+385 91 678 9012",
      address: {
        street: "Radnička cesta 80",
        city: "Zagreb",
        postalCode: "10000",
        country: "Hrvatska",
      },
    },
    items: [
      { productId: "20", name: "Rock with You Box", quantity: 1, price: 50 },
      { productId: "21", name: "Hip Hop Classic Box", quantity: 1, price: 75 },
    ],
    total: 125,
    subtotal: 125,
    discount: 0,
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "card",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export async function GET(request: Request) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    if (!isMongoDBAvailable()) {
      let filteredOrders = [...mockOrders]

      if (status && status !== "all") {
        filteredOrders = filteredOrders.filter((o) => o.status === status)
      }

      if (search) {
        const searchLower = search.toLowerCase()
        filteredOrders = filteredOrders.filter(
          (o) =>
            o.orderNumber.toLowerCase().includes(searchLower) ||
            o.customer.name.toLowerCase().includes(searchLower) ||
            o.customer.email.toLowerCase().includes(searchLower),
        )
      }

      const start = (page - 1) * limit
      const paginatedOrders = filteredOrders.slice(start, start + limit)

      return NextResponse.json({
        orders: paginatedOrders,
        total: filteredOrders.length,
        totalPages: Math.ceil(filteredOrders.length / limit),
        currentPage: page,
      })
    }

    const orders = await getCollection("orders")
    if (!orders) {
      return NextResponse.json({
        orders: mockOrders,
        total: mockOrders.length,
        totalPages: 1,
        currentPage: 1,
      })
    }

    const query: Record<string, unknown> = {}

    if (status && status !== "all") {
      query.status = status
    }

    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: "i" } },
        { "customer.name": { $regex: search, $options: "i" } },
        { "customer.email": { $regex: search, $options: "i" } },
      ]
    }

    const skip = (page - 1) * limit

    const [ordersList, total] = await Promise.all([
      orders.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
      orders.countDocuments(query),
    ])

    return NextResponse.json({
      orders: ordersList,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    console.error("Orders error:", error)
    return NextResponse.json({
      orders: mockOrders,
      total: mockOrders.length,
      totalPages: 1,
      currentPage: 1,
    })
  }
}
