import type { CSSProperties, ReactNode } from 'react';
import type {
  DesignSystem,
  Page,
  SlideMeta,
  SlideTransition,
} from '@open-slide/core';
import {
  MorphElement,
  Step,
  Steps,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Outfit:wght@400;500;600;700&display=swap';
const FONT_LINK_ID = 'osd-webfont-git-for-ux';
if (typeof document !== 'undefined' && !document.getElementById(FONT_LINK_ID)) {
  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

export const design: DesignSystem = {
  palette: { bg: '#12141C', text: '#F3EEE4', accent: '#FF5A3C' },
  fonts: {
    display: '"Fraunces", "Iowan Old Style", Palatino, Georgia, serif',
    body: '"Outfit", "Avenir Next", "Segoe UI", system-ui, sans-serif',
  },
  typeScale: { hero: 128, body: 34 },
  radius: 22,
};

const muted = '#8E96A8';
const surface = '#1C2030';
const surfaceHi = '#242A3B';
const line = '#2E364C';
const porcelain = '#F3EEE4';
const mint = '#3DDC97';
const gold = '#E8C07A';
const ink = '#12141C';

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative',
  overflow: 'hidden',
};

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 200,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const morphCut: SlideTransition = {
  duration: 280,
  exit: {
    duration: 224,
    easing: EASE_IN,
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
  },
  enter: {
    duration: 308,
    delay: 112,
    easing: EASE_OUT,
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
  },
  morph: { duration: 868, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
};

const breath: SlideTransition = {
  duration: 460,
  exit: {
    duration: 180,
    easing: EASE_IN,
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
  },
  enter: {
    duration: 240,
    delay: 300,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const css = `
  @keyframes gux-up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes gux-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes gux-float {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-18px); }
  }
  @keyframes gux-orb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%      { transform: translate(40px, -24px) scale(1.08); }
  }
  @keyframes gux-pulse {
    0%, 100% { opacity: 0.35; transform: scale(1); }
    50%      { opacity: 0.85; transform: scale(1.06); }
  }
  @keyframes gux-shutter {
    0%, 72%, 100% { opacity: 0; }
    76% { opacity: 0.55; }
    82% { opacity: 0; }
  }
  @keyframes gux-draw {
    from { stroke-dashoffset: 280; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes gux-flow {
    0%   { transform: translateX(0); opacity: 0; }
    18%  { opacity: 1; }
    82%  { opacity: 1; }
    100% { transform: translateX(86px); opacity: 0; }
  }
  @keyframes gux-flow-back {
    0%   { transform: translateX(0); opacity: 0; }
    18%  { opacity: 1; }
    82%  { opacity: 1; }
    100% { transform: translateX(-86px); opacity: 0; }
  }
  @keyframes gux-grow-x {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes gux-branch {
    from { transform: scale(0.2); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
  }
`;

const Styles = () => <style>{css}</style>;

const play = (
  live: boolean,
  name: string,
  duration = '700ms',
  delay = '0ms',
  extra = '',
) => (live ? `${name} ${duration} ${EASE_OUT} ${delay} both ${extra}` : 'none');

const Shell = ({
  children,
  darkFooter = true,
}: {
  children: ReactNode;
  darkFooter?: boolean;
}) => (
  <div style={fill}>
    <Styles />
    <div
      style={{
        position: 'absolute',
        width: 720,
        height: 720,
        left: -180,
        top: -240,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(255,90,60,0.18) 0%, rgba(255,90,60,0) 68%)',
        animation: 'gux-orb 14s ease-in-out infinite',
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        position: 'absolute',
        width: 640,
        height: 640,
        right: -160,
        bottom: -220,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(232,192,122,0.12) 0%, rgba(232,192,122,0) 70%)',
        animation: 'gux-orb 18s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }}
    />
    {children}
    <Footer dim={!darkFooter} />
  </div>
);

const Footer = ({ dim }: { dim: boolean }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 42,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 20,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: dim ? 'rgba(243,238,228,0.28)' : muted,
        fontWeight: 500,
      }}
    >
      <span>Git for UX</span>
      <span
        style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.08em' }}
      >
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Eyebrow = ({
  children,
  live,
  delay = '0ms',
}: {
  children: ReactNode;
  live: boolean;
  delay?: string;
}) => (
  <div
    style={{
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--osd-accent)',
      animation: play(live, 'gux-up', '600ms', delay),
    }}
  >
    {children}
  </div>
);

const Polaroid = ({
  caption,
  stamp,
  width,
  height,
  style,
}: {
  caption: string;
  stamp: string;
  width: number;
  height: number;
  style?: CSSProperties;
}) => (
  <div
    style={{
      width,
      height,
      background: porcelain,
      color: ink,
      padding: 18,
      boxShadow: '0 28px 60px rgba(0,0,0,0.38)',
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}
  >
    <div
      style={{
        flex: 1,
        background: 'linear-gradient(160deg, #2A3148 0%, #171A24 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(90deg, rgba(243,238,228,0.04) 0 18px, transparent 18px 36px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 28,
          right: 28,
          top: '42%',
          height: 8,
          background: 'var(--osd-accent)',
          boxShadow: '0 0 28px rgba(255,90,60,0.65)',
        }}
      />
    </div>
    <div
      style={{
        padding: '18px 8px 6px',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 26,
        fontWeight: 700,
      }}
    >
      {caption}
    </div>
    <div
      style={{
        padding: '0 8px',
        fontSize: 18,
        color: '#6B7280',
        letterSpacing: '0.04em',
      }}
    >
      {stamp}
    </div>
  </div>
);

const Pill = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 22px',
      borderRadius: 999,
      background: 'rgba(255,90,60,0.12)',
      color: 'var(--osd-accent)',
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: '0.04em',
    }}
  >
    {children}
  </div>
);

