
import type { Drill } from "@/types";
import { Badge } from "./Badge";
import { Button } from "./Button";

interface DrillItemProps {
  drill: Drill
  index: number
  startTime: string
  onRemove: () => void
  onDragStart: () => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
}

export const DrillItem: React.FC<DrillItemProps> = ({
  drill,
  startTime,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <div
      className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm cursor-move"
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="flex-shrink-0">
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-gray-900">{drill.name}</span>
          <Badge variant="secondary">{drill.category}</Badge>
        </div>
        <p className="text-sm text-gray-600">{drill.description}</p>
      </div>

      <div className="text-right flex-shrink-0">
        <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {startTime}
        </div>
        <div className="text-xs text-gray-500">{drill.duration} min</div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onRemove}
        className="flex-shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </Button>
    </div>
  );
};
