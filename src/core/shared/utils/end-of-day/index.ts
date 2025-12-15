/**
 * IMPORTS
 */

const handleEndOfDay = (date: string | Date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

/**
 * EXPORTS
 */
export { handleEndOfDay };