const Card = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      background: surface,
      border: `1px solid ${line}`,
      borderRadius: 'var(--osd-radius)',
      boxShadow: '0 24px 48px rgba(0,0,0,0.28)',
      ...style,
    }}
  >
    {children}
  </div>
);

const Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      {live ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(243,238,228,0.9)',
            opacity: 0,
            animation: 'gux-shutter 4.8s ease-in-out 1.1s both',
            pointerEvents: 'none',
            zIndex: 4,
          }}
        />
      ) : null}
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 200,
          width: 980,
          zIndex: 2,
        }}
      >
        <Eyebrow live={live}>A 90-minute studio for designers</Eyebrow>
        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 'var(--osd-size-hero)',
            fontWeight: 700,
            lineHeight: 0.98,
            letterSpacing: '-0.035em',
            margin: '28px 0 0',
            textWrap: 'balance',
            animation: play(live, 'gux-up', '800ms', '80ms'),
          }}
        >
          Git, without
          <br />
          the fear.
        </h1>
        <p
          style={{
            fontSize: 36,
            lineHeight: 1.45,
            color: muted,
            maxWidth: 820,
            margin: '36px 0 0',
            animation: play(live, 'gux-up', '800ms', '160ms'),
          }}
        >
          Today you will open a pull request. No terminal required.
        </p>
        <div
          style={{
            marginTop: 48,
            animation: play(live, 'gux-up', '700ms', '240ms'),
          }}
        >
          <Pill>Must-know concepts · then we ship</Pill>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 140,
          top: 180,
          width: 520,
          height: 720,
          animation: live ? 'gux-float 7s ease-in-out 0.6s infinite' : 'none',
        }}
      >
        <Polaroid
          caption="empty-state copy"
          stamp="v3 · draft"
          width={300}
          height={360}
          style={{
            position: 'absolute',
            left: 0,
            top: 80,
            transform: 'rotate(-11deg)',
            opacity: 0.72,
          }}
        />
        <Polaroid
          caption="primary button"
          stamp="v2 · parked"
          width={300}
          height={360}
          style={{
            position: 'absolute',
            left: 170,
            top: 40,
            transform: 'rotate(8deg)',
            opacity: 0.86,
          }}
        />
        <Polaroid
          caption="Fix empty-state CTA"
          stamp="snapshot · just now"
          width={340}
          height={410}
          style={{
            position: 'absolute',
            left: 70,
            top: 170,
            transform: 'rotate(-2deg)',
          }}
        />
      </div>
    </Shell>
  );
};

const Outcomes: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '120px 120px 0' }}>
        <Eyebrow live={live}>By the end of 90 minutes</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 72,
            fontWeight: 700,
            margin: '20px 0 56px',
            letterSpacing: '-0.03em',
            animation: play(live, 'gux-up', '700ms', '60ms'),
          }}
        >
          You will be able to…
        </h2>
        <Steps>
          <Step>
            <OutcomeRow
              n="01"
              title="Split Git from GitHub."
              body="Tool vs the place the team shares."
            />
          </Step>
          <Step>
            <OutcomeRow
              n="02"
              title="Treat a commit as a snapshot."
              body="Cmd+S is not a checkpoint."
            />
          </Step>
          <Step>
            <OutcomeRow
              n="03"
              title="Draft on a branch."
              body="Never paint on the production frame."
            />
          </Step>
          <Step>
            <OutcomeRow
              n="04"
              title="Run the daily loop once."
              body="Pull · branch · edit · commit · push · PR."
            />
          </Step>
          <Step>
            <OutcomeRow
              n="05"
              title="Stop when it looks scary."
              body="Nothing is deleted. Ask. Then continue."
            />
          </Step>
        </Steps>
      </div>
    </Shell>
  );
};

const OutcomeRow = ({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) => (
  <div
    style={{
      display: 'flex',
      gap: 28,
      alignItems: 'baseline',
      marginBottom: 28,
    }}
  >
    <div
      style={{
        width: 72,
        fontSize: 22,
        letterSpacing: '0.16em',
        color: 'var(--osd-accent)',
        fontWeight: 600,
      }}
    >
      {n}
    </div>
    <div>
      <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }}>
        {title}
      </div>
      <div style={{ fontSize: 26, color: muted, marginTop: 6 }}>{body}</div>
    </div>
  </div>
);

