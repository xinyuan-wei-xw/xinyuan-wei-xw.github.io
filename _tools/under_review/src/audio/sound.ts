let ctx: AudioContext | undefined;
export function sound(
  kind: "click" | "throw" | "mail" | "accept" | "bonk" | "drawer",
) {
  try {
    ctx ??= new AudioContext();
    void ctx.resume();
    const now = ctx.currentTime;
    const notes =
      kind === "accept"
        ? [440, 554, 659]
        : kind === "mail"
          ? [660, 880]
          : [
              kind === "bonk"
                ? 110
                : kind === "drawer"
                  ? 80
                  : kind === "throw"
                    ? 300
                    : 480,
            ];
    notes.forEach((freq, i) => {
      const osc = ctx!.createOscillator(),
        gain = ctx!.createGain();
      osc.type = kind === "bonk" || kind === "drawer" ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.12);
      if (kind === "throw")
        osc.frequency.exponentialRampToValueAtTime(650, now + 0.2);
      gain.gain.setValueAtTime(0, now + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.065, now + i * 0.12 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.25);
      osc.connect(gain);
      gain.connect(ctx!.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.3);
    });
  } catch {
    /* Audio is optional. */
  }
}
