function frbStageName(frb) {
  if (!frb) return "—";
  if (frb.stage) return frb.stage;
  const idx = Number(frb.stageIndex);
  const names = [
    "Pre-Burst",
    "Ramp",
    "Peak",
    "Plateau",
    "Decay",
    "Refractory",
    "Reset"
  ];
  return names[idx] ?? `Stage ${idx}`;
}
function asFullBackend(actor) {
  if (!actor) return null;
  return actor;
}
export {
  asFullBackend as a,
  frbStageName as f
};
