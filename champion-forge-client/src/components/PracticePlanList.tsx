import type { PracticePlan } from "@/types";
import { Card, CardHeader, CardContent, CardTitle } from "./Card";

interface PracticePlanListProps {
  plans: PracticePlan[]
  currentPlan: PracticePlan | null
  onSelectPlan: (plan: PracticePlan) => void
  isLoading?: boolean
}

export const PracticePlanList: React.FC<PracticePlanListProps> = ({
  plans,
  currentPlan,
  onSelectPlan,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Practice Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="text-gray-500">Loading practice plans...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Practice Plans</CardTitle>
        <p className="text-sm text-gray-600 mt-1">Select a practice plan to edit</p>
      </CardHeader>
      <CardContent>
        {plans.length === 0 ? (
          <div className="text-center p-8">
            <div className="text-gray-500 mb-2">No practice plans yet.</div>
            <div className="text-sm text-gray-400">Create your first practice plan to get started!</div>
          </div>
        ) : (
          <div className="space-y-2">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  currentPlan?.id === plan.id ? "bg-primary-50 border-primary-200" : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => onSelectPlan(plan)}
              >
                <div className="font-medium text-gray-900">{plan.name}</div>
                <div className="text-sm text-gray-600">
                  {plan.date} • {plan.startTime} - {plan.endTime}
                </div>
                <div className="text-xs text-gray-500 mt-1">{plan.drills.length} drills</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
