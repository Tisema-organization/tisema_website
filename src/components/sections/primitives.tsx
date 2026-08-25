type RuleTone = 'dark' | 'lime' | 'paper'

const RULE_SRC: Record<RuleTone, string> = {
  dark: '/design/rule-dark.svg',
  lime: '/design/rule-lime.svg',
  paper: '/design/rule-paper.svg',
}

/** The 35×2.625 rule + label pair that opens most bands in the design. */
export function Eyebrow({
  children,
  tone,
  className = '',
}: {
  children: React.ReactNode
  tone: RuleTone
  className?: string
}) {
  return (
    <div className={`flex items-center gap-[8.75px] py-[8.75px] ${className}`}>
      <img
        src={RULE_SRC[tone]}
        alt=""
        width={35}
        height={2.625}
        className="block w-[35px] shrink-0"
        style={{ height: '2.625px' }}
      />
      <p className="font-serif text-[clamp(1.125rem,1.62vw,24.5px)] leading-[28px] whitespace-nowrap">
        {children}
      </p>
    </div>
  )
}

/** Band heading — 52px display type at the design's 1512px width. */
export function BandTitle({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={`font-serif text-[clamp(2rem,3.44vw,52px)] leading-[1.2] ${className}`}
    >
      {children}
    </h2>
  )
}
