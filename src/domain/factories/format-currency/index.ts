/**
 * IMPORTS
 */

function handleFormatCurrencyBRL(
  value: number | null | undefined,
): string | null {
  if (value === null || value === undefined) return null;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
}

/**
 * EXPORTS
 */
export { handleFormatCurrencyBRL };