const WhyGit: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '140px 120px 0', display: 'flex', gap: 80 }}>
        <div style={{ width: 920 }}>
          <Eyebrow live={live}>Concept 01</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              margin: '24px 0 0',
              textWrap: 'balance',
              animation: play(live, 'gux-up', '700ms', '80ms'),
            }}
          >
            Git is Figma version history — for the whole project.
          </h2>
          <p
            style={{
              fontSize: 34,
              lineHeight: 1.5,
              color: muted,
              marginTop: 36,
              maxWidth: 860,
              animation: play(live, 'gux-up', '700ms', '160ms'),
            }}
          >
            It does not replace Figma. When a design becomes product — copy,
            tokens, icons — Git is the shared history of that product.
          </p>
        </div>
        <Card
          style={{
            width: 620,
            height: 640,
            padding: 40,
            animation: play(live, 'gux-up', '800ms', '180ms'),
          }}
        >
          <div
            style={{
              fontSize: 20,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: muted,
            }}
          >
            Figma
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, marginTop: 12 }}>
            Version history
          </div>
          <div style={{ marginTop: 28 }}>
            <HistRow name="Empty state — corrected CTA" who="you" />
            <HistRow name="Final_FINAL_v3" who="oops" dim />
            <HistRow name="Alert icon, 24px" who="priya" />
          </div>
          <div style={{ height: 1, background: line, margin: '28px 0' }} />
          <div
            style={{
              fontSize: 20,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: muted,
            }}
          >
            GitHub
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, marginTop: 12 }}>
            Commit list
          </div>
          <div style={{ marginTop: 28 }}>
            <HistRow name="Fix primary button label" who="you" accent />
            <HistRow name="Update alert icon" who="priya" />
            <HistRow name="Token: --color-danger" who="alex" />
          </div>
        </Card>
      </div>
    </Shell>
  );
};

const HistRow = ({
  name,
  who,
  dim,
  accent,
}: {
  name: string;
  who: string;
  dim?: boolean;
  accent?: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
      opacity: dim ? 0.4 : 1,
    }}
  >
    <span
      style={{ fontSize: 24, color: accent ? 'var(--osd-accent)' : porcelain }}
    >
      {name}
    </span>
    <span style={{ fontSize: 20, color: muted }}>{who}</span>
  </div>
);

const Words: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '110px 120px 0' }}>
        <Eyebrow live={live}>The #1 mix-up</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 68,
            margin: '18px 0 48px',
            letterSpacing: '-0.03em',
            animation: play(live, 'gux-up', '700ms', '60ms'),
          }}
        >
          Three words. Three jobs.
        </h2>
        <div style={{ display: 'flex', gap: 36 }}>
          <WordCard
            live={live}
            delay="80ms"
            kicker="The camera"
            title="Git"
            body="The tool on your laptop. It takes snapshots of the project."
            analog="Figma the app"
          />
          <WordCard
            live={live}
            delay="180ms"
            kicker="The album"
            title="GitHub"
            body="The website where the shared copy lives."
            analog="Figma cloud"
          />
          <WordCard
            live={live}
            delay="280ms"
            kicker="One album"
            title="Repo"
            body="One project folder, plus its entire history."
            analog="One Figma file"
          />
        </div>
      </div>
    </Shell>
  );
};

const WordCard = ({
  kicker,
  title,
  body,
  analog,
  live,
  delay,
}: {
  kicker: string;
  title: string;
  body: string;
  analog: string;
  live: boolean;
  delay: string;
}) => (
  <Card
    style={{
      width: 528,
      height: 620,
      padding: '48px 44px',
      animation: play(live, 'gux-up', '750ms', delay),
    }}
  >
    <div
      style={{
        fontSize: 22,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--osd-accent)',
      }}
    >
      {kicker}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 84,
        fontWeight: 700,
        marginTop: 28,
        letterSpacing: '-0.04em',
      }}
    >
      {title}
    </div>
    <p style={{ fontSize: 30, lineHeight: 1.45, color: muted, marginTop: 28 }}>
      {body}
    </p>
    <div
      style={{
        marginTop: 40,
        paddingTop: 28,
        borderTop: `1px solid ${line}`,
        fontSize: 24,
        color: gold,
      }}
    >
      Like {analog}
    </div>
  </Card>
);

const TwoCopies: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '110px 120px 0' }}>
        <Eyebrow live={live}>Local vs remote</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 64,
            margin: '16px 0 40px',
            letterSpacing: '-0.03em',
            animation: play(live, 'gux-up', '700ms', '60ms'),
          }}
        >
          Two copies. They are not magic.
        </h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            marginTop: 20,
          }}
        >
          <CopyPane
            live={live}
            delay="100ms"
            label="Your laptop"
            sub="local"
            detail="Until you push, work lives only here."
          />
          <ArrowPair live={live} />
          <CopyPane
            live={live}
            delay="200ms"
            label="GitHub.com"
            sub="remote"
            detail="The shared copy the team trusts."
            gold
          />
          <ArrowPair live={live} />
          <CopyPane
            live={live}
            delay="300ms"
            label="A teammate"
            sub="their laptop"
            detail="They pull to see your snapshots."
          />
        </div>
      </div>
    </Shell>
  );
};

const CopyPane = ({
  label,
  sub,
  detail,
  live,
  delay,
  gold: isGold,
}: {
  label: string;
  sub: string;
  detail: string;
  live: boolean;
  delay: string;
  gold?: boolean;
}) => (
  <Card
    style={{
      width: 460,
      height: 520,
      padding: 40,
      animation: play(live, 'gux-up', '700ms', delay),
      outline: isGold ? `2px solid ${gold}` : undefined,
      outlineOffset: -2,
    }}
  >
    <div
      style={{
        width: 72,
        height: 52,
        borderRadius: 10,
        background: isGold ? 'rgba(232,192,122,0.16)' : surfaceHi,
        border: `1px solid ${line}`,
        marginBottom: 36,
      }}
    />
    <div
      style={{
        fontSize: 22,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: isGold ? gold : muted,
      }}
    >
      {sub}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 44,
        fontWeight: 700,
        marginTop: 12,
      }}
    >
      {label}
    </div>
    <p style={{ fontSize: 26, lineHeight: 1.45, color: muted, marginTop: 24 }}>
      {detail}
    </p>
  </Card>
);

