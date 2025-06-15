
import { useState } from "react";
import type { Drill } from "../types";
import { DRILL_CATEGORIES } from "../constants";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Select } from "./Select";
import { Tabs } from "./Tabs";

interface AddDrillModalProps {
  isOpen: boolean
  onClose: () => void
  drillLibrary: Drill[]
  onAddDrill: (drill: Drill, duration: number) => void
  onAddToLibrary: (drill: Omit<Drill, "id">) => void
}

export const AddDrillModal: React.FC<AddDrillModalProps> = ({
  isOpen,
  onClose,
  drillLibrary,
  onAddDrill,
  onAddToLibrary,
}) => {
  const [selectedDrill, setSelectedDrill] = useState("");
  const [duration, setDuration] = useState(10);
  const [newDrill, setNewDrill] = useState({
    name: "",
    description: "",
    category: "Skills",
  });

  const handleAddExisting = () => {
    const drill = drillLibrary.find((d) => d.id === selectedDrill);
    if (drill) {
      onAddDrill(drill, duration);
      onClose();
      setSelectedDrill("");
      setDuration(10);
    }
  };

  const handleCreateNew = () => {
    if (newDrill.name.trim()) {
      onAddToLibrary(newDrill);
      onAddDrill({ ...newDrill, id: Date.now().toString() }, duration);
      onClose();
      setNewDrill({ name: "", description: "", category: "Skills" });
      setDuration(10);
    }
  };

  const drillOptions = drillLibrary.map((drill) => ({
    value: drill.id,
    label: `${drill.name} (${drill.category})`,
  }));

  const categoryOptions = DRILL_CATEGORIES.map((category) => ({
    value: category,
    label: category,
  }));

  const tabs = [
    {
      id: "existing",
      label: "From Library",
      content: (
        <div className="space-y-4">
          <Select
            label="Select Drill"
            value={selectedDrill}
            onChange={(e) => setSelectedDrill(e.target.value)}
            options={[{ value: "", label: "Choose a drill from library" }, ...drillOptions]}
          />
          <Input
            label="Duration (minutes)"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min="1"
            max="120"
          />
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleAddExisting} disabled={!selectedDrill}>
              Add Drill
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "new",
      label: "Create New",
      content: (
        <div className="space-y-4">
          <Input
            label="Drill Name"
            value={newDrill.name}
            onChange={(e) => setNewDrill({ ...newDrill, name: e.target.value })}
            placeholder="Enter drill name"
          />
          <Textarea
            label="Description"
            value={newDrill.description}
            onChange={(e) => setNewDrill({ ...newDrill, description: e.target.value })}
            placeholder="Describe the drill"
          />
          <Select
            label="Category"
            value={newDrill.category}
            onChange={(e) => setNewDrill({ ...newDrill, category: e.target.value })}
            options={categoryOptions}
          />
          <Input
            label="Duration (minutes)"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min="1"
            max="120"
          />
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCreateNew} disabled={!newDrill.name.trim()}>
              Add Drill
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Drill to Practice" size="md">
      <Tabs tabs={tabs} defaultTab="existing" />
    </Modal>
  );
};
