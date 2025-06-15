import { useState, useEffect } from "react";
import type { PracticePlan, Drill } from "../types";
import { SAMPLE_DRILLS } from "../constants";

export const usePracticeData = () => {
  const [practicePlans, setPracticePlans] = useState<PracticePlan[]>([]);
  const [drillLibrary, setDrillLibrary] = useState<Drill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedPlans = localStorage.getItem("practicePlans");
      const savedLibrary = localStorage.getItem("drillLibrary");

      if (savedPlans) {
        const parsedPlans = JSON.parse(savedPlans);
        if (Array.isArray(parsedPlans)) {
          setPracticePlans(parsedPlans);
        }
      }

      if (savedLibrary) {
        const parsedLibrary = JSON.parse(savedLibrary);
        if (Array.isArray(parsedLibrary)) {
          setDrillLibrary(parsedLibrary);
        } else {
          setDrillLibrary(SAMPLE_DRILLS);
        }
      } else {
        setDrillLibrary(SAMPLE_DRILLS);
        localStorage.setItem("drillLibrary", JSON.stringify(SAMPLE_DRILLS));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      setDrillLibrary(SAMPLE_DRILLS);
      setPracticePlans([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoading && Array.isArray(practicePlans)) {
      try {
        localStorage.setItem("practicePlans", JSON.stringify(practicePlans));
      } catch (error) {
        console.error("Error saving practice plans:", error);
      }
    }
  }, [practicePlans, isLoading]);

  useEffect(() => {
    if (!isLoading && Array.isArray(drillLibrary)) {
      try {
        localStorage.setItem("drillLibrary", JSON.stringify(drillLibrary));
      } catch (error) {
        console.error("Error saving drill library:", error);
      }
    }
  }, [drillLibrary, isLoading]);

  const savePracticePlan = (plan: PracticePlan) => {
    setPracticePlans((prevPlans) => {
      const existingIndex = prevPlans.findIndex((p) => p.id === plan.id);
      if (existingIndex >= 0) {
        const updated = [...prevPlans];
        updated[existingIndex] = plan;
        return updated;
      } else {
        return [...prevPlans, plan];
      }
    });
  };

  const addDrillToLibrary = (drill: Omit<Drill, "id">) => {
    const newDrill = { ...drill, id: Date.now().toString() };
    setDrillLibrary((prevLibrary) => [...prevLibrary, newDrill]);
    return newDrill;
  };

  return {
    practicePlans,
    drillLibrary,
    savePracticePlan,
    addDrillToLibrary,
    isLoading,
  };
};
