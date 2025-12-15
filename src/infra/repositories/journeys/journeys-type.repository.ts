/**
 * IMPORTS
 */
import { Journeys } from 'generated/prisma/client';

export interface IJourneysRepository {
  /**
   * Busca a jornada de um usuário em uma data específica
   */
  findByUserAndDate(official_id: number, date: Date): Promise<Journeys | null>;

  /**
   * Buscar ocorrências de jornada
   */
  countOccurrences(user_id: number, date: Date): Promise<number>;

  /**
   * Buscar banco de horas de jornada
   */
  getBankHours(user_id: number, date: Date): Promise<number>;

  /**
   * Buscar o total de faltas no mês
   */
  countAbsences(user_id: number, date: Date): Promise<number>;
}
