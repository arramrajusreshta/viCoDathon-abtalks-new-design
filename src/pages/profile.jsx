import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import BadgeCard from "../components/BadgeCard";

export default function Profile() {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  const [profile, setProfile] = useState(null);
const [loading, setLoading] = useState(true);
const [editName, setEditName] = useState("");
const [editCollege, setEditCollege] = useState("");
const [editTrack, setEditTrack] = useState("");
const [editGithub, setEditGithub] = useState("");
const [editLinkedin, setEditLinkedin] = useState("");
const [saving, setSaving] = useState(false);
const [verifiedDays, setVerifiedDays] = useState([]);

useEffect(() => {
  loadProfile();
}, []);

async function loadProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setLoading(false);
    return;
  }

  const { data, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", user.id)
  .maybeSingle();

if (error) {
  console.error("Profile error:", error);
} else if (!data) {
  const { data: newProfile, error: createError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      name: user.user_metadata?.name || "",
      college: "",
      track: "",
      github_username: "",
      linkedin_url: "",
      current_streak: 0,
      longest_streak: 0,
      completed_days: 0,
    })
    .select()
    .single();

  if (createError) {
    console.error("Create profile error:", createError);
  } else {
    setProfile(newProfile);
  }
} else {
  setProfile(data);
}

  if (error) {
    console.error("Profile error:", error);
  } else {
    setProfile(data);
  }
  const { data: submissions, error: submissionsError } = await supabase
  .from("submissions")
  .select("day_number")
  .eq("user_id", user.id)
  .eq("github_verified", true)
  .eq("linkedin_verified", true);

if (submissionsError) {
  console.error("Badge submission error:", submissionsError);
} else {
  setVerifiedDays(
    (submissions || []).map((item) => Number(item.day_number))
  );
}

  setLoading(false);
}
const verifiedSet = new Set(verifiedDays);

const hasPerfectWeek = Array.from({ length: 54 }, (_, i) => i + 1)
  .some((startDay) =>
    Array.from({ length: 7 }, (_, j) => startDay + j)
      .every((day) => verifiedSet.has(day))
  );

const weekendDaysCompleted = verifiedDays.filter((day) => {
  const challengeStart = new Date("2026-08-09T00:00:00+05:30");
  const date = new Date(challengeStart);
  date.setDate(challengeStart.getDate() + day - 1);

  const weekday = date.getDay();
  return weekday === 0 || weekday === 6;
}).length;

  const badges = [
  {
    title: "7-Day Streak",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    unlocked: (profile?.longest_streak ?? 0) >= 7,
  },
  {
    title: "30-Day Grinder",
    description: "Complete 30 challenge days",
    icon: "🏆",
    unlocked: (profile?.completed_days ?? 0) >= 30,
  },
  {
    title: "60-Day Finisher",
    description: "Complete all 60 challenge days",
    icon: "👑",
    unlocked: (profile?.completed_days ?? 0) >= 60,
  },
  {
    title: "First Proof",
    description: "Complete your first verified challenge",
    icon: "🚀",
    unlocked: (profile?.completed_days ?? 0) >= 1,
  },
  {
  title: "Perfect Week",
  description: "Complete 7 consecutive challenge days",
  icon: "💯",
  unlocked: hasPerfectWeek,
},
{
  title: "Weekend Warrior",
  description: "Complete 4 weekend challenge days",
  icon: "⚡",
  unlocked: weekendDaysCompleted >= 4,
},
];
  function openEditModal() {
  setEditName(profile?.name || "");
  setEditCollege(profile?.college || "");
  setEditTrack(profile?.track || "");
  setEditGithub(profile?.github_username || "");
  setEditLinkedin(profile?.linkedin_url || "");
  setShowEditModal(true);
}

