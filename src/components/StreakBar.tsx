import React, { useMemo } from 'react';

type StreakBarProps = {
  currentStreak: number;
  bestStreak: number;
};

const StreakBar: React.FC<StreakBarProps> = ({ currentStreak, bestStreak }) => {
  const ratio = useMemo(() => {
    const denom = Math.max(1, bestStreak);
    return Math.min(1, currentStreak / denom);
  }, [currentStreak, bestStreak]);

  return (
    <div className="card">
      <div className="row-between">
        <div>
          <p className="muted">Streak Saat Ini</p>
          <p className="heading-lg">{currentStreak} 🔥</p>
        </div>
        <div className="text-right">
          <p className="muted">Rekor Terbaik</p>
          <p className="heading-lg">{bestStreak} 🏆</p>
        </div>
      </div>
      <div className="progress">
        <div className="progress-bar" style={{ width: `${ratio * 100}%` }} />
      </div>
      <p className="caption">{Math.round(ratio * 100)}% menuju rekor</p>
    </div>
  );
};

export default StreakBar;


