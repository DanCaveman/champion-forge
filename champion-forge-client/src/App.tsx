import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import type { PracticePlan } from "@/types/practice";

export default function App() {  
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
const [currentPlan, setCurrentPlan] = useState<PracticePlan | null>(null)

  const createNewPlan = () => {
    const newPlan: PracticePlan = {
      id: Date.now().toString(),
      name: "New Practice Plan",
      date: new Date().toISOString().split("T")[0],
      startTime: "16:00",
      endTime: "18:00",
      drills: [],
    }
    setCurrentPlan(newPlan)
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Champion Forge Practice Planner</h1>
         <div className="flex gap-2">
          <Dialog open={isLibraryOpen} onOpenChange={setIsLibraryOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                {/* <Library className="w-4 h-4 mr-2" /> */}
                Drill Library
              </Button>
            </DialogTrigger>
            {/* <DrillLibraryDialog drillLibrary={drillLibrary} /> */}
          </Dialog>
          <Button variant="outline" onClick={createNewPlan}>
        {/*    <Plus className="w-4 h-4 mr-2" />*/}
            New Practice
          </Button>
        </div> 
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* <PracticePlanList plans={practicePlans} currentPlan={currentPlan} onSelectPlan={setCurrentPlan} />
*/}
        <div className="lg:col-span-2 border-1 h-[200px]">
          {/* <PracticeEditor
            currentPlan={currentPlan}
            drillLibrary={drillLibrary}
            onUpdatePlan={setCurrentPlan}
            onSavePlan={handleSavePlan}
            onAddToLibrary={addDrillToLibrary}
            onCreateNew={createNewPlan}
          />  */}
        </div>
      </div>
    </div>
  );
};