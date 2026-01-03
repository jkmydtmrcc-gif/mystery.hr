import { type NextRequest, NextResponse } from "next/server"

interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export async function GET(request: NextRequest) {
  try {
    const cartCookie = request.cookies.get("cart")?.value

    let cart: CartItem[] = []
    if (cartCookie) {
      try {
        cart = JSON.parse(decodeURIComponent(cartCookie))
      } catch {
        cart = []
      }
    }

    return NextResponse.json({ cart, success: true })
  } catch (error) {
    console.error("[v0] Cart GET error:", error)
    return NextResponse.json({ cart: [], success: true })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { item } = body

    console.log("[v0] Adding item to cart:", item)

    if (!item || !item.productId) {
      return NextResponse.json({ error: "Invalid item data" }, { status: 400 })
    }

    const cartCookie = request.cookies.get("cart")?.value

    let cart: CartItem[] = []
    if (cartCookie) {
      try {
        cart = JSON.parse(decodeURIComponent(cartCookie))
      } catch {
        cart = []
      }
    }

    const existingIndex = cart.findIndex((i) => i.productId === item.productId)

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += item.quantity || 1
    } else {
      cart.push({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image || "",
      })
    }

    console.log("[v0] Updated cart:", cart)

    const encodedCart = encodeURIComponent(JSON.stringify(cart))

    const response = NextResponse.json({ success: true, cart })

    response.cookies.set("cart", encodedCart, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("[v0] Cart POST error:", error)
    return NextResponse.json({ error: "Greška pri dodavanju u košaricu" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { productId, quantity } = await request.json()
    const cartCookie = request.cookies.get("cart")?.value

    let cart: CartItem[] = []
    if (cartCookie) {
      try {
        cart = JSON.parse(decodeURIComponent(cartCookie))
      } catch {
        cart = []
      }
    }

    if (quantity <= 0) {
      cart = cart.filter((i) => i.productId !== productId)
    } else {
      const index = cart.findIndex((i) => i.productId === productId)
      if (index >= 0) {
        cart[index].quantity = quantity
      }
    }

    const encodedCart = encodeURIComponent(JSON.stringify(cart))

    const response = NextResponse.json({ success: true, cart })
    response.cookies.set("cart", encodedCart, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("[v0] Cart PUT error:", error)
    return NextResponse.json({ error: "Greška pri ažuriranju košarice" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { productId } = await request.json()
    const cartCookie = request.cookies.get("cart")?.value

    let cart: CartItem[] = []
    if (cartCookie) {
      try {
        cart = JSON.parse(decodeURIComponent(cartCookie))
      } catch {
        cart = []
      }
    }

    cart = cart.filter((i) => i.productId !== productId)

    const encodedCart = encodeURIComponent(JSON.stringify(cart))

    const response = NextResponse.json({ success: true, cart })
    response.cookies.set("cart", encodedCart, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("[v0] Cart DELETE error:", error)
    return NextResponse.json({ error: "Greška pri brisanju iz košarice" }, { status: 500 })
  }
}
