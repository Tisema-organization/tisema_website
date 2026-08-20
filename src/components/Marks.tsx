type SvgProps = {
  className?: string
}

function LetterP() {
  return (
    <g>
      <rect x="0" y="8" width="11" height="96" />
      <path
        fillRule="evenodd"
        d="M31 8a23 23 0 1 1 0 46 23 23 0 0 1 0-46Zm0 10a13 13 0 1 0 0 26 13 13 0 0 0 0-26Z"
      />
    </g>
  )
}

function LetterR() {
  return (
    <g>
      <rect x="0" y="8" width="11" height="64" />
      <path d="M11 8h17.5c.8 11.8-5.4 20-15.8 22.4v-10.6c4.8-1.2 8-4.6 8-9.2H11V8Z" />
    </g>
  )
}

function LetterM() {
  return (
    <path d="M0 72V8h11v16.5C15.2 14.4 22 10 30.4 10c6.2 0 10.6 2.6 13.2 7.2C46.2 12.6 51.2 10 58.2 10c9.4 0 16.4 5.2 19.6 14.5V8h11v64H77.8V36.8c-2-8.6-7.2-13.2-14.8-13.2-7.2 0-12.2 4.8-13.6 13.4v34.8H38.4V37c-1.6-8.6-6.8-13.4-13.8-13.4-7.4 0-12.4 4.8-13.6 13.2V72H0Z" />
  )
}

function LetterT() {
  return (
    <g>
      <rect x="0" y="8" width="38" height="11" />
      <rect x="13.5" y="8" width="11" height="64" />
    </g>
  )
}

function CircledR() {
  return (
    <g>
      <path
        fillRule="evenodd"
        d="M18 0a18 18 0 1 1 0 36 18 18 0 0 1 0-36Zm0 2.5a15.5 15.5 0 1 0 0 31 15.5 15.5 0 0 0 0-31Z"
      />
      <path d="M12.4 10.6h7.2c3.1 0 5.3 1.8 5.3 4.5 0 2.1-1.2 3.6-3.2 4.2l3.7 6.2h-4.1l-3.3-5.7h-2.1v5.7h-3.5V10.6Zm3.5 2.4v3.7h3.1c1.5 0 2.4-.8 2.4-1.85 0-1.05-.9-1.85-2.4-1.85h-3.1Z" />
    </g>
  )
}

export function LogoMark({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 355 110"
      className={className}
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="translate(0,0)">
        <LetterP />
      </g>
      <g transform="translate(62,0)">
        <LetterR />
      </g>
      <g transform="translate(110,0)">
        <LetterM />
      </g>
      <g transform="translate(202,0)">
        <LetterP />
      </g>
      <g transform="translate(264,0)">
        <LetterT />
      </g>
      <g transform="translate(314,8)">
        <CircledR />
      </g>
    </svg>
  )
}

export function CursorGlyph({ className }: SvgProps) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22.75" stroke="white" strokeWidth="2.5" />
      {/* Katakana メ — decorative Japanese glyph */}
      <path fill="white" d="M17.6 14.8 21.1 13l12.2 20.2-3.6 2.2z" />
      <path fill="white" d="M29.4 13.6 32.8 16 19.2 33.8 16 31.2z" />
    </svg>
  )
}

export function HamburgerIcon({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 14H40" stroke="white" strokeWidth="2.5" />
      <path d="M0 26H40" stroke="white" strokeWidth="2.5" />
    </svg>
  )
}

export function CircleFrame({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18.75" stroke="white" className="stroke-[2] lg:stroke-[2.5]" />
    </svg>
  )
}
