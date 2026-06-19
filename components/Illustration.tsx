import type { IllustName } from "@/lib/motifs";

/**
 * サイト専用の手描きSVGイラスト集（看護テーマ・女性らしい配色）。
 * 著作権フリー（自作）。カバー画像・記事内の図版・カテゴリ見出しで再利用する。
 * viewBox 0 0 240 180、背景は透明。色は下記パレットで統一。
 */
const C = {
  teal: "#0f8a86",
  tealL: "#7fd8d2",
  pink: "#f3899e",
  pinkL: "#ffd2d9",
  warm: "#f6b756",
  warmL: "#ffe0a3",
  violet: "#8f7ce9",
  ink: "#3a4a4a",
  white: "#ffffff",
};

const S = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Drip() {
  return (
    <g>
      <rect x="96" y="22" width="48" height="58" rx="10" fill={C.tealL} stroke={C.teal} strokeWidth="5" />
      <path d="M108 22v-6h24v6" {...S} stroke={C.teal} strokeWidth="5" />
      <rect x="108" y="36" width="24" height="30" rx="5" fill={C.white} stroke={C.teal} strokeWidth="3" />
      <path d="M120 40v22" {...S} stroke={C.pink} strokeWidth="4" />
      <path d="M120 80v34" {...S} stroke={C.teal} strokeWidth="5" />
      <ellipse cx="120" cy="100" rx="4" ry="6" fill={C.pink} />
      <circle cx="120" cy="126" r="9" fill={C.pinkL} stroke={C.pink} strokeWidth="4" />
      <path d="M86 150h68" {...S} stroke={C.ink} strokeWidth="5" opacity="0.25" />
    </g>
  );
}
function Wristband() {
  return (
    <g>
      <path d="M70 96c0-26 22-44 50-44s50 18 50 44" {...S} stroke={C.pinkL} strokeWidth="16" />
      <path d="M70 96c0-26 22-44 50-44s50 18 50 44" {...S} stroke={C.pink} strokeWidth="5" />
      <rect x="96" y="86" width="48" height="30" rx="7" fill={C.white} stroke={C.teal} strokeWidth="5" />
      <path d="M104 96h32M104 106h22" {...S} stroke={C.teal} strokeWidth="4" />
      <circle cx="120" cy="138" r="6" fill={C.teal} />
    </g>
  );
}
function Vitals() {
  return (
    <g>
      <rect x="50" y="40" width="140" height="86" rx="12" fill={C.white} stroke={C.teal} strokeWidth="5" />
      <rect x="50" y="40" width="140" height="22" rx="12" fill={C.tealL} />
      <path d="M62 96h22l8-26 12 44 10-30 8 12h44" {...S} stroke={C.pink} strokeWidth="5" />
      <path d="M96 138h48M120 126v12" {...S} stroke={C.ink} strokeWidth="5" opacity="0.3" />
    </g>
  );
}
function Chat() {
  return (
    <g>
      <path d="M44 56h84a12 12 0 0 1 12 12v28a12 12 0 0 1-12 12H78l-18 16v-16h-16a12 12 0 0 1-12-12V68a12 12 0 0 1 12-12Z" fill={C.tealL} stroke={C.teal} strokeWidth="5" />
      <path d="M60 78h52M60 90h36" {...S} stroke={C.teal} strokeWidth="4" />
      <path d="M196 92h-44a12 12 0 0 0-12 12v18a12 12 0 0 0 12 12h6v12l14-12h24a12 12 0 0 0 12-12v-18a12 12 0 0 0-12-12Z" fill={C.pinkL} stroke={C.pink} strokeWidth="5" />
      <path d="M156 112h28" {...S} stroke={C.pink} strokeWidth="4" />
    </g>
  );
}
function Phone() {
  return (
    <g>
      <path d="M78 58c-10 0-16 8-12 18 8 22 30 44 52 52 10 4 18-2 18-12 0-6-4-10-10-12l-12-4c-4-1-7 0-9 2l-4 4c-10-6-18-14-24-24l4-4c2-2 3-5 2-9l-4-12c-2-6-6-9-12-9Z" fill={C.tealL} stroke={C.teal} strokeWidth="5" />
      <path d="M150 56c10 2 18 10 20 20M150 74c5 1 9 5 10 10" {...S} stroke={C.pink} strokeWidth="5" />
    </g>
  );
}
function Syringe() {
  return (
    <g>
      <path d="M150 44l46 46" {...S} stroke={C.teal} strokeWidth="6" />
      <rect x="78" y="86" width="74" height="26" rx="6" transform="rotate(45 78 86)" fill={C.white} stroke={C.teal} strokeWidth="5" />
      <path d="M150 70l20 20M134 86l16 16M118 102l16 16" {...S} stroke={C.teal} strokeWidth="4" />
      <path d="M64 136l-16 16" {...S} stroke={C.teal} strokeWidth="6" />
      <circle cx="44" cy="156" r="8" fill={C.pinkL} stroke={C.pink} strokeWidth="4" />
    </g>
  );
}
function Stomach() {
  return (
    <g>
      <path d="M120 50c0-8 14-8 14 0 0 14-10 16-10 30 0 24 18 30 18 50 0 18-16 28-32 28-18 0-30-12-30-28 0-22 24-22 28-40" {...S} fill={C.pinkL} stroke={C.pink} strokeWidth="5" />
      <path d="M127 50c0-10 12-10 12 0v6" {...S} stroke={C.teal} strokeWidth="5" />
      <path d="M100 110c8 6 20 6 28 0" {...S} stroke={C.pink} strokeWidth="4" />
    </g>
  );
}
function Clipboard() {
  return (
    <g>
      <rect x="64" y="40" width="100" height="116" rx="12" fill={C.white} stroke={C.teal} strokeWidth="5" />
      <rect x="96" y="32" width="36" height="20" rx="8" fill={C.tealL} stroke={C.teal} strokeWidth="5" />
      <path d="M82 74h12M82 96h12M82 118h12" {...S} stroke={C.teal} strokeWidth="5" />
      <path d="M82 74l4 4 6-8" {...S} stroke={C.pink} strokeWidth="0" />
      <path d="M104 74h44M104 96h44M104 118h30" {...S} stroke={C.ink} strokeWidth="4" opacity="0.4" />
      <path d="M150 120l18 18 26-30" {...S} stroke={C.pink} strokeWidth="7" />
    </g>
  );
}
function Bed() {
  return (
    <g>
      <path d="M48 70v76M48 96h120v50M168 110v36" {...S} stroke={C.teal} strokeWidth="6" />
      <rect x="62" y="74" width="40" height="24" rx="8" fill={C.pinkL} stroke={C.pink} strokeWidth="5" />
      <path d="M40 146h150" {...S} stroke={C.ink} strokeWidth="5" opacity="0.25" />
      <circle cx="186" cy="62" r="14" fill={C.warmL} stroke={C.warm} strokeWidth="5" />
      <path d="M186 56v8M186 70v1" {...S} stroke={C.warm} strokeWidth="5" />
    </g>
  );
}
function HeartHands() {
  return (
    <g>
      <path d="M120 70c8-14 32-12 36 4 4 16-18 30-36 42-18-12-40-26-36-42 4-16 28-18 36-4Z" {...S} fill={C.pinkL} stroke={C.pink} strokeWidth="5" />
      <path d="M64 150c2-22 16-30 30-28M176 150c-2-22-16-30-30-28" {...S} stroke={C.teal} strokeWidth="6" />
      <path d="M58 150h28M154 150h28" {...S} stroke={C.teal} strokeWidth="6" />
    </g>
  );
}
function TwoPeople() {
  return (
    <g>
      <circle cx="92" cy="68" r="18" fill={C.tealL} stroke={C.teal} strokeWidth="5" />
      <path d="M64 142c0-20 12-34 28-34s28 14 28 34" {...S} stroke={C.teal} strokeWidth="6" />
      <circle cx="156" cy="74" r="16" fill={C.pinkL} stroke={C.pink} strokeWidth="5" />
      <path d="M132 142c0-18 10-30 24-30s24 12 24 30" {...S} stroke={C.pink} strokeWidth="6" />
    </g>
  );
}
function Moon() {
  return (
    <g>
      <path d="M150 50a52 52 0 1 0 0 90 42 42 0 0 1 0-90Z" {...S} fill={C.tealL} stroke={C.teal} strokeWidth="5" />
      <path d="M168 56l3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Z" fill={C.warm} />
      <circle cx="186" cy="104" r="4" fill={C.pink} />
      <circle cx="172" cy="128" r="3" fill={C.warm} />
    </g>
  );
}
function Tasks() {
  return (
    <g>
      <rect x="58" y="48" width="92" height="30" rx="8" fill={C.tealL} stroke={C.teal} strokeWidth="5" />
      <rect x="72" y="86" width="92" height="30" rx="8" fill={C.pinkL} stroke={C.pink} strokeWidth="5" />
      <rect x="86" y="124" width="92" height="30" rx="8" fill={C.warmL} stroke={C.warm} strokeWidth="5" />
      <path d="M68 63l5 5 8-10M82 101l5 5 8-10M96 139l5 5 8-10" {...S} stroke={C.ink} strokeWidth="4" opacity="0.55" />
    </g>
  );
}
function Clock() {
  return (
    <g>
      <circle cx="120" cy="96" r="54" fill={C.white} stroke={C.teal} strokeWidth="6" />
      <circle cx="120" cy="96" r="54" fill="none" stroke={C.tealL} strokeWidth="6" strokeDasharray="4 16" />
      <path d="M120 64v32l22 14" {...S} stroke={C.pink} strokeWidth="6" />
      <circle cx="120" cy="96" r="5" fill={C.teal} />
    </g>
  );
}
function Wallet() {
  return (
    <g>
      <rect x="54" y="66" width="132" height="80" rx="14" fill={C.tealL} stroke={C.teal} strokeWidth="5" />
      <path d="M54 92h132" {...S} stroke={C.teal} strokeWidth="5" />
      <rect x="138" y="100" width="56" height="26" rx="10" fill={C.white} stroke={C.teal} strokeWidth="5" />
      <circle cx="158" cy="113" r="6" fill={C.warm} />
      <circle cx="150" cy="56" r="16" fill={C.warmL} stroke={C.warm} strokeWidth="5" />
      <path d="M150 50v12M146 54h6a3 3 0 0 1 0 6h-4a3 3 0 0 0 0 6h6" {...S} stroke={C.warm} strokeWidth="3" />
    </g>
  );
}
function Calendar() {
  return (
    <g>
      <rect x="56" y="52" width="128" height="100" rx="12" fill={C.white} stroke={C.teal} strokeWidth="5" />
      <path d="M56 80h128" {...S} stroke={C.teal} strokeWidth="5" />
      <path d="M84 44v18M156 44v18" {...S} stroke={C.teal} strokeWidth="6" />
      <rect x="72" y="92" width="20" height="16" rx="4" fill={C.pinkL} />
      <rect x="108" y="92" width="20" height="16" rx="4" fill={C.tealL} />
      <path d="M150 116l10 10 18-22" {...S} stroke={C.pink} strokeWidth="7" />
    </g>
  );
}
function Magnifier() {
  return (
    <g>
      <rect x="58" y="46" width="86" height="108" rx="10" fill={C.white} stroke={C.teal} strokeWidth="5" />
      <path d="M74 70h54M74 88h54M74 106h36" {...S} stroke={C.ink} strokeWidth="4" opacity="0.4" />
      <circle cx="146" cy="116" r="28" fill={C.pinkL} fillOpacity="0.5" stroke={C.pink} strokeWidth="6" />
      <path d="M166 136l20 20" {...S} stroke={C.pink} strokeWidth="8" />
    </g>
  );
}
function Building() {
  return (
    <g>
      <rect x="64" y="54" width="112" height="98" rx="10" fill={C.tealL} stroke={C.teal} strokeWidth="5" />
      <path d="M48 152h144" {...S} stroke={C.ink} strokeWidth="5" opacity="0.25" />
      <rect x="106" y="116" width="28" height="36" rx="4" fill={C.white} stroke={C.teal} strokeWidth="4" />
      <g fill={C.white}>
        <rect x="80" y="72" width="18" height="18" rx="3" /><rect x="142" y="72" width="18" height="18" rx="3" />
        <rect x="80" y="98" width="18" height="14" rx="3" /><rect x="142" y="98" width="18" height="14" rx="3" />
      </g>
      <path d="M114 66h12v6h6v12h-6v6h-12v-6h-6V72h6v-6Z" fill={C.pink} />
    </g>
  );
}
function House() {
  return (
    <g>
      <path d="M60 100l60-46 60 46" {...S} stroke={C.teal} strokeWidth="6" />
      <path d="M74 92v60h92V92" {...S} fill={C.tealL} stroke={C.teal} strokeWidth="5" />
      <path d="M44 152h152" {...S} stroke={C.ink} strokeWidth="5" opacity="0.25" />
      <path d="M120 116c5-9 20-8 22 3 2 10-12 18-22 26-10-8-24-16-22-26 2-11 17-12 22-3Z" {...S} fill={C.pinkL} stroke={C.pink} strokeWidth="4" />
    </g>
  );
}
function Compass() {
  return (
    <g>
      <circle cx="120" cy="96" r="56" fill={C.white} stroke={C.teal} strokeWidth="6" />
      <circle cx="120" cy="96" r="56" fill="none" stroke={C.tealL} strokeWidth="6" strokeDasharray="2 14" />
      <path d="M120 60l14 30-14 30-14-30Z" {...S} fill={C.pink} stroke={C.pink} strokeWidth="3" />
      <path d="M120 96l-14 30 14-12 14 12Z" {...S} fill={C.tealL} stroke={C.teal} strokeWidth="3" />
      <circle cx="120" cy="96" r="5" fill={C.teal} />
    </g>
  );
}
function Door() {
  return (
    <g>
      <path d="M70 48h52v104H70z" {...S} fill={C.tealL} stroke={C.teal} strokeWidth="5" />
      <path d="M122 48l34 12v92l-34-4" {...S} fill={C.white} stroke={C.teal} strokeWidth="5" />
      <circle cx="138" cy="100" r="4" fill={C.teal} />
      <path d="M150 100h44M178 84l18 16-18 16" {...S} stroke={C.pink} strokeWidth="7" />
    </g>
  );
}
function Beauty() {
  return (
    <g>
      <path d="M120 56c26 0 44 20 44 46s-20 44-44 44-44-18-44-44 18-46 44-46Z" {...S} fill={C.pinkL} stroke={C.pink} strokeWidth="5" />
      <circle cx="104" cy="98" r="4" fill={C.ink} /><circle cx="136" cy="98" r="4" fill={C.ink} />
      <path d="M108 116c8 6 16 6 24 0" {...S} stroke={C.pink} strokeWidth="4" />
      <path d="M170 60l4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z" fill={C.warm} />
      <path d="M82 70l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" fill={C.teal} />
    </g>
  );
}

const motifs: Record<IllustName, () => JSX.Element> = {
  drip: Drip,
  wristband: Wristband,
  vitals: Vitals,
  chat: Chat,
  phone: Phone,
  syringe: Syringe,
  stomach: Stomach,
  clipboard: Clipboard,
  bed: Bed,
  "heart-hands": HeartHands,
  "two-people": TwoPeople,
  moon: Moon,
  tasks: Tasks,
  clock: Clock,
  wallet: Wallet,
  calendar: Calendar,
  magnifier: Magnifier,
  building: Building,
  house: House,
  compass: Compass,
  door: Door,
  beauty: Beauty,
};

export function Illustration({
  name,
  className = "h-full w-full",
  title,
}: {
  name: IllustName;
  className?: string;
  title?: string;
}) {
  const Motif = motifs[name] ?? Clipboard;
  return (
    <svg
      viewBox="0 0 240 180"
      className={className}
      role="img"
      aria-label={title ?? "イラスト"}
      preserveAspectRatio="xMidYMid meet"
    >
      {title ? <title>{title}</title> : null}
      <Motif />
    </svg>
  );
}
