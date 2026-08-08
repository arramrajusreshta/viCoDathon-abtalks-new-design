export default function BadgeCard({
  title,
  description,
  icon,
  unlocked,
}) {
  return (
    <div
      className={`relative p-4 rounded-2xl border transition-all duration-300 ${
        unlocked
          ? "bg-slate-900 border-amber-500/30 hover:border-amber-500/60 hover:-translate-y-1"
          : "bg-slate-950 border-slate-800 opacity-50"
      }`}
    >
      {/* Badge Icon */}
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-3 ${
          unlocked
            ? "bg-amber-500/10"
            : "bg-slate-900"
        }`}
      >
        {unlocked ? icon : "🔒"}
      </div>

      {/* Badge Information */}
      <h3 className="text-sm font-bold text-white">
        {title}
      </h3>

      <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
        {description}
      </p>

      {/* Status */}
      <div className="mt-3">
        {unlocked ? (
          <span className="text-[10px] font-semibold text-emerald-400">
            ✓ Unlocked
          </span>
        ) : (
          <span className="text-[10px] font-semibold text-slate-500">
            🔒 Locked
          </span>
        )}
      </div>
    </div>
  );
}