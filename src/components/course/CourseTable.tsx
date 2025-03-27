import { ColumnDef } from "@tanstack/react-table";
import { Course } from "@/types/courses.schema";
import Loader from "@/components/common/Loader";
import { MessageWithLink } from "@/components/common/MesaggeWithLink/MessageWithLink";
import SortableTable from "@/components/common/SortableTable/SortableTable";

interface CourseTableProps {
    isLoading: boolean;
    data: Course[];
    columns: ColumnDef<Course, any>[];
    pageIndex: number;
    pageSize: number;
    setPageIndex: (page: number) => void;
    setPageSize: (size: number) => void;
    refetch: () => void;
    totalPages: number;
}

export function CourseTable({
    isLoading,
    data,
    columns,
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    refetch,
    totalPages
}: CourseTableProps) {
    if (isLoading) return <Loader />;
    if (!data.length)
        return <MessageWithLink
            message="No existen cursos."
            linkText="Crear curso"
            linkUrl="/courses/create"
        />;

    return (
        <SortableTable
            columns={columns} data={data}
            pagination={{ pageIndex, pageSize }}
            totalPages={totalPages}
            onPaginationChange={({ pageIndex, pageSize }) => {
                setPageIndex(pageIndex);
                setPageSize(pageSize);
                refetch();
            }}
        />
    );
}
