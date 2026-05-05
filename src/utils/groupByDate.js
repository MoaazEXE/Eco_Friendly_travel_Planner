export function groupByDate(plan) {
  return plan.reduce((groups, item) => {
    if (!groups[item.plannedDate]) groups[item.plannedDate] = [];
    groups[item.plannedDate].push(item);
    return groups;
  }, {});
}