const ArrowPair = ({ live }: { live: boolean }) => (
  <div style={{ width: 90, height: 80, position: 'relative', flexShrink: 0 }}>
    <div
      style={{
        position: 'absolute',
        top: 18,
        left: 0,
        right: 0,
        height: 2,
        background: line,
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: 12,
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: 'var(--osd-accent)',
        animation: live ? 'gux-flow 1.8s ease-in-out infinite' : 'none',
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: 18,
        left: 0,
        right: 0,
        height: 2,
        background: line,
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: 12,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: mint,
        animation: live
          ? 'gux-flow-back 1.8s ease-in-out 0.4s infinite'
          : 'none',
      }}
    />
  </div>
);

const ThreeVerbs: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '120px 120px 0' }}>
        <Eyebrow live={live}>The three verbs</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 68,
            margin: '16px 0 52px',
            letterSpacing: '-0.03em',
            animation: play(live, 'gux-up', '700ms', '60ms'),
          }}
        >
          You decide when they sync.
        </h2>
        <div style={{ display: 'flex', gap: 28 }}>
          <VerbCard
            live={live}
            delay="80ms"
            n="01"
            title="Clone"
            body="First-time download of the whole repo."
            analog="Get a local copy of the file."
          />
          <VerbCard
            live={live}
            delay="160ms"
            n="02"
            title="Pull"
            body="Get the latest snapshots from GitHub."
            analog="Refresh. Get updates."
          />
          <VerbCard
            live={live}
            delay="240ms"
            n="03"
            title="Push"
            body="Send your snapshots up to GitHub."
            analog="Publish your version."
          />
        </div>
      </div>
    </Shell>
  );
};

const VerbCard = ({
  n,
  title,
  body,
  analog,
  live,
  delay,
}: {
  n: string;
  title: string;
  body: string;
  analog: string;
  live: boolean;
  delay: string;
}) => (
  <Card
    style={{
      width: 528,
      height: 520,
      padding: 44,
      animation: play(live, 'gux-up', '750ms', delay),
    }}
  >
    <div
      style={{
        fontSize: 22,
        color: 'var(--osd-accent)',
        letterSpacing: '0.18em',
      }}
    >
      {n}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 72,
        fontWeight: 700,
        marginTop: 20,
      }}
    >
      {title}
    </div>
    <p
      style={{
        fontSize: 30,
        lineHeight: 1.45,
        color: porcelain,
        marginTop: 28,
      }}
    >
      {body}
    </p>
    <p style={{ fontSize: 24, color: muted, marginTop: 24 }}>{analog}</p>
  </Card>
);

const NotDocs: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '180px 140px 0' }}>
        <Eyebrow live={live}>Hold this</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 92,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            maxWidth: 1500,
            margin: '28px 0 0',
            textWrap: 'balance',
            animation: play(live, 'gux-up', '800ms', '80ms'),
          }}
        >
          Git is not Google Docs.
        </h2>
        <p
          style={{
            fontSize: 38,
            color: muted,
            marginTop: 40,
            maxWidth: 1200,
            lineHeight: 1.45,
            animation: play(live, 'gux-up', '700ms', '180ms'),
          }}
        >
          Until you push, GitHub has yesterday. Until you pull, you might too.
        </p>
      </div>
    </Shell>
  );
};

const SaveVsCommit: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '130px 120px 0', width: 1100 }}>
        <Eyebrow live={live}>Concept 04 · the heart of Git</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 76,
            letterSpacing: '-0.03em',
            margin: '20px 0 0',
            animation: play(live, 'gux-up', '700ms', '60ms'),
          }}
        >
          Save ≠ commit.
        </h2>
        <p
          style={{
            fontSize: 34,
            color: muted,
            marginTop: 28,
            lineHeight: 1.5,
            maxWidth: 920,
            animation: play(live, 'gux-up', '700ms', '140ms'),
          }}
        >
          Cmd+S writes the file. A commit takes a named photograph of the whole
          project — who, when, and why.
        </p>
        <p
          style={{
            fontSize: 30,
            marginTop: 36,
            animation: play(live, 'gux-up', '700ms', '220ms'),
          }}
        >
          You can save fifty times and still have zero checkpoints.
        </p>
      </div>
      <MorphElement id="snapshot">
        <div
          style={{
            position: 'absolute',
            left: 1220,
            top: 220,
            width: 480,
            height: 580,
          }}
        >
          <Polaroid
            caption="Fix empty-state CTA"
            stamp="commit · a named snapshot"
            width={480}
            height={580}
          />
        </div>
      </MorphElement>
    </Shell>
  );
};

const ThreePlaces: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '110px 120px 0' }}>
        <Eyebrow live={live}>Three places a file can live</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 58,
            margin: '14px 0 40px',
            letterSpacing: '-0.03em',
            animation: play(live, 'gux-up', '600ms'),
          }}
        >
          Working · Staging · History
        </h2>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          <PlaceCol
            n="1"
            title="Working folder"
            analog="The artboard you are editing."
            body="Files on disk. Dirty, unsaved-to-Git, yours."
          />
          <PlaceCol
            n="2"
            title="Staging"
            analog="You selected which layers go in."
            body="The files you chose for this photograph."
          />
          <div style={{ width: 540 }}>
            <div
              style={{
                fontSize: 22,
                color: 'var(--osd-accent)',
                letterSpacing: '0.14em',
                marginBottom: 16,
              }}
            >
              3 · History
            </div>
            <div style={{ fontSize: 36, fontWeight: 600, marginBottom: 12 }}>
              Named snapshots
            </div>
            <div style={{ fontSize: 24, color: muted, marginBottom: 24 }}>
              The locked versions you can return to.
            </div>
            <MorphElement id="snapshot">
              <div style={{ width: 430, height: 430 }}>
                <Polaroid
                  caption="Fix empty-state CTA"
                  stamp="now it lives in history"
                  width={430}
                  height={430}
                />
              </div>
            </MorphElement>
          </div>
        </div>
      </div>
    </Shell>
  );
};
ThreePlaces.transition = morphCut;

const PlaceCol = ({
  n,
  title,
  analog,
  body,
}: {
  n: string;
  title: string;
  body: string;
  analog: string;
}) => (
  <Card style={{ width: 500, height: 620, padding: 40 }}>
    <div
      style={{
        fontSize: 22,
        color: 'var(--osd-accent)',
        letterSpacing: '0.16em',
      }}
    >
      {n}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 44,
        fontWeight: 700,
        marginTop: 20,
      }}
    >
      {title}
    </div>
    <p style={{ fontSize: 28, color: gold, marginTop: 28, lineHeight: 1.4 }}>
      {analog}
    </p>
    <p style={{ fontSize: 26, color: muted, marginTop: 24, lineHeight: 1.45 }}>
      {body}
    </p>
  </Card>
);

const Messages: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '120px 120px 0' }}>
        <Eyebrow live={live}>Commit messages</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 64,
            margin: '16px 0 48px',
            letterSpacing: '-0.03em',
          }}
        >
          Write it for a teammate.
        </h2>
        <div style={{ display: 'flex', gap: 48 }}>
          <Card
            style={{
              width: 780,
              height: 560,
              padding: 48,
              animation: play(live, 'gux-up', '700ms', '80ms'),
            }}
          >
            <div
              style={{
                fontSize: 22,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: muted,
              }}
            >
              Roast these
            </div>
            <MsgRow bad text="updates" />
            <MsgRow bad text="asdf" />
            <MsgRow bad text="Final_FINAL_v3" />
            <MsgRow bad text="fix stuff" />
          </Card>
          <Card
            style={{
              width: 780,
              height: 560,
              padding: 48,
              outline: `2px solid ${mint}`,
              outlineOffset: -2,
              animation: play(live, 'gux-up', '700ms', '180ms'),
            }}
          >
            <div
              style={{
                fontSize: 22,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: mint,
              }}
            >
              Keep these
            </div>
            <MsgRow text="Fix primary button label on empty state" />
            <MsgRow text="Update alert icon to 24px" />
            <MsgRow text="Soften danger token for dark mode" />
            <MsgRow text="Rewrite empty-state copy" />
          </Card>
        </div>
      </div>
    </Shell>
  );
};

const MsgRow = ({ text, bad }: { text: string; bad?: boolean }) => (
  <div
    style={{
      marginTop: 28,
      padding: '18px 22px',
      borderRadius: 14,
      background: bad ? 'rgba(255,90,60,0.08)' : 'rgba(61,220,151,0.08)',
      fontSize: 28,
      color: bad ? '#FF8A76' : porcelain,
      textDecoration: bad ? 'line-through' : 'none',
    }}
  >
    {text}
  </div>
);

const Branch: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '140px 120px 0', width: 1680 }}>
        <Eyebrow live={live}>Concept 05</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 72,
            letterSpacing: '-0.03em',
            margin: '20px 0 0',
            textWrap: 'balance',
            animation: play(live, 'gux-up', '700ms', '60ms'),
          }}
        >
          A branch is a duplicate frame.
        </h2>
        <p
          style={{
            fontSize: 36,
            color: muted,
            marginTop: 32,
            maxWidth: 1300,
            lineHeight: 1.45,
            animation: play(live, 'gux-up', '700ms', '140ms'),
          }}
        >
          Same project, different timeline. Experiment without wrecking
          production. If it works, you bring it back.
        </p>
        <div
          style={{
            marginTop: 48,
            animation: play(live, 'gux-up', '700ms', '220ms'),
          }}
        >
          <Pill>main is production · your branch is the draft</Pill>
        </div>
      </div>
    </Shell>
  );
};

