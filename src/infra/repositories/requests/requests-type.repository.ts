/**
 * IMPORTS
 */

export interface IRequestsRepository {
  /**
   * Contagem de solicitações feitas pelo usuário
   * @param user_id
   * @returns
   */
  countTotal(user_id: number): Promise<number>;
}
