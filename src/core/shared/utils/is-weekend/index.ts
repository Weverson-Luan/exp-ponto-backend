/**
 * IMPORTS
 */

const handleIsWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

/**
 * EXPORTS
 */
export { handleIsWeekend };
