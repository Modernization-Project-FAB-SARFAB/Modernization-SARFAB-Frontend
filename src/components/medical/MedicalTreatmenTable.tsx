import Loader from "../common/Loader";
import SortableTable from "../common/SortableTable/SortableTable";
import { NoMedicalTreatmentsMessage } from "./NoMedicalTreatmentsMessage";

export function MedicalTreatmentTable({ isLoading, data, columns, pageIndex, pageSize, setPageIndex, setPageSize, refetch }: MedicalTreatmentTableProps) {
    if (isLoading) return <Loader />;
    if (!data?.data.length) return <NoMedicalTreatmentsMessage />;

    return (
        <SortableTable
            columns={columns} data={data.data}
            pagination={{ pageIndex, pageSize }}
            totalPages={data.totalPages}
            onPaginationChange={({ pageIndex, pageSize }) => {
                setPageIndex(pageIndex);
                setPageSize(pageSize);
                refetch();
            }}
        />
    );
}