import type { ReactNode } from 'react';
import type { Palette, Project } from '../data/portfolio';

/**
 * Generated "key art" for thumbnails — layered gradients, light falloff and a motif.
 * No stock imagery: every card is art-directed from its palette.
 */
export function PosterBackdrop({ palette, children, className = '' }: { palette: Palette; children?: ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, ${palette.via} 0%, transparent 60%),
          radial-gradient(90% 80% at 0% 100%, ${palette.from} 0%, transparent 70%),
          linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/3 h-[140%] w-[70%] rotate-[18deg] opacity-40 blur-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}55, transparent)` }}
      />
      <div aria-hidden className="absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_4px)]" />
      {children}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
    </div>
  );
}

/** Motif illustrations for each Original, built from the project's own architecture. */
export function ProjectArt({ project, className = '' }: { project: Project; className?: string }) {
  const a = project.palette.accent;
  return (
    <PosterBackdrop palette={project.palette} className={className}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id={`g-${project.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={a} stopOpacity="0.55" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="290" cy="120" r="130" fill={`url(#g-${project.id})`} />
        {project.motif === 'physics' && (
          <g fill="none" stroke={a}>
            {/* Physics trajectory arc */}
            <path d="M 180 230 C 220 90, 310 80, 370 190" strokeWidth="1.5" strokeDasharray="6 6" strokeOpacity="0.4" />
            {/* Rigid body: angled box */}
            <rect x="200" y="130" width="54" height="54" rx="8" transform="rotate(22 227 157)" strokeWidth="2.5" strokeOpacity="0.85" />
            {/* Rigid body: circle with center and velocity vector */}
            <circle cx="288" cy="85" r="28" strokeWidth="2.5" strokeOpacity="0.9" />
            <circle cx="288" cy="85" r="4" fill={a} />
            <line x1="288" y1="85" x2="330" y2="60" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.9" />
            <path d="M 326 55 L 334 60 L 324 67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Elastic spring constraint between bodies */}
            <line x1="240" y1="135" x2="275" y2="105" strokeWidth="2" strokeDasharray="3 3" strokeOpacity="0.6" />
            {/* Simulation floor / barrier */}
            <line x1="180" y1="230" x2="380" y2="230" strokeWidth="3" strokeOpacity="0.75" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={i} x1={195 + i * 26} y1="230" x2={185 + i * 26} y2="242" strokeWidth="1.5" strokeOpacity="0.35" />
            ))}
            {/* Floating satellite particle */}
            <circle cx="340" cy="140" r="14" strokeWidth="1.8" strokeOpacity="0.7" />
          </g>
        )}
        {project.motif === 'chords' && (
          <g fill="none" stroke={a}>
            {/* Piano keyboard representation */}
            <g transform="translate(196 60)">
              {/* White keys */}
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <rect key={i} x={i * 24} y="0" width="22" height="74" rx="4" strokeWidth="1.8" strokeOpacity="0.8" fill={i === 2 || i === 4 ? a : 'none'} fillOpacity="0.15" />
              ))}
              {/* Black keys */}
              {[0, 1, 3, 4, 5].map((i) => (
                <rect key={i} x={15 + (i < 2 ? i * 24 : i * 24)} y="0" width="14" height="44" rx="2" fill={a} fillOpacity="0.75" stroke={a} strokeWidth="1.5" />
              ))}
            </g>
            {/* Harmonic audio sine waves */}
            <path d="M 170 180 Q 220 130 270 180 T 370 180" strokeWidth="2.5" strokeOpacity="0.85" />
            <path d="M 170 195 Q 220 160 270 195 T 370 195" strokeWidth="1.5" strokeOpacity="0.45" />
            <path d="M 170 210 Q 220 180 270 210 T 370 210" strokeWidth="1" strokeOpacity="0.25" />
            {/* Musical note symbol */}
            <g transform="translate(325 100)" strokeWidth="2">
              <circle cx="12" cy="30" r="8" fill={a} fillOpacity="0.7" />
              <circle cx="34" cy="24" r="8" fill={a} fillOpacity="0.7" />
              <line x1="19" y1="30" x2="19" y2="4" strokeLinecap="round" />
              <line x1="41" y1="24" x2="41" y2="0" strokeLinecap="round" />
              <path d="M 19 4 L 41 0" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>
        )}
        {project.motif === 'pulse' && (
          <g fill="none" stroke={a}>
            {/* EKG / Pulse line */}
            <path
              d="M 160 180 H 210 L 222 155 L 235 210 L 250 120 L 265 230 L 278 165 L 290 180 H 380"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.9"
            />
            {/* Mail / SMTP envelope */}
            <g transform="translate(230 50)">
              <rect x="0" y="0" width="76" height="50" rx="8" strokeWidth="2" strokeOpacity="0.8" />
              <path d="M 0 0 L 38 28 L 76 0" strokeWidth="2" strokeOpacity="0.8" />
            </g>
            {/* REST API / Cloud signal nodes */}
            <circle cx="340" cy="75" r="16" strokeWidth="1.8" strokeOpacity="0.7" />
            <circle cx="340" cy="75" r="6" fill={a} />
            <path d="M 306 75 H 324" strokeWidth="2" strokeDasharray="3 3" strokeOpacity="0.6" />
            {/* Automation flow ticks */}
            <line x1="190" y1="225" x2="350" y2="225" strokeWidth="1" strokeDasharray="12 6" strokeOpacity="0.4" />
          </g>
        )}
      </svg>
    </PosterBackdrop>
  );
}

/** Small fictional platform mark used in the nav and on cards. */
export function SeriesMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-label="J Series">
      <svg viewBox="0 0 24 32" className="h-[1.1em] w-auto" aria-hidden>
        <path d="M16 6v14c0 4.5-3 7-7 7-3.5 0-6-2-6.5-4.5" fill="none" stroke="#e5132b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-sans text-[0.62em] font-bold tracking-[0.36em] text-mist">SERIES</span>
    </span>
  );
}
