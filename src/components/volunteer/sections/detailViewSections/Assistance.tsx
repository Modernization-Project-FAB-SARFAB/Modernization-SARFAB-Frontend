import { RiClipboardFill } from "@remixicon/react";
interface AssistanceProps {
  volunteerId: string;
  totalDemeritPoint: { totalPointsLost: number};
}

const Assistance: React.FC<AssistanceProps> = ({volunteerId, totalDemeritPoint}) => {
  return (
    <div className="flex-row items-center h-full justify-center p-6">
      <div className="px-6 mt-5">
        <h3 className=" dark:text-white text-2xl font-semibold text-black">Cantidad total de faltas</h3>
        <p className="text-gray-500">Total de faltas a operativos y guardias</p>
        <p className="text-title-xxl text-center font-bold text-primary mt-5">  {totalDemeritPoint?.totalPointsLost ?? 0} Faltas</p>
        <div className="flex justify-between items-center mt-6">
          <a href="#" className="text-primary text-lg">Ver registro</a>
          <button className="bg-gray-300 p-3 rounded-lg">
            <RiClipboardFill className="text-gray-700 w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistance;