import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { getVolunteerCompletedCourses } from "@/api/CourseVolunteerAPI";

const DEFAULTS = {
    pageIndex: 1,
    pageSize: 10
};

interface UseVolunteerCompletedCoursesOptions {
    initialVolunteerId?: string;
    initialPageIndex?: number;
    initialPageSize?: number;
}

export function useVolunteerCompletedCourses({
    initialVolunteerId,
    initialPageIndex = DEFAULTS.pageIndex,
    initialPageSize = DEFAULTS.pageSize
}: UseVolunteerCompletedCoursesOptions = {}) {

    const [volunteerId, setVolunteerId] = useState(initialVolunteerId);
    const [debouncedVolunteerId] = useDebounce(volunteerId, 500);

    const [pageIndex, setPageIndex] = useState(initialPageIndex);
    const [pageSize, setPageSize] = useState(initialPageSize);
  
    const { data, isLoading, refetch, isError } = useQuery({
        queryKey: ["volunteerMedicalCheckup", {debouncedVolunteerId, page: pageIndex, pageSize,}],
        queryFn: () => getVolunteerCompletedCourses(Number(debouncedVolunteerId), {page: pageIndex, pageSize}),
        enabled: !!debouncedVolunteerId,
        retry: false,
    });

    return {
        data,
        isLoading,
        isError,
        refetch,
        volunteerId,
        setVolunteerId,

        pageIndex,
        setPageIndex,
        pageSize,
        setPageSize,
    };
}
