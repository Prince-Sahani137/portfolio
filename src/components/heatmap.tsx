"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type Contribution = {
  date: string;
  count: number;
  level: number;
};

type ApiResponse = {
  total: Record<string, number>;
  contributions: Contribution[];
};

const LEVEL_CLASS = [
  "bg-muted",
  "bg-brand/25",
  "bg-brand/45",
  "bg-brand/70",
  "bg-brand",
];

function chunkWeeks(days: Contribution[]) {
  const weeks: (Contribution | null)[][] = [];
  let current: (Contribution | null)[] = [];

  if (days.length > 0) {
    const first = new Date(`${days[0].date}T00:00:00`);
    const offset = first.getDay();
    for (let i = 0; i < offset; i += 1) current.push(null);
  }

  for (const day of days) {
    current.push(day);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length > 0) {
    while (current.length < 7) current.push(null);
    weeks.push(current);
  }

  return weeks;
}

export function Heatmap() {
  const [days, setDays] = useState<Contribution[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(
      `https://github-contributions-api.jogruber.de/v4/${site.githubHandle}?y=last`,
      { signal: controller.signal },
    )
      .then((response) => {
        if (!response.ok) throw new Error("bad response");
        return response.json() as Promise<ApiResponse>;
      })
      .then((data) => {
        setDays(data.contributions);
        setTotal(data.total?.lastYear ?? null);
      })
      .catch((error: unknown) => {
        if ((error as Error)?.name === "AbortError") return;
        setFailed(true);
      });

    return () => controller.abort();
  }, []);

  const weeks = days ? chunkWeeks(days) : null;

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto pb-1">
        {weeks ? (
          <div className="flex w-max gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) =>
                  day ? (
                    <span
                      key={day.date}
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                      className={`size-2.5 rounded-[2px] ${LEVEL_CLASS[day.level] ?? LEVEL_CLASS[0]}`}
                    />
                  ) : (
                    <span
                      key={`empty-${weekIndex}-${dayIndex}`}
                      aria-hidden="true"
                      className="size-2.5 rounded-[2px] bg-transparent"
                    />
                  ),
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-max gap-[3px]" aria-hidden="true">
            {Array.from({ length: 53 }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((__, dayIndex) => (
                  <span
                    key={dayIndex}
                    className="size-2.5 animate-pulse rounded-[2px] bg-muted"
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
        <span>
          {failed
            ? "Live GitHub data is unavailable right now — check the profile instead."
            : total !== null
              ? `${total} contributions in the last year`
              : "Loading contributions…"}
        </span>
        <span className="flex items-center gap-1.5">
          Less
          {LEVEL_CLASS.map((className) => (
            <span key={className} className={`size-2.5 rounded-[2px] ${className}`} />
          ))}
          More
        </span>
      </div>
    </div>
  );
}
