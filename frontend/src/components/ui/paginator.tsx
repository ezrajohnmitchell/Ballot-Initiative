import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginatorProps {
    page: number;
    max: number;
    min: number;
    onPageChange?: (page: number) => void;
}

function Paginator({ page, max, min = 0, onPageChange }: PaginatorProps) {
    const boxSize = "border-gray-500 rounded-xs w-7 h-7 flex items-center justify-center"

    return (
        <div className="flex flex-row justify-center items-center gap-4 p-4">
            <div className={cn(boxSize, page > min && "hover:cursor-pointer hover:bg-blue-200 transition-all duration-300 ease-in-out")} >
                {page > min && <ChevronLeft onClick={() => onPageChange?.(page - 1)} />}
            </div>
            <span className={cn(boxSize, "border-1")}>{page}</span>
            <div className={cn(boxSize, page < max && "hover:cursor-pointer hover:bg-blue-200 transition-all duration-300 ease-in-out")} >
                {page < max && <ChevronRight onClick={() => onPageChange?.(page + 1)} />}
            </div>
        </div >
    )
}

export { Paginator }