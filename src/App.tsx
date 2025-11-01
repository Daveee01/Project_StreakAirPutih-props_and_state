// src/App.tsx

import React, { useEffect, useMemo, useState } from 'react';
import HabitButton from './components/HabitButton';
import StreakBar from './components/StreakBar';
import History from './components/History';
import type { DayItem } from './components/History';
import GoalBadge from './components/GoalBadge';

function getTodayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getLastNDays(daysMap: Record<string, number>, n: number): DayItem[] {
  const out: DayItem[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    out.push({ date: key, count: daysMap[key] ?? 0 });
  }
  return out;
}

function computeCurrentStreak(daysMap: Record<string, number>): number {
  let streak = 0;
  const now = new Date();
  while (true) {
    const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const count = daysMap[key] ?? 0;
    if (count > 0) {
      streak += 1;
      now.setDate(now.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

const DAILY_GOAL = 8; // default target (contoh: 8 gelas)

const App: React.FC = () => {
  const [days, setDays] = useState<Record<string, number>>(() => {
    try {
      const raw = localStorage.getItem('habit-days');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [bestStreak, setBestStreak] = useState<number>(() => {
    const raw = localStorage.getItem('habit-best');
    return raw ? Number(raw) : 0;
  });

  const todayKey = getTodayKey();
  const todayCount = days[todayKey] ?? 0;
  const currentStreak = useMemo(() => computeCurrentStreak(days), [days]);
  const percent = Math.min(1, (todayCount || 0) / DAILY_GOAL);
  const last14 = useMemo(() => getLastNDays(days, 14), [days]);

  function handleIncrement() {
    setDays((prev) => {
      const next = { ...prev, [todayKey]: (prev[todayKey] ?? 0) + 1 };
      return next;
    });
  }

  function handleReset() {
    if (!confirm('Reset semua data (hari ini, riwayat, dan rekor)?')) return;
    setDays({});
    setBestStreak(0);
    localStorage.removeItem('habit-days');
    localStorage.removeItem('habit-best');
  }

  useEffect(() => {
    localStorage.setItem('habit-days', JSON.stringify(days));
  }, [days]);

  useEffect(() => {
    if (currentStreak > bestStreak) {
      setBestStreak(currentStreak);
    }
  }, [currentStreak]);

  useEffect(() => {
    localStorage.setItem('habit-best', String(bestStreak));
  }, [bestStreak]);

  return (
    <div className="app-root">
      <div className="pointer-events-none absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full bg-sky-600/30 blue-blob" />
      <div className="pointer-events-none absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] rounded-full bg-blue-500/30 blue-blob" style={{ animationDelay: '2s' }} />
      <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-[-2rem] w-[28rem] h-[28rem] rounded-full bg-cyan-500/20 blue-blob" style={{ animationDelay: '4s' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-800/90" />
      <div className="inner">
      <header className="hero" role="banner">
        <h1 className="hero-title">
          Streak Air Putih💧
        </h1>
        <p className="hero-sub">Catat kebiasaan harian dan jaga streak-mu</p>
      </header>

      <div className="container-grid">
        <div className="grid-left">
          <div className="card">
            <StreakBar currentStreak={currentStreak} bestStreak={bestStreak} />
          </div>
          <div className="card">
            <History days={last14} />
          </div>
        </div>
        <div className="grid-right">
          <div className="card">
            <GoalBadge percent={percent} />
          </div>
          <div className="card column gap-3" role="region" aria-label="Aksi Harian">
            <HabitButton todayCount={todayCount} todayLimit={DAILY_GOAL} onIncrement={handleIncrement} />
            <div className="muted">Target Harian: <span className="bold">{DAILY_GOAL}</span> kali</div>
            <div className="muted">Hari ini: <span className="bold">{todayCount}</span></div>
            <button className="btn-secondary" onClick={handleReset}>Reset</button>
          </div>
          <div className="card soft">
            <p className="muted mb-1">Target Harian</p>
            <p className="heading-md">{DAILY_GOAL} kali</p>
            <p className="muted mt-2">Hari ini: <span className="bold">{todayCount}</span></p>
          </div>
        </div>
      </div>
      
      </div>

      {percent >= 1 && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative w-full h-full">
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                className="confetti-dot absolute block w-2 h-2 rounded-full"
                style={{
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  backgroundColor: ['#34d399', '#60a5fa', '#f472b6', '#f59e0b'][i % 4],
                  animationDelay: (Math.random() * 0.6) + 's',
                }}
              />
            ))}
          </div>
        </div>
      )}

      <footer className="mt-12 text-white/70 text-sm">
        <p>&copy; {new Date().getFullYear()} Habit Streak</p>
      </footer>
    </div>
  );
};

export default App;