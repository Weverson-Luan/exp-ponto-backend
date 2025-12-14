/**
 * Formata uma data ISO para o formato brasileiro: DD/MM/YYYY às HH:mm
 * Exemplo: "2025-10-11T15:39:22.953Z" -> "11/10/2025 às 12:39"
 */
export function formatDateToBR(dateString: string): string {
  if (!dateString) return '-';

  const date = new Date(dateString);

  // ajusta para o fuso horário local
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formatted = formatter.format(date);

  // o Intl já traz "11/10/2025 12:39", só adicionamos o "às"
  return formatted.replace(',', ' às');
}
