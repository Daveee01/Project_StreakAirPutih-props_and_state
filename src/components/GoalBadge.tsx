import React from 'react';

type GoalBadgeProps = {
  percent: number; // 0..1
};

const GoalBadge: React.FC<GoalBadgeProps> = ({ percent }) => {
  const pct = Math.max(0, Math.min(1, percent));
  const label = `${Math.round(pct * 100)}%`;
  return (
    <div className="card row gap-4">
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 36 36" className="w-16 h-16">
          <path
            className="ring-track"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"/>
          <path
            className="ring-progress"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${pct * 100}, 100`}
            style={{ transition: 'stroke-dasharray 600ms ease' }}
            d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"/>
        </svg>
        <span className="center-abs text-sm font-extrabold">{label}</span>
      </div>
      <div>
        <p className="muted">Progress Hari Ini</p>
        <p className="font-semibold">Menuju target</p>
      </div>
    </div>
  );
};

export default GoalBadge;


