/**
 * IMPORTS
 */

import { handleIsWeekend } from '@src/core/shared/utils/is-weekend';
import { handleMinutesToHHMM } from '@src/core/shared/utils/minutes-to-hhmm';

export class PointMirrorFactory {
  static buildDay(date: string, markings: any[]) {
    let worked = 0;
    let interval = 0;

    for (let i = 0; i < markings.length - 1; i++) {
      const cur = markings[i];
      const next = markings[i + 1];

      const diff =
        (new Date(next.marked_at).getTime() -
          new Date(cur.marked_at).getTime()) /
        60000;

      if (['input', 'return_interval'].includes(cur.type)) {
        worked += diff;
      }

      if (cur.type === 'output_interval') {
        interval += diff;
      }
    }

    const dateObj = new Date(date);

    return {
      date,
      weekday: dateObj.toLocaleDateString('pt-BR', { weekday: 'short' }),
      is_weekend: handleIsWeekend(dateObj),

      markings_label: markings
        .map((m) => new Date(m.marked_at).toTimeString().slice(0, 5))
        .join(' '),

      workload: '08:00',
      worked: handleMinutesToHHMM(worked),
      extra: worked > 480 ? handleMinutesToHHMM(worked - 480) : null,

      interval: handleMinutesToHHMM(interval),
      interval_deficit:
        interval < 60 ? handleMinutesToHHMM(60 - interval) : null,

      status: markings.length < 2 ? 'INCONSISTENTE' : 'OK',
    };
  }
}
