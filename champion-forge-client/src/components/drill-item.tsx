import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Trash2, GripVertical } from "lucide-react";
import type { Drill } from "@/types/practice";

interface DrillItemProps {
  drill: Drill
  index: number
  startTime: string
  onRemove: () => void
  onDragStart: () => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
}

export function DrillItem({ drill, startTime, onRemove, onDragStart, onDragOver, onDrop }: DrillItemProps) {
  if (!drill) return null;

  return (
    <div
      className="flex items-center gap-3 p-3 border rounded-lg bg-card"
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">{drill.name || "Unnamed Drill"}</span>
          <Badge variant="secondary" className="text-xs">
            {drill.category || "Other"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{drill.description || "No description"}</p>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-1 text-sm font-medium">
          <Clock className="w-3 h-3" />
          {startTime}
        </div>
        <div className="text-xs text-muted-foreground">{drill.duration || 0} min</div>
      </div>
      <Button size="sm" variant="ghost" onClick={onRemove}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
