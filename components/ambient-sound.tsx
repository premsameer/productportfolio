'use client';
import { useEffect, useRef, useState } from 'react';

// Original slow piano-style study, in A minor. No third-party recording.
const chords = [[45,52,57,60],[41,48,53,57],[48,55,60,64],[43,50,55,59]];
const melody = [[76,74,72,71],[69,72,76,74],[72,71,67,69],[71,74,72,69]];
export function AmbientSound() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(25);
  const [error, setError] = useState('');
  const engine = useRef<{audio: AudioContext; gain: GainNode; timer: number} | null>(null);
  const generation = useRef(0);
  const stop = () => {
    generation.current++;
    const current = engine.current; engine.current = null;
    if (current) {
      window.clearInterval(current.timer);
      current.gain.gain.cancelScheduledValues(current.audio.currentTime);
      current.gain.gain.setTargetAtTime(0, current.audio.currentTime, .08);
      window.setTimeout(() => { void current.audio.close(); }, 450);
    }
    setPlaying(false);
  };
  useEffect(() => {
    const hide = () => { if (document.hidden) stop(); };
    document.addEventListener('visibilitychange', hide);
    return () => {
      document.removeEventListener('visibilitychange', hide);
      generation.current++;
      const current = engine.current;
      if (current) { window.clearInterval(current.timer); void current.audio.close(); }
    };
  }, []);
  const start = async () => {
    if (engine.current) { stop(); return; }
    const ticket = ++generation.current;
    const audio = new AudioContext();
    try {
      await audio.resume();
      if (ticket !== generation.current) { await audio.close(); return; }
      const master = audio.createGain();
      const compressor = audio.createDynamicsCompressor();
      master.connect(compressor); compressor.connect(audio.destination);
      master.gain.setValueAtTime(0, audio.currentTime);
      master.gain.linearRampToValueAtTime(volume / 100 * .5, audio.currentTime + 1);
      const room = audio.createConvolver();
      const impulse = audio.createBuffer(2, audio.sampleRate * 2, audio.sampleRate);
      for (let channel = 0; channel < 2; channel++) {
        const data = impulse.getChannelData(channel);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3) * .18;
      }
      room.buffer = impulse;
      const wet = audio.createGain(); wet.gain.value = .2; room.connect(wet); wet.connect(master);
      const note = (midi: number, time: number, velocity: number) => {
        const envelope = audio.createGain(); envelope.connect(master); envelope.connect(room);
        envelope.gain.setValueAtTime(0, time);
        envelope.gain.linearRampToValueAtTime(velocity, time + .012);
        envelope.gain.exponentialRampToValueAtTime(.0001, time + 3.8);
        [1,2,3,4].forEach((partial, i) => {
          const tone = audio.createOscillator(); const level = audio.createGain();
          tone.type = 'sine'; tone.frequency.value = 440 * Math.pow(2, (midi - 69) / 12) * partial;
          level.gain.value = [1,.23,.075,.025][i];
          tone.connect(level); level.connect(envelope);
          tone.start(time); tone.stop(time + 4);
          tone.onended = () => { tone.disconnect(); level.disconnect(); };
        });
        window.setTimeout(() => envelope.disconnect(), Math.max(0, (time - audio.currentTime + 5) * 1000));
      };
      let bar = 0; let next = audio.currentTime + .15;
      const schedule = () => {
        while (next < audio.currentTime + .5) {
          const chord = chords[bar % 4];
          note(chord[0], next, .16);
          [1,2,3,2,1,2].forEach((index, beat) => note(chord[index], next + beat * .8, .075));
          melody[bar % 4].forEach((pitch, beat) => note(pitch, next + beat * 1.2 + .04, .1));
          next += 4.8; bar++;
        }
      };
      schedule();
      engine.current = {audio, gain: master, timer: window.setInterval(schedule, 200)};
      setError(''); setPlaying(true);
    } catch {
      await audio.close(); setError('Sound could not start. Please try again.');
    }
  };
  return <div className="sound-control">
    <button className="sound-toggle" onClick={() => void start()} aria-pressed={playing}>
      {playing ? 'Pause piano' : 'Play piano'} <span aria-hidden="true">{playing ? 'Ⅱ' : '♫'}</span>
    </button>
    {playing && <label className="sound-volume">Volume <input aria-label="Piano volume" type="range" min="0" max="60" value={volume} onChange={event => {
      const value = Number(event.target.value); setVolume(value);
      const current = engine.current;
      current?.gain.gain.setTargetAtTime(value / 100 * .5, current.audio.currentTime, .1);
    }}/></label>}
    {error && <span role="status">{error}</span>}
  </div>;
}
