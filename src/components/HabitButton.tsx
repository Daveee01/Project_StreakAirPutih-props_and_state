import React from 'react';

type HabitButtonProps = {
  todayCount: number;
  todayLimit?: number;
  onIncrement: () => void;
};

const HabitButton: React.FC<HabitButtonProps> = ({ todayCount, todayLimit = 8, onIncrement }) => {
  const reachedLimit = todayCount >= todayLimit;
  return (
    <button
      onClick={onIncrement}
      disabled={reachedLimit}
      className={`btn-primary ${reachedLimit ? 'btn-disabled' : ''}`}
      aria-label="Increment today's habit count"
    >
      <span className="btn-dot" />
      {reachedLimit ? 'Target Tercapai' : 'Catat Hari Ini'}
      {!reachedLimit && <span>✨</span>}
    </button>
  );
};

export default HabitButton;


