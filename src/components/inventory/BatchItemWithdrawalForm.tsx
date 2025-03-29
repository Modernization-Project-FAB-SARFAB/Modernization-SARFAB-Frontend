import { useState } from "react";
import BackLink from "../common/BackLink/BackLink";
import Button from "../common/Button/Button";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import FilterDatalist from "../common/FilterDatalist/FilterDatalist";
import { useVolunteersWithRank } from "@/hooks/inventory/querys/useVolunteersWithRank";
import { useAllItems } from "@/hooks/inventory/querys/useAllItems";
import { MovementDetail } from "@/types/invetory.schema";
import { useRegisterBatchWithdrawal } from "@/hooks/inventory/mutations/useRegisterBatchWithdrawal";
import { useNavigate } from "react-router-dom";

export default function BatchItemWithdrawalForm() {
  const { data: volunteers } = useVolunteersWithRank();
  const { data: items } = useAllItems();
  const { mutate, isPending } = useRegisterBatchWithdrawal();

  const volunteerOptions = volunteers?.map(v => ({
    id: v.volunteerId,
    name: `${v.abbreviation} ${v.lastName} ${v.firstName}`,
  })) ?? [];

  const itemOptions = items?.map(i => ({
    id: i.itemId,
    name: i.name,
  })) ?? [];

  const navigate = useNavigate();

  const [selectedVolunteerName, setSelectedVolunteerName] = useState('');
  const [selectedItemName, setSelectedItemName] = useState('');
  const [selectedItems, setSelectedItems] = useState<MovementDetail[]>([]);

  const handleAddItem = () => {
    const selected = itemOptions.find(i => i.name === selectedItemName);
    if (!selected) return;

    const exists = selectedItems.some(i => i.itemId === selected.id);
    if (exists) return;

    setSelectedItems(prev => [...prev, { itemId: selected.id, quantity: 1 }]);
    setSelectedItemName('');
  };

  const updateQuantity = (itemId: number, delta: number) => {
    setSelectedItems(prev =>
      prev.map(item =>
        item.itemId === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setSelectedItems(prev => prev.filter(item => item.itemId !== itemId));
  };

  const handleSubmit = () => {
    const selectedVolunteer = volunteerOptions.find(v => v.name === selectedVolunteerName);
    if (!selectedVolunteer) return;

    const payload = {
      volunteerId: selectedVolunteer.id,
      items: selectedItems,
    };

    mutate(payload, {
      onSuccess: () => {
        navigate("/inventory/list");
      },
    });
  };
  const filteredItemOptions = itemOptions.filter(
    (item) => !selectedItems.some((selected) => selected.itemId === item.id)
  );  

  return (
    <form>
      <section className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark mb-6">
        <BackLink
          text="Volver al listado de elementos"
          link="/inventory/list"
          className="text-[13.5px] pl-0"
        />

        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white mt-4">
          Registro de extracción
        </h2>

        <div className="flex-1 mb-4">
          <FilterDatalist
            name="volunteer"
            label="Seleccionar un voluntario"
            options={volunteerOptions}
            onChange={(val) => setSelectedVolunteerName(val)}
            value={selectedVolunteerName}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-end mb-4">
          <div className="flex-1">
            <FilterDatalist
              name="item"
              label="Seleccionar un elemento"
              options={filteredItemOptions}
              onChange={(val) => setSelectedItemName(val)}
              value={selectedItemName}
            />
          </div>
          <div className="sm:flex-none mt-2 sm:mt-0">
            <Button
              label="Agregar"
              onClick={handleAddItem}
              variant="primary"
              disabled={!selectedItemName}
            />
          </div>
        </div>

        <div className="mt-4 border border-stroke dark:border-strokedark rounded-md overflow-x-auto">
          <table className="w-full table-auto text-center border-collapse border border-stroke dark:border-strokedark">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4 border border-stroke dark:border-strokedark">
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Elemento
                </th>
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Cantidad
                </th>
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-sm text-gray-500">
                    Aún no hay elementos seleccionados.
                  </td>
                </tr>
              ) : (
                selectedItems.map(item => {
                  const itemName = itemOptions.find(i => i.id === item.itemId)?.name ?? "—";
                  return (
                    <tr key={item.itemId} className="border border-stroke dark:border-strokedark">
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">{itemName}</td>
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            type="button" 
                            onClick={() => updateQuantity(item.itemId, +1)}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                          >
                            +
                          </button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <button 
                            type="button" 
                            onClick={() => updateQuantity(item.itemId, -1)}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                        <button 
                          type="button" 
                          onClick={() => removeItem(item.itemId)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </section>

      <section>
        <ButtonGroup
          buttons={[
            {
              type: 'button',
              label: 'Registrar extracción',
              onClick: handleSubmit,
              variant: 'primary',
              disabled: !selectedVolunteerName || selectedItems.length === 0,
              isLoading: isPending,
            },
            { type: 'link', label: 'Cancelar', to: '/inventory/list' },
          ]}
        />
      </section>
    </form>
  );
}
