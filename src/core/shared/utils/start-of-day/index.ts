/**
 * IMPORTS
 */

const handleStartOfDay = (date: string | Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * EXPORTS
 */
export { handleStartOfDay };
