import mongoose, { Schema } from "mongoose";

// ----------------------------------------------------
// --- Definiciones de Esquemas de Inventario y Pedidos ---
// ----------------------------------------------------

const InventoryItemSchema = new Schema(
  {
    _id: { type: String, required: true }, // ID generado por el frontend (UUID)
    name: { type: String, required: true },
    category: String,
    stockByLocation: { type: Map, of: Number },
  },
  { _id: false, timestamps: true }
);

InventoryItemSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret: any) {
    ret.id = ret._id;
    delete ret._id;
  },
});

// 🛑 Reforzamiento de campos requeridos para PurchaseOrderSchema
const PurchaseOrderSchema = new Schema(
  {
    _id: { type: String, required: true }, // ID generado por el frontend (UUID)
    orderDate: { type: String, required: true },
    deliveryDate: String,
    supplierName: { type: String, required: true },
    status: { type: String, required: true },
    totalAmount: Number,
    items: [
      {
        inventoryItemId: { type: String, required: true },
        quantity: { type: Number, required: true, min: 0 },
        costAtTimeOfPurchase: { type: Number, default: 0 }, // Establece default=0 para que no sea requerido si no se envía
      },
    ],
  },
  { _id: false, timestamps: true }
);

PurchaseOrderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret: any) {
    ret.id = ret._id;
    delete ret._id;
  },
});

// Definición del sub-esquema para los ítems del registro de inventario
const InventoryRecordItemSchema = new Schema(
  {
    itemId: String,
    name: String,
    currentStock: Number,
    pendingStock: Number,
    initialStock: Number,
    endStock: Number,
    consumption: Number,
    stockByLocationSnapshot: { type: Map, of: Number },
  },
  { _id: false }
);

// Esquema completo para InventoryRecord
const InventoryRecordSchema = new Schema(
  {
    _id: { type: String, required: true },
    date: String,
    label: String,
    type: String,
    items: [InventoryRecordItemSchema],
  },
  { _id: false, timestamps: true }
);

InventoryRecordSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret: any) {
    ret.id = ret._id;
    delete ret._id;
  },
});

// --- Exportaciones de Modelos ---

export const InventoryItemModel =
  mongoose.models.InventoryItem ||
  mongoose.model("InventoryItem", InventoryItemSchema);
export const PurchaseOrderModel =
  mongoose.models.PurchaseOrder ||
  mongoose.model("PurchaseOrder", PurchaseOrderSchema);
export const InventoryRecordModel =
  mongoose.models.InventoryRecord ||
  mongoose.model("InventoryRecord", InventoryRecordSchema);
