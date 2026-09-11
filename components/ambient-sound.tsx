'use client';
import { useEffect, useRef, useState } from 'react';

export function AmbientSound() {
  const [playing, setPlaying] = useState(false);
  const ctx = useRef<AudioContext | null>(null);
  const nodes = useRef<OscillatorNode[]>([]);
  useEffect(() => () => { nodes.current.forEach((n) => n.stop()); ctx.current?.close(); }, []);
  const toggle = () => {
    if (playing) { nodes.current.forEach((n) => n.stop()); nodes.current = []; setPlaying(false); return; }
    const audio = new AudioContext(); ctx.current = audio;
    const master = audio.createGain(); master.gain.value = 0.018; master.connect(audio.destination);
    [196, 246.94, 293.66].forEach((frequency, index) => {
      const oscillator = audio.createOscillator(); oscillator.type = 'sine'; oscillator.frequency.value = frequency;
      const gain = audio.createGain(); gain.gain.value = index === 1 ? 0.45 : 0.28;
      oscillator.connect(gain).connect(master); oscillator.start(); nodes.current.push(oscillator);
    });
    setPlaying(true);
  };
  return <button className="sound-toggle" onClick={toggle} aria-label={playing ? 'Pause ambient sound' : 'Play ambient sound'}>{playing ? 'Sound on' : 'Play sound'} <span aria-hidden="true">{playing ? '●' : '○'}</span></button>;
}
