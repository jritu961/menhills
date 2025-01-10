import mongoose from "mongoose";

// Add-Ons Schema
const AddOnsSchema = new mongoose.Schema(
  { id: { type: String, required: true } },
  { _id: false }
);

// Organization Schema
const OrganizationSchema = new mongoose.Schema(
  { 
    name: { type: String },
    cred: { type: String }
  },
  { _id: false }
);

// Address Schema
const AddressSchema = new mongoose.Schema(
  {
    door: { type: String },
    name: { type: String },
    building: { type: String },
    street: { type: String },
    locality: { type: String },
    ward: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    areaCode: { type: String },
  },
  { _id: false }
);

// Time Range Schema
const TimeRangeSchema = new mongoose.Schema(
  { start: { type: Date }, end: { type: Date } },
  { _id: false }
);

// Time Schema
const TimeSchema = new mongoose.Schema(
  {
    label: { type: String },
    timestamp: { type: Date, default: Date.now },
    duration: { type: String },
    range: { type: TimeRangeSchema },
    days: { type: String },
  },
  { _id: false }
);

// Billing Schema
const BillingSchema = new mongoose.Schema(
  {
    id: String,
    name: { type: String, required: true },
    phone: { type: String, required: true },
    organization: { type: OrganizationSchema },
    address: { type: AddressSchema },
    email: { type: String },
    time: { type: TimeSchema },
    taxNumber: { type: String },
    locationId: { type: String },
    updated_at: { type: String },
    created_at: { type: String },
  },
  { _id: false }
);

// Payment Schema (Updated for consistency)
const PaymentSchema = new mongoose.Schema(
  {
    uri: { type: String },
    razorpayPaymentId: { type: String },
    tlMethod: { type: String, enum: ['http/get', 'http/post'] },
    params: { type: Map },
    type: { type: String, enum: ['ON-ORDER', 'PRE-FULFILLMENT', 'ON-FULFILLMENT', 'POST-FULFILLMENT'] },
    status: { type: String, enum: ['PAID', 'NOT-PAID'], default: 'NOT-PAID' },
    time: { type: TimeSchema },
  },
  { _id: false }
);

// Fulfillment Schema
const FulfillmentSchema = new mongoose.Schema(
  {
    providerId: { type: String, required: true },
    trackingId: { type: String },
    deliveryDate: { type: Date },
    status: { type: String, enum: ['PENDING', 'IN_TRANSIT', 'DELIVERED', 'FAILED'] },
  },
  { _id: false }
);
const ItemSchema = new mongoose.Schema(
  {
    item_id: { type: String, required: true },
    name: { type: String, required: true },
    images: { type: [String] }, // Array of image URLs
    count: { type: Number, required: true, min: 1 }, // Quantity of the item
    price: { type: mongoose.Decimal128, required: true }, // Price of the item
    size: { type: String }, // Optional size field
    color: { type: String }, // Optional color field
  },
  { _id: false } // Avoid creating separate _id for each item
);
// Order Schema
const OrderSchema = new mongoose.Schema(
  {
    payment_origin_source: { type: String, required: true },
    payment_return_destination: { type: String, required: true },
    addOns: { type: [AddOnsSchema] },
    billing: { type: BillingSchema },
    fulfillments: { type: [FulfillmentSchema] },
    quote: { type: Object },
    updatedQuote: { type: Object },
    payment: { type: PaymentSchema },
    id: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    userId: { type: String, required: true },
    deviceId: { type: String },
    transactionId: { type: String, required: true },
    messageId: { type: String },
    parentOrderId: { type: String },
    paymentStatus: { type: String, enum: ['PAID', 'NOT-PAID'], default: 'NOT-PAID' },
    bppId: { type: String },
    bpp_uri: { type: String },
    bapOrderId: { type: String },
    settlementDetails: { type: Object },
    tags: { type: Object },
    price:{type: Number},
    domain: { type: String },
    documents: { type: Object },
    image:{type:String},
    settle_status: { type: String },
    is_order_confirmed: { type: Boolean, default: false },
    is_settlement_sent: { type: Boolean, default: false },
    is_settlement_done: { type: Boolean, default: false },
    is_settlement_receiver_verified: { type: Boolean },
    settlement_id: { type: String },
    settlement_reference_no: { type: String },
    order_recon_status: { type: String },
    refunded_amount: { type: mongoose.Decimal128, default: 0 },
    counterparty_recon_status: { type: String },
    counterparty_diff_amount_value: { type: mongoose.Decimal128 },
    counterparty_diff_amount_currency: { type: String },
    receiver_settlement_message: { type: String },
    receiver_settlement_message_code: { type: String },
    feedback_sent: { type: Boolean, default: false },
    buyer_state: { type: String, default: "unconfirmed" },
    remaining_cart_value: { type: mongoose.Decimal128 },
    items: { type: [ItemSchema], required: true }, // Embedding the ItemSchema

  },
  { _id: true, timestamps: true }
);

// Add Indexing on frequently queried fields
OrderSchema.index({ userId: 1, createdAt: -1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ transactionId: 1 });

const Order = mongoose.model('Order', OrderSchema, "order");

export default Order;
