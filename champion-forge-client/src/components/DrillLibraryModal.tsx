
import type { Drill } from "@/types";
import { Modal } from "./Modal";
import { Badge } from "./Badge";

interface DrillLibraryModalProps {
  isOpen: boolean
  onClose: () => void
  drillLibrary: Drill[]
}

export const DrillLibraryModal: React.FC<DrillLibraryModalProps> = ({ isOpen, onClose, drillLibrary }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Drill Library" size="lg">
      <p className="text-gray-600 mb-4">Manage your collection of drills. These can be added to any practice plan.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {drillLibrary.map((drill) => (
          <div key={drill.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-900">{drill.name}</h4>
              <Badge variant="secondary">{drill.category}</Badge>
            </div>
            <p className="text-sm text-gray-600">{drill.description}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};
