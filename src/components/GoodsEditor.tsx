"use client";

import { useFieldArray, Control } from "react-hook-form";

type Props = {
  control: Control<any>;
};

export default function GoodsEditor({ control }: Props) {
  const { fields, append, remove } = useFieldArray({ control, name: "goods" });

  return (
    <div className="rounded-xl border bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-medium">Товары</h3>
        <button
          type="button"
          onClick={() =>
            append({ price: 0, quantity: 1, unit: 116, discount: 0, sum_discounted: 0, nomenclature: 0 })
          }
          className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white"
        >
          Добавить
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="grid grid-cols-2 gap-2 rounded-lg border p-2">
            <input className="input" type="number" placeholder="ID номенклатуры"
              {...(control.register as any)(`goods.${i}.nomenclature`, { valueAsNumber: true })}/>
            <input className="input" type="number" placeholder="Цена"
              {...(control.register as any)(`goods.${i}.price`, { valueAsNumber: true })}/>
            <input className="input" type="number" placeholder="Кол-во"
              {...(control.register as any)(`goods.${i}.quantity`, { valueAsNumber: true })}/>
            <input className="input" type="number" placeholder="Ед. изм. (unit id)"
              {...(control.register as any)(`goods.${i}.unit`, { valueAsNumber: true })}/>
            <input className="input" type="number" placeholder="Скидка"
              {...(control.register as any)(`goods.${i}.discount`, { valueAsNumber: true })}/>
            <input className="input" type="number" placeholder="Сумма со скидкой"
              {...(control.register as any)(`goods.${i}.sum_discounted`, { valueAsNumber: true })}/>
            <div className="col-span-2 text-right">
              <button type="button" onClick={() => remove(i)} className="text-sm text-red-600">Удалить</button>
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <p className="rounded-lg bg-zinc-50 p-2 text-center text-sm text-zinc-500">
            Пока нет строк. Добавьте товар.
          </p>
        )}
      </div>
    </div>
  );
}
