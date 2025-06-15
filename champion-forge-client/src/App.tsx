
import { useState } from "react";
import type { PracticePlan, Drill } from "./types";
import { usePracticeData } from "./hooks/usePracticeData";
import { calculateDrillTime } from "./utils/time";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Card, CardHeader, CardContent, CardTitle } from "./components/Card";
import { PracticePlanList } from "./components/PracticePlanList";
import { DrillItem } from "./components/DrillItem";
import { AddDrillModal } from "./components/AddDrillModal";
import { DrillLibraryModal } from "./components/DrillLibraryModal";

function App() {
  const { practicePlans, drillLibrary, savePracticePlan, addDrillToLibrary, isLoading } = usePracticeData();
  const [currentPlan, setCurrentPlan] = useState<PracticePlan | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isAddDrillOpen, setIsAddDrillOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const createNewPlan = () => {
    const newPlan: PracticePlan = {
      id: Date.now().toString(),
      name: "New Practice Plan",
      date: new Date().toISOString().split("T")[0],
      startTime: "16:00",
      endTime: "18:00",
      drills: [],
    };
    setCurrentPlan(newPlan);
  };

  const handleSavePlan = () => {
    if (currentPlan) {
      savePracticePlan(currentPlan);
    }
  };

  const addDrillToPlan = (drill: Drill, duration: number) => {
    if (!currentPlan) return;
    const drillWithDuration = { ...drill, duration, id: Date.now().toString() };
    setCurrentPlan({
      ...currentPlan,
      drills: [...currentPlan.drills, drillWithDuration],
    });
  };

  const removeDrillFromPlan = (index: number) => {
    if (!currentPlan) return;
    const updated = [...currentPlan.drills];
    updated.splice(index, 1);
    setCurrentPlan({ ...currentPlan, drills: updated });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || !currentPlan) return;

    const drills = [...currentPlan.drills];
    const draggedDrill = drills[draggedIndex];

    drills.splice(draggedIndex, 1);
    drills.splice(dropIndex, 0, draggedDrill);

    setCurrentPlan({ ...currentPlan, drills });
    setDraggedIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Youth Sports Practice Planner</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsLibraryOpen(true)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>
              Drill Library
            </Button>
            <Button onClick={createNewPlan}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Practice
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Practice Plans List */}
          <PracticePlanList
            plans={practicePlans}
            currentPlan={currentPlan}
            onSelectPlan={setCurrentPlan}
            isLoading={isLoading}
          />

          {/* Practice Editor */}
          <div className="lg:col-span-2">
            {currentPlan ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Practice Plan Editor</CardTitle>
                    <Button size="sm" onClick={handleSavePlan}>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Save Plan
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Practice Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Practice Name"
                        value={currentPlan.name}
                        onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
                      />
                      <Input
                        label="Date"
                        type="date"
                        value={currentPlan.date}
                        onChange={(e) => setCurrentPlan({ ...currentPlan, date: e.target.value })}
                      />
                      <Input
                        label="Start Time"
                        type="time"
                        value={currentPlan.startTime}
                        onChange={(e) => setCurrentPlan({ ...currentPlan, startTime: e.target.value })}
                      />
                      <Input
                        label="End Time"
                        type="time"
                        value={currentPlan.endTime}
                        onChange={(e) => setCurrentPlan({ ...currentPlan, endTime: e.target.value })}
                      />
                    </div>

                    {/* Drills Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Practice Drills</h3>
                        <Button size="sm" onClick={() => setIsAddDrillOpen(true)}>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Drill
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {currentPlan.drills.map((drill, index) => (
                          <DrillItem
                            key={`${drill.id}-${index}`}
                            drill={drill}
                            index={index}
                            startTime={calculateDrillTime(currentPlan.startTime, currentPlan.drills, index)}
                            onRemove={() => removeDrillFromPlan(index)}
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                          />
                        ))}
                        {currentPlan.drills.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            No drills added yet. Click "Add Drill" to get started.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent>
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <svg
                        className="w-12 h-12 mx-auto mb-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6"
                        />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Practice Selected</h3>
                      <p className="text-gray-600 mb-4">
                        Select an existing practice plan or create a new one to get started.
                      </p>
                      <Button onClick={createNewPlan}>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Practice
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Modals */}
        <AddDrillModal
          isOpen={isAddDrillOpen}
          onClose={() => setIsAddDrillOpen(false)}
          drillLibrary={drillLibrary}
          onAddDrill={addDrillToPlan}
          onAddToLibrary={addDrillToLibrary}
        />

        <DrillLibraryModal isOpen={isLibraryOpen} onClose={() => setIsLibraryOpen(false)} drillLibrary={drillLibrary} />
      </div>
    </div>
  );
}

export default App;
