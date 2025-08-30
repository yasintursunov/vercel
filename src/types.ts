export type GoodItem = {
  price: number;
  quantity: number;
  unit: number;
  discount: number;
  sum_discounted: number;
  nomenclature: number;
};

export type SalePayloadItem = {
  dated: number;                 // unix seconds
  operation: "Заказ";
  tax_included: boolean;
  tax_active: boolean;
  goods: GoodItem[];
  settings: { date_next_created: null };
  loyality_card_id?: number;
  warehouse: number;
  contragent: number;
  paybox: number;
  organization: number;
  status: boolean;               // false=только создать, true=провести
  paid_rubles?: number;
  paid_lt?: number;
};

export type CreateSaleResponse = unknown;
