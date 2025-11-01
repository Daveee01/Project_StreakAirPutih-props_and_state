import React from 'react';

export type DayItem = { date: string; count: number };

type HistoryProps = {
  days: DayItem[];
};

const History: React.FC<HistoryProps> = ({ days }) => {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="card">
      <p className="section-title">Riwayat 14 Hari</p>
      <div className="grid-7">
        {days.map((d) => {
          const active = d.count > 0;
          const isToday = d.date === today;
          return (
            <div key={d.date} className="flex flex-col items-center gap-1">
              <div
                className={`bubble ${active ? 'bubble-active' : 'bubble-idle'} ${isToday ? 'bubble-today' : ''}`}
                title={`${d.date} • ${d.count}x`}
              >
                {active ? d.count : ''}
              </div>
              <span className="text-[10px] text-white/70">
                {new Date(d.date).toLocaleDateString(undefined, { weekday: 'narrow' })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;