const BranchDiagram: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '110px 120px 0' }}>
        <Eyebrow live={live}>Watch the files</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 58,
            margin: '14px 0 28px',
            letterSpacing: '-0.03em',
          }}
        >
          Switching branches changes the artboard.
        </h2>
        <p style={{ fontSize: 28, color: muted, marginBottom: 48 }}>
          The change disappeared? You did not delete it. You are looking at a
          different frame.
        </p>
        <div style={{ position: 'relative', height: 480 }}>
          <svg width={1680} height={420} viewBox="0 0 1680 420">
            <line
              x1="80"
              y1="130"
              x2="1180"
              y2="130"
              stroke={gold}
              strokeWidth="6"
            />
            <circle cx="80" cy="130" r="16" fill={gold} />
            <circle cx="380" cy="130" r="16" fill={gold} />
            <circle cx="680" cy="130" r="16" fill={gold} />
            <text
              x="80"
              y="88"
              fill={gold}
              fontSize="22"
              fontFamily="Outfit, sans-serif"
              letterSpacing="2"
            >
              main
            </text>
            <g
              style={{
                transformOrigin: '680px 130px',
                animation: live
                  ? 'gux-branch 800ms cubic-bezier(0,0,0.2,1) 700ms both'
                  : undefined,
              }}
            >
              <path
                d="M680 130 C 680 130, 760 300, 980 300"
                stroke="#FF5A3C"
                strokeWidth="6"
                fill="none"
              />
              <circle cx="980" cy="300" r="16" fill="#FF5A3C" />
              <circle cx="1280" cy="300" r="16" fill="#FF5A3C" />
              <line
                x1="980"
                y1="300"
                x2="1280"
                y2="300"
                stroke="#FF5A3C"
                strokeWidth="6"
              />
              <text
                x="980"
                y="360"
                fill="#FF5A3C"
                fontSize="22"
                fontFamily="Outfit, sans-serif"
              >
                yourname / empty-state-copy
              </text>
            </g>
          </svg>
        </div>
      </div>
    </Shell>
  );
};

const Loop: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '100px 120px 0' }}>
        <Eyebrow live={live}>Memorize this. Recite it.</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 56,
            margin: '12px 0 36px',
            letterSpacing: '-0.03em',
          }}
        >
          The only loop that matters today.
        </h2>
        <div style={{ display: 'flex', gap: 18 }}>
          <LoopStep
            live={live}
            delay="60ms"
            n="1"
            title="Pull"
            body="Latest main"
          />
          <LoopStep
            live={live}
            delay="120ms"
            n="2"
            title="Branch"
            body="Draft from main"
          />
          <LoopStep
            live={live}
            delay="180ms"
            n="3"
            title="Edit"
            body="Change a file"
          />
          <LoopStep
            live={live}
            delay="240ms"
            n="4"
            title="Commit"
            body="Named snapshot"
          />
          <LoopStep
            live={live}
            delay="300ms"
            n="5"
            title="Push"
            body="Send to GitHub"
          />
          <LoopStep
            live={live}
            delay="360ms"
            n="6"
            title="PR"
            body="Ask for review"
          />
        </div>
      </div>
    </Shell>
  );
};

const LoopStep = ({
  n,
  title,
  body,
  live,
  delay,
}: {
  n: string;
  title: string;
  body: string;
  live: boolean;
  delay: string;
}) => (
  <Card
    style={{
      width: 268,
      height: 580,
      padding: '36px 28px',
      animation: play(live, 'gux-up', '700ms', delay),
    }}
  >
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'rgba(255,90,60,0.14)',
        color: 'var(--osd-accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        fontWeight: 700,
      }}
    >
      {n}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 44,
        fontWeight: 700,
        marginTop: 48,
        letterSpacing: '-0.03em',
      }}
    >
      {title}
    </div>
    <div style={{ fontSize: 24, color: muted, marginTop: 20, lineHeight: 1.4 }}>
      {body}
    </div>
  </Card>
);

const LabOne: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '110px 120px 0' }}>
        <Eyebrow live={live}>Lab 01 · 20 minutes</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 68,
            margin: '16px 0 40px',
            letterSpacing: '-0.03em',
          }}
        >
          Do the loop with your hands.
        </h2>
        <div style={{ display: 'flex', gap: 24 }}>
          <LabCard
            n="1"
            title="Clone"
            body="Open GitHub Desktop. File → Clone. Pick the workshop repo."
          />
          <LabCard
            n="2"
            title="Branch"
            body="Current branch → New branch. Name it yourname/first-pr."
          />
          <LabCard
            n="3"
            title="Edit"
            body="Change one line in copy/empty-state.md. Save the file."
          />
          <LabCard
            n="4"
            title="Commit"
            body="Check the file. Write a real message. Click Commit."
          />
        </div>
      </div>
    </Shell>
  );
};

const LabCard = ({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) => (
  <Card style={{ width: 396, height: 520, padding: 36 }}>
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'var(--osd-accent)',
        color: ink,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: 22,
      }}
    >
      {n}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 40,
        fontWeight: 700,
        marginTop: 28,
      }}
    >
      {title}
    </div>
    <p style={{ fontSize: 26, lineHeight: 1.45, color: muted, marginTop: 20 }}>
      {body}
    </p>
  </Card>
);

const PullRequest: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '150px 120px 0', maxWidth: 1500 }}>
        <Eyebrow live={live}>Concept 06</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 76,
            letterSpacing: '-0.03em',
            margin: '20px 0 0',
            textWrap: 'balance',
            animation: play(live, 'gux-up', '700ms', '60ms'),
          }}
        >
          A pull request is a critique, not a ritual.
        </h2>
        <p
          style={{
            fontSize: 36,
            color: muted,
            marginTop: 36,
            lineHeight: 1.5,
            animation: play(live, 'gux-up', '700ms', '160ms'),
          }}
        >
          You do not overwrite production. You present the change, people
          comment, then it gets accepted.
        </p>
      </div>
    </Shell>
  );
};