async function saveProfile() {
  setSaving(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setSaving(false);
    return;
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      name: editName,
      college: editCollege,
      track: editTrack,
      github_username: editGithub,
      linkedin_url: editLinkedin,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Save profile error:", error);
  } else {
    setProfile(data);
    setShowEditModal(false);
  }

  setSaving(false);
}
      return (
  <div className="min-h-screen bg-slate-950 text-slate-100 max-w-[390px] mx-auto pb-12">

    

    {/* Header */}
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between"></header>
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-xs text-slate-400 hover:text-white"
        >
          ← Dashboard
        </button>

        <h1 className="text-sm font-bold text-white">
          Profile
        </h1>

        <div className="w-16" />
      </header>

      <div className="px-5 pt-6 space-y-5">

        {/* Profile Header */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-orange-500/20">
            AS
          </div>

          <h2 className="text-xl font-bold text-white mt-3">
            {profile?.name || "Your Name"}
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            {profile?.college || "College not added"} •{" "}
  {profile?.track || "Track not added"}
          </p>

          <button
            onClick={openEditModal}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <p className="text-lg font-black text-amber-400">{profile?.current_streak ?? 0}</p>
            <p className="text-[10px] text-slate-400">Day Streak</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <p className="text-lg font-black text-emerald-400">11</p>
            <p className="text-[10px] text-slate-400">Completed</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <p className="text-lg font-black text-orange-400">#42</p>
            <p className="text-[10px] text-slate-400">Rank</p>
          </div>
        </div>

        {/* Public Proof */}
        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            Public Proof
          </h3>

          <div className="space-y-2">
            <a
              href="#"
              className="block p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700"
            >
              <p className="text-xs font-semibold text-white">GitHub</p>
              <p className="text-[10px] text-slate-400">
                {profile?.github_username
  ? `github.com/${profile.github_username}`
  : "GitHub username not added"}
              </p>
            </a>

            <a
              href="#"
              className="block p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700"
            >
              <p className="text-xs font-semibold text-white">LinkedIn</p>
              <p className="text-[10px] text-slate-400">
                {profile?.linkedin_url || "LinkedIn not added"}
              </p>
            </a>

            <a
              href="#"
              className="block p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700"
            >
              <p className="text-xs font-semibold text-white">Portfolio</p>
              <p className="text-[10px] text-slate-400">
                aaravsharma.dev
              </p>
            </a>
          </div>
        </section>

        {/* Connected Accounts */}
        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            Connected Accounts
          </h3>

          <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div>
              <p className="text-xs font-semibold text-white">GitHub</p>
              <p className="text-[10px] text-emerald-400">
                Connected
              </p>
            </div>

            <span className="text-emerald-400 text-sm">✓</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 mt-2">
            <div>
              <p className="text-xs font-semibold text-white">LinkedIn</p>
              <p className="text-[10px] text-emerald-400">
                Connected
              </p>
            </div>

            <span className="text-emerald-400 text-sm">✓</span>
          </div>
        </section>

        {/* Badges */}
        {/* Badges */}
<section>
  <div className="flex items-center justify-between mb-3">
    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
      Badges & Achievements
    </h3>

    <span className="text-[10px] text-slate-500">
      {badges.filter((badge) => badge.unlocked).length} / {badges.length} Unlocked
    </span>
  </div>

  <div className="grid grid-cols-2 gap-3">
    {badges.map((badge) => (
      <BadgeCard
        key={badge.title}
        title={badge.title}
        description={badge.description}
        icon={badge.icon}
        unlocked={badge.unlocked}
      />
    ))}
  </div>
</section>
      </div>

      {/* Edit Profile Modal */}
      {/* Edit Profile Modal */}
{showEditModal && (
  <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center px-5">
    <div className="w-full max-w-[360px] bg-slate-900 border border-slate-700 rounded-2xl p-5">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-white">
          Edit Profile
        </h2>

        <button
          onClick={() => setShowEditModal(false)}
          className="text-slate-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
        />

        <input
          type="text"
          placeholder="College"
          value={editCollege}
          onChange={(e) => setEditCollege(e.target.value)}
          className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
        />

        <input
          type="text"
          placeholder="Track"
          value={editTrack}
          onChange={(e) => setEditTrack(e.target.value)}
          className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
        />

        <input
          type="text"
          placeholder="GitHub Username"
          value={editGithub}
          onChange={(e) => setEditGithub(e.target.value)}
          className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
        />

        <input
          type="text"
          placeholder="LinkedIn URL"
          value={editLinkedin}
          onChange={(e) => setEditLinkedin(e.target.value)}
          className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
        />

        <button
          onClick={saveProfile}
          disabled={saving}
          className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs rounded-xl disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
} 
  
