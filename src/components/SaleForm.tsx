"use client";

import { useForm } from "react-hook-form";
import type { SalePayloadItem } from "@/types";
import { createDocSale } from "@/lib/api";
import GoodsEditor from "./GoodsEditor";
import { useState } from "react";

type FormValues = {
  phone?: string;
  contragent: number;
  organization: number;
  warehouse: number;
  paybox: number;
  loyality_card_id?: number;
  tax_included: boolean;
  tax_active: boolean;
  paid_rubles?: number;
  paid_lt?: number;
  goods: SalePayloadItem["goods"];
};

export default function SaleForm() {
  const [loading, setLoading] = useState<"create" | "conduct" | null>(null);
  const { register, handleSubmit, control, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      tax_included: true,
      tax_active: true,
      goods: [],
    },
  });

  const onSubmit = (status: boolean) =>
    handleSubmit(async (data) => {
      try {
        setLoading(status ? "conduct" : "create");

        const payload: SalePayloadItem = {
          dated: Math.floor(Date.now() / 1000),
          operation: "Заказ",
          tax_included: data.tax_included,
          tax_active: data.tax_active,
          goods: data.goods,
          settings: { date_next_created: null },
          loyality_card_id: data.loyality_card_id || undefined,
          warehouse: Number(data.warehouse),
          contragent: Number(data.contragent),
          paybox: Number(data.paybox),
          organization: Number(data.organization),
          status,
          paid_rubles: data.paid_rubles || undefined,
          paid_lt: data.paid_lt || undefined,
        };

        const res = await createDocSale([payload]);
        alert("Успех! Документ создан. Ответ API см. в консоли.");
        console.log("API response:", res);
      } catch (e: any) {
        alert(e?.message || "Ошибка запроса");
        console.error(e);
      } finally {
        setLoading(null);
      }
    })();

  // Basit "telefon → contragent" örneği (gerçek arama endpoint'i verilmediği için sadece kopyalıyoruz)
  const doFakePhoneSearch = () => {
    const phone = watch("phone")?.replace(/\D/g, "");
    if (!phone) return;
    // Demo: son 6 haneyi ID gibi kullan
    const id = Number(phone.slice(-6)) || 355176;
    setValue("contragent", id);
    alert(`Поиск по телефону завершён (демо). Установлен contragent=${id}`);
  };

  return (
    <form className="space-y-4">
      {/* Клиент */}
      <div className="rounded-xl border bg-white p-3 shadow-sm">
        <div className="mb-2">
          <label className="label">Телефон клиента</label>
          <div className="mt-1 flex gap-2">
            <input className="input" placeholder="+7..." {...register("phone")} />
            <button type="button" onClick={doFakePhoneSearch} className="rounded-lg border px-3 text-sm">
              Найти
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Контрагент (ID)</label>
            <input className="input" type="number" placeholder="355176" {...register("contragent", { valueAsNumber: true, required: true })}/>
          </div>

          <div>
            <label className="label">Организация (ID)</label>
            <input className="input" type="number" placeholder="38" {...register("organization", { valueAsNumber: true, required: true })}/>
          </div>

          <div>
            <label className="label">Склад (ID)</label>
            <input className="input" type="number" placeholder="39" {...register("warehouse", { valueAsNumber: true, required: true })}/>
          </div>

          <div>
            <label className="label">Касса/Paybox (ID)</label>
            <input className="input" type="number" placeholder="759" {...register("paybox", { valueAsNumber: true, required: true })}/>
          </div>

          <div>
            <label className="label">Карта лояльности (ID, не обязательно)</label>
            <input className="input" type="number" placeholder="22476" {...register("loyality_card_id", { valueAsNumber: true })}/>
          </div>
        </div>
      </div>

      {/* Налоги/оплаты */}
      <div className="rounded-xl border bg-white p-3 shadow-sm">
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("tax_included")} />
            НДС включён
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("tax_active")} />
            НДС активен
          </label>

          <div>
            <label className="label">Оплачено рублями</label>
            <input className="input" type="number" step="0.01" placeholder="476.2" {...register("paid_rubles", { valueAsNumber: true })}/>
          </div>

          <div>
            <label className="label">Оплачено баллами</label>
            <input className="input" type="number" step="0.01" placeholder="23.8" {...register("paid_lt", { valueAsNumber: true })}/>
          </div>
        </div>
      </div>

      {/* Товары */}
      <GoodsEditor control={control} />

      {/* Действия */}
      <div className="flex gap-2">
        <button
          type="button"
          disabled={loading !== null}
          onClick={() => onSubmit(false)}
          className="flex-1 rounded-lg border px-4 py-2"
        >
          {loading === "create" ? "Создание..." : "Только создать"}
        </button>

        <button
          type="button"
          disabled={loading !== null}
          onClick={() => onSubmit(true)}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          {loading === "conduct" ? "Проведение..." : "Создать и провести"}
        </button>
      </div>
    </form>
  );
}
