export type View = "inventory" | "orders" | "analysis" | "history";
export enum PurchaseOrderStatus {
  Pending = "Pending",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Archived = "Archived",
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stockByLocation: { [key: string]: number };
}

export interface OrderItem {
  inventoryItemId: string;
  quantity: number;
  costAtTimeOfPurchase: number;
}

export interface PurchaseOrder {
  id: string;
  orderDate: string;
  deliveryDate?: string;
  supplierName: string;
  items: OrderItem[];
  status: PurchaseOrderStatus;
  totalAmount: number;
}

// MODIFICADO PARA SOPORTAR DESGLOSE POR UBICACIÓN
export interface InventoryRecordItem {
  itemId: string;
  name: string;
  currentStock: number;
  pendingStock: number;
  initialStock: number;
  endStock: number;
  consumption: number;
  stockByLocationSnapshot?: { [key: string]: number }; // NUEVO: para guardar el detalle del Snapshot
}

// MODIFICADO PARA DIFERENCIAR EL TIPO DE REGISTRO
export interface InventoryRecord {
  id: string;
  date: string;
  label: string; // <<-- CORRECCIÓN AÑADIDA
  items: InventoryRecordItem[];
  type?: "snapshot" | "analysis"; // NUEVO: para diferenciar el tipo de registro
}
