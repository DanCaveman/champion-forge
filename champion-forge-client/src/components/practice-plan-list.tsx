import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PracticePlan } from "@/types/practice";

interface PracticePlanListProps {
  plans: PracticePlan[]
  currentPlan: PracticePlan | null
  onSelectPlan: (plan: PracticePlan) => void
  isLoading?: boolean
}

export function PracticePlanList({ plans, currentPlan, onSelectPlan, isLoading = false }: PracticePlanListProps) {
  // Double-check that plans is always an array
  const safePlans = Array.isArray(plans) ? plans : [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Practice Plans</CardTitle>
          <CardDescription>Select a practice plan to edit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4">
            <div className="text-sm text-muted-foreground">Loading practice plans...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Practice Plans</CardTitle>
        <CardDescription>Select a practice plan to edit</CardDescription>
      </CardHeader>
      <CardContent>
        {safePlans.length === 0 ? (
          <div className="text-center p-4">
            <div className="text-sm text-muted-foreground">No practice plans yet.</div>
            <div className="text-xs text-muted-foreground mt-1">Create your first practice plan to get started!</div>
          </div>
        ) : (
          <div className="space-y-2">
            {safePlans.map((plan) => {
              if (!plan || !plan.id) return null;

              return (
                <div
                  key={plan.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    currentPlan?.id === plan.id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                  }`}
                  onClick={() => onSelectPlan(plan)}
                >
                  <div className="font-medium">{plan.name || "Untitled Practice"}</div>
                  <div className="text-sm text-muted-foreground">
                    {plan.date || "No date"} • {plan.startTime || "00:00"} - {plan.endTime || "00:00"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {Array.isArray(plan.drills) ? plan.drills.length : 0} drills
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
