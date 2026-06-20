import { useEffect, useState } from "react";

interface LiveStats {
  /** HH:MM:SS, local time. */
  clock: string;
  /** Years elapsed since `birthDate`, 7 decimal places. */
  uptime: string;
}

const pad = (n: number) => String(n).padStart(2, "0");
const YEAR_MS = 365.2425 * 24 * 3600 * 1000;

/** Single 1s interval that drives both the header clock and the uptime badge. */
export function useLiveStats(birthDate: string): LiveStats {
  const [stats, setStats] = useState<LiveStats>({
    clock: "--:--:--",
    uptime: "0.0000000",
  });

  useEffect(() => {
    const birth = new Date(birthDate);
    const tick = () => {
      const now = new Date();
      setStats({
        clock: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
        uptime: ((now.getTime() - birth.getTime()) / YEAR_MS).toFixed(7),
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [birthDate]);

  return stats;
}
