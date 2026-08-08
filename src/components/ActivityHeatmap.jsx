import React, { useState } from "react";

export default function ActivityHeatmap() {
  const [selectedDay, setSelectedDay] = useState(null);

  // Example activity for the first 60 days
  const activity = Array.from({ length: 60 }, (_, index) => {
    const day = index + 1;

    if (day <= 11) {
      return {
        day,
        status: "completed",
        intensity: (day % 4) + 1,
      };
    }

    if (day === 12) {
      return {
        day,
        status: "today",
        intensity: 0,
      };
    }

    if (day === 5) {
      return {
        day,
        status: "missed",
        intensity: 0,
      };
    }

    return {
      day,
      status: "locked",
      intensity: 0,
    };
  });

  const getCellStyle = (item) => {
    if (item.status === "today") {
      return "bg-orange-500 border-orange-400 ring-2 ring-orange-500/30";
    }

    if (item.status === "missed") {
      return "bg-rose-500/20 border-rose-500/40";
    }

    if (item.status === "locked") {
      return "bg-slate-950 border-slate-800";
    }

    const intensityStyles = {
      1: "bg-emerald-950 border-emerald-900",
      2: "bg-emerald-900 border-emerald-800",
      3: "bg-emerald-700 border-emerald-600",
      4: "bg-emerald-500 border-emerald-400",
    };

    return intensityStyles[item.intensity];
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-bold text-white">
            60-Day Activity
          </h3>

          <p className="text-[10px] text-slate-500 mt-1">
            Your proof-of-work journey
          </p>
        </div>

        <span className="text-[10px] text-emerald-400">
          11 completed
        </span>
      </div>

      {/* Heatmap */}
      <div className="grid grid-cols-10 gap-1.5">
        {activity.map((item) => (
          <button
            key={item.day}
            onClick={() => setSelectedDay(item)}
            className={`aspect-square rounded-md border transition-all duration-200 hover:scale-110 ${getCellStyle(
              item
            )}`}
          >
            <span className="sr-only">
              Day {item.day}
            </span>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4">

        <span className="text-[9px] text-slate-500">
          Less
        </span>

        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-slate-950 border border-slate-800" />
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-950" />
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-900" />
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-700" />
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
        </div>

        <span className="text-[9px] text-slate-500">
          More
        </span>

      </div>

      {/* Selected Day */}
      {selectedDay && (
        <div className="mt-4 p-3 bg-slate-950 border border-slate-800 rounded-xl">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-bold text-white">
                Day {selectedDay.day}
              </p>

              <p className="text-[10px] text-slate-400 mt-1">
                {selectedDay.status === "completed"
                  ? "Challenge completed"
                  : selectedDay.status === "today"
                  ? "Today's challenge"
                  : selectedDay.status === "missed"
                  ? "Challenge missed"
                  : "Challenge locked"}
              </p>
            </div>

            <button
              onClick={() => setSelectedDay(null)}
              className="text-slate-500 hover:text-white"
            >
              ✕
            </button>

          </div>

        </div>
      )}
    </div>
  );
}