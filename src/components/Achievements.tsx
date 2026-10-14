import { motion } from 'framer-motion';
import { achievements } from '../data/portfolio';
import { EASE, SectionHeading, Tilt } from './fx';

function Laurel({ side }: { side: 'l' | 'r' }) {
  return (
    <svg viewBox="0 0 30 64" className={`h-14 w-auto text-[#d9b46a] ${side === 'r' ? '-scale-x-100' : ''}`} aria-hidden>
      <path d="M26 62C10 52 4 36 8 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {[10, 18, 26, 34, 42, 50].map((y, i) => (
        <ellipse key={y} cx={i < 2 ? 9 : 8 + i * 1.6} cy={y} rx="5" ry="2.2" fill="currentColor" opacity="0.85" transform={`rotate(-40 ${8 + i * 1.6} ${y})`} />
      ))}
    </svg>
  );
}

export default function Achievements() {
  return (
    <>
      <SectionHeading kicker="Awards season" title="Top Moments" />

      <div className="gutter mx-auto max-w-2xl [perspective:1400px]">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 50, rotateX: 18 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
          >
            <Tilt max={8} className="group rounded-2xl">
              <article className="relative flex min-h-[380px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,#2a1f10,#0d0b08_60%,#07070a)] px-6 py-10 text-center ring-1 ring-[#d9b46a]/20 transition duration-500 group-hover:ring-[#d9b46a]/60">
                <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9b46a]/70 to-transparent" />
                <div aria-hidden className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#d9b46a]/10 blur-3xl transition duration-700 group-hover:bg-[#d9b46a]/25" />
                <div className="relative flex items-center gap-1">
                  <Laurel side="l" />
                  <div className="px-2">
                    <p className="text-[10px] font-bold uppercase leading-tight tracking-[0.28em] text-[#d9b46a]">{a.laurel}</p>
                  </div>
                  <Laurel side="r" />
                </div>
                <h3 className="relative mt-6 font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-[0.92] tracking-wide text-bone">{a.title}</h3>
                <p className="relative mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9b46a] sm:text-sm">{a.org}</p>
                <p className="relative mt-5 max-w-md text-sm leading-relaxed text-bone/80 sm:text-base">{a.detail}</p>
                {a.link && (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="relative mt-6 inline-flex min-h-10 items-center gap-1 text-xs font-semibold tracking-wide text-bone underline decoration-[#d9b46a]/60 underline-offset-4 hover:decoration-[#d9b46a]"
                  >
                    View certificate ↗
                  </a>
                )}
              </article>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </>
  );
}
