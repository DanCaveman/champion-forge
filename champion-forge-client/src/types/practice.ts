export interface Drill {
  id: string
  name: string
  description: string
  category: string
  duration?: number // in minutes
}

export interface PracticePlan {
  id: string
  name: string
  date: string
  startTime: string
  endTime: string
  drills: Drill[]
}