const Diff: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '110px 120px 0' }}>
        <Eyebrow live={live}>How to read a diff</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 58,
            margin: '14px 0 40px',
            letterSpacing: '-0.03em',
          }}
        >
          Red left. Green arrived.
        </h2>
        <Card
          style={{
            height: 620,
            padding: 0,
            overflow: 'hidden',
            animation: play(live, 'gux-up', '700ms', '80ms'),
          }}
        >
          <div
            style={{
              height: 64,
              padding: '0 32px',
              display: 'flex',
              alignItems: 'center',
              borderBottom: `1px solid ${line}`,
              color: muted,
              fontSize: 22,
              letterSpacing: '0.08em',
            }}
          >
            copy/empty-state.md
          </div>
          <DiffLine gone text="Nothing here yet. Try again later." />
          <DiffLine
            add
            text="No clusters yet. Create one to see health, capacity, and alerts."
          />
          <DiffLine text="" />
          <DiffLine gone text="Click continue." />
          <DiffLine add text="Create cluster" />
          <div style={{ padding: '32px 40px', fontSize: 24, color: muted }}>
            You can review copy and tokens here without running the product.
          </div>
        </Card>
      </div>
    </Shell>
  );
};

const DiffLine = ({
  text,
  add,
  gone,
}: {
  text: string;
  add?: boolean;
  gone?: boolean;
}) => (
  <div
    style={{
      padding: '16px 40px',
      fontSize: 28,
      background: add
        ? 'rgba(61,220,151,0.12)'
        : gone
          ? 'rgba(255,90,60,0.12)'
          : 'transparent',
      color: add ? mint : gone ? '#FF8A76' : porcelain,
      display: 'flex',
      gap: 24,
      fontFamily: '"SF Mono", ui-monospace, Menlo, monospace',
    }}
  >
    <span style={{ width: 24, opacity: 0.7 }}>
      {add ? '+' : gone ? '−' : ' '}
    </span>
    <span>{text || ' '}</span>
  </div>
);

const PrTemplate: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '110px 120px 0' }}>
        <Eyebrow live={live}>Steal this</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 60,
            margin: '14px 0 36px',
            letterSpacing: '-0.03em',
          }}
        >
          Three lines. A screenshot.
        </h2>
        <Card
          style={{
            padding: 48,
            height: 620,
            animation: play(live, 'gux-up', '700ms', '80ms'),
          }}
        >
          <PrBlock k="What" v="One sentence: what changed." />
          <PrBlock k="Why" v="One sentence: why it matters for the user." />
          <PrBlock k="Screenshots" v="Before / after, if it is visual." />
        </Card>
      </div>
    </Shell>
  );
};

const PrBlock = ({ k, v }: { k: string; v: string }) => (
  <div style={{ marginBottom: 48 }}>
    <div
      style={{
        fontSize: 22,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--osd-accent)',
      }}
    >
      {k}
    </div>
    <div style={{ fontSize: 36, marginTop: 12 }}>{v}</div>
  </div>
);

const LabTwo: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '110px 120px 0' }}>
        <Eyebrow live={live}>Lab 02 · ship it</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 68,
            margin: '16px 0 40px',
            letterSpacing: '-0.03em',
          }}
        >
          Push, then open the PR.
        </h2>
        <div style={{ display: 'flex', gap: 24 }}>
          <LabCard
            n="1"
            title="Push"
            body="In GitHub Desktop, Publish branch / Push origin."
          />
          <LabCard
            n="2"
            title="Open PR"
            body="Create Pull Request. Paste the three-line template."
          />
          <LabCard
            n="3"
            title="Screenshot"
            body="Drop a before/after if the change is visual."
          />
          <LabCard
            n="4"
            title="Comment"
            body="Leave one specific note on a neighbor’s PR."
          />
        </div>
      </div>
    </Shell>
  );
};

const Conflicts: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '130px 120px 0', display: 'flex', gap: 80 }}>
        <div style={{ width: 980 }}>
          <Eyebrow live={live}>Concept 07</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 72,
              letterSpacing: '-0.03em',
              margin: '20px 0 0',
              textWrap: 'balance',
              animation: play(live, 'gux-up', '700ms', '60ms'),
            }}
          >
            A conflict is Git asking. Not deleting.
          </h2>
          <p
            style={{
              fontSize: 34,
              color: muted,
              marginTop: 32,
              lineHeight: 1.5,
            }}
          >
            Two people edited the same lines. Git will not guess. Both versions
            are still there.
          </p>
          <div style={{ marginTop: 40 }}>
            <Pill>First times: stop, then ask</Pill>
          </div>
        </div>
        <Card
          style={{
            width: 620,
            height: 620,
            padding: 40,
            animation: play(live, 'gux-up', '800ms', '160ms'),
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: muted,
              letterSpacing: '0.12em',
              marginBottom: 24,
            }}
          >
            SAME TEXT LAYER
          </div>
          <div
            style={{
              padding: 24,
              background: 'rgba(255,90,60,0.1)',
              borderRadius: 14,
              fontSize: 28,
              marginBottom: 20,
            }}
          >
            “Try again later.”
            <div style={{ fontSize: 20, color: muted, marginTop: 8 }}>
              your branch
            </div>
          </div>
          <div
            style={{
              padding: 24,
              background: 'rgba(61,220,151,0.1)',
              borderRadius: 14,
              fontSize: 28,
            }}
          >
            “Create a cluster to get started.”
            <div style={{ fontSize: 20, color: muted, marginTop: 8 }}>
              their branch
            </div>
          </div>
          <p style={{ fontSize: 24, color: gold, marginTop: 32 }}>
            Someone has to pick the final sentence.
          </p>
        </Card>
      </div>
    </Shell>
  );
};

