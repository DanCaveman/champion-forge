export const calculateDrillTime = (startTime: string, drills: Array<{ duration?: number }>, index: number): string => {
  const [hours, minutes] = startTime.split(":").map(Number)
  let totalMinutes = hours * 60 + minutes

  for (let i = 0; i < index; i++) {
    totalMinutes += drills[i].duration || 0
  }

  const drillHours = Math.floor(totalMinutes / 60)
  const drillMinutes = totalMinutes % 60

  return `${drillHours.toString().padStart(2, "0")}:${drillMinutes.toString().padStart(2, "0")}`
}
