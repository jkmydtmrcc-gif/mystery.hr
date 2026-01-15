import crypto from "crypto"

interface CorvusPayConfig {
  storeId: string
  secretKey: string
  version: string
  language: string
  currency: string
  requireComplete: boolean
}

interface PaymentParams {
  orderNumber: string
  amount: number
  cart: string
  customerFirstName: string
  customerLastName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  customerCity: string
  customerZipCode: string
  customerCountry: string
}

const config: CorvusPayConfig = {
  storeId: process.env.CORVUSPAY_STORE_ID || "",
  secretKey: process.env.CORVUSPAY_SECRET_KEY || "",
  version: "1.4",
  language: "hr",
  currency: "EUR",
  requireComplete: true,
}

export function generateSignature(params: Record<string, string>): string {
  const sortedKeys = Object.keys(params).sort()
  const signatureString = sortedKeys.map((key) => `${key}${params[key]}`).join("")

  return crypto.createHmac("sha256", config.secretKey).update(signatureString).digest("hex")
}

export function verifySignature(params: Record<string, string>, receivedSignature: string): boolean {
  const calculatedSignature = generateSignature(params)
  return calculatedSignature === receivedSignature
}

export function createPaymentForm(params: PaymentParams): {
  action: string
  fields: Record<string, string>
} {
  const baseUrl = process.env.NODE_ENV === "production" ? "https://cps.corvus.hr" : "https://test-cps.corvus.hr"

  const amountFormatted = params.amount.toFixed(2)

  const formFields: Record<string, string> = {
    version: config.version,
    store_id: config.storeId,
    order_number: params.orderNumber,
    language: config.language,
    currency: config.currency,
    amount: amountFormatted,
    cart: params.cart,
    require_complete: config.requireComplete ? "true" : "false",
    cardholder_name: params.customerFirstName,
    cardholder_surname: params.customerLastName,
    cardholder_email: params.customerEmail,
    cardholder_phone: params.customerPhone,
    cardholder_address: params.customerAddress,
    cardholder_city: params.customerCity,
    cardholder_zip_code: params.customerZipCode,
    cardholder_country: params.customerCountry,
  }

  const signature = generateSignature(formFields)
  formFields.signature = signature

  return {
    action: `${baseUrl}/redirect/`,
    fields: formFields,
  }
}

export function parseNotification(body: Record<string, string>): {
  isValid: boolean
  orderNumber: string
  status: "approved" | "declined" | "error"
  approvalCode?: string
  transactionId?: string
} {
  const { signature, ...params } = body

  const isValid = verifySignature(params, signature)

  let status: "approved" | "declined" | "error" = "error"
  if (params.approval_code && params.approval_code !== "000000") {
    status = "approved"
  } else if (params.response_code === "00") {
    status = "approved"
  } else {
    status = "declined"
  }

  return {
    isValid,
    orderNumber: params.order_number,
    status,
    approvalCode: params.approval_code,
    transactionId: params.transaction_id,
  }
}