const Panic: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '110px 120px 0' }}>
        <Eyebrow live={live}>If it looks scary</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 64,
            margin: '16px 0 40px',
            letterSpacing: '-0.03em',
          }}
        >
          Do not click random buttons.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <PanicRow
            q="Will I break production?"
            a="Not if you never commit to main. Branch + PR is the seatbelt."
          />
          <PanicRow
            q="Where did my files go?"
            a="You switched branches. Switch back. They are there."
          />
          <PanicRow
            q="It says conflict / rejected / diverged."
            a="Stop. We’ll look together. Nothing is gone."
          />
          <PanicRow
            q="I don’t understand the terminal."
            a="You don’t need it today. Click in GitHub Desktop."
          />
        </div>
      </div>
    </Shell>
  );
};

const PanicRow = ({ q, a }: { q: string; a: string }) => (
  <Card
    style={{
      padding: '22px 32px',
      display: 'flex',
      gap: 40,
      alignItems: 'center',
    }}
  >
    <div style={{ width: 520, fontSize: 28, fontWeight: 600 }}>{q}</div>
    <div style={{ fontSize: 26, color: muted }}>{a}</div>
  </Card>
);

const Glossary: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '100px 120px 0' }}>
        <Eyebrow live={live}>Pocket glossary</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 56,
            margin: '12px 0 32px',
            letterSpacing: '-0.03em',
          }}
        >
          When engineers talk.
        </h2>
        <div style={{ display: 'flex', gap: 64 }}>
          <div style={{ width: 780 }}>
            <Gloss k="repo" v="the project" />
            <Gloss k="clone" v="first download" />
            <Gloss k="main" v="the trusted shared branch" />
            <Gloss k="branch" v="a draft line of work" />
            <Gloss k="commit" v="a named snapshot" />
            <Gloss k="stage" v="pick files for the snapshot" />
          </div>
          <div style={{ width: 780 }}>
            <Gloss k="push" v="upload commits" />
            <Gloss k="pull" v="download new commits" />
            <Gloss k="PR" v="please merge my branch" />
            <Gloss k="merge" v="combine into another branch" />
            <Gloss k="diff" v="what changed" />
            <Gloss k="conflict" v="two edits, Git needs a human" />
          </div>
        </div>
      </div>
    </Shell>
  );
};

const Gloss = ({ k, v }: { k: string; v: string }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '16px 0',
      borderBottom: `1px solid ${line}`,
      fontSize: 28,
    }}
  >
    <span style={{ fontWeight: 600, color: gold }}>{k}</span>
    <span style={{ color: muted }}>{v}</span>
  </div>
);

const Skipped: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '150px 140px 0' }}>
        <Eyebrow live={live}>Parking lot</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 68,
            margin: '18px 0 36px',
            letterSpacing: '-0.03em',
            animation: play(live, 'gux-up', '700ms', '60ms'),
          }}
        >
          We skipped this on purpose.
        </h2>
        <p
          style={{
            fontSize: 34,
            color: muted,
            maxWidth: 1400,
            lineHeight: 1.5,
          }}
        >
          Terminal fluency. Rebase. Force push. Internals. Forks. That is not
          “real Git” you missed — that is Part 2.
        </p>
        <p
          style={{
            fontSize: 34,
            marginTop: 36,
            maxWidth: 1400,
            lineHeight: 1.5,
          }}
        >
          If you can recite the loop, and open a PR, this workshop worked.
        </p>
      </div>
    </Shell>
  );
};

const Close: Page = () => {
  const live = useIsActivePage();
  return (
    <Shell>
      <div style={{ padding: '200px 140px 0' }}>
        <Eyebrow live={live}>Go make a snapshot</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 96,
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            margin: '24px 0 0',
            maxWidth: 1500,
            textWrap: 'balance',
            animation: play(live, 'gux-up', '800ms', '80ms'),
          }}
        >
          Pull. Branch. Edit. Commit. Push. PR.
        </h2>
        <p
          style={{
            fontSize: 36,
            color: muted,
            marginTop: 40,
            animation: play(live, 'gux-up', '700ms', '180ms'),
          }}
        >
          You already know how to critique work. Git is just how the product
          keeps score.
        </p>
      </div>
    </Shell>
  );
};

WhyGit.transition = breath;
Branch.transition = breath;
PullRequest.transition = breath;
Conflicts.transition = breath;

SaveVsCommit.transition = morphCut;

export const meta: SlideMeta = {
  title: 'Git for UX designers',
  createdAt: '2026-08-25T17:31:20.801Z',
};

export default [
  Cover,
  Outcomes,
  WhyGit,
  Words,
  TwoCopies,
  ThreeVerbs,
  NotDocs,
  SaveVsCommit,
  ThreePlaces,
  Messages,
  Branch,
  BranchDiagram,
  Loop,
  LabOne,
  PullRequest,
  Diff,
  PrTemplate,
  LabTwo,
  Conflicts,
  Panic,
  Glossary,
  Skipped,
  Close,
] satisfies Page[];
