import { useMemo, useState } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import {
  RESOURCE_FILTERS,
  RESOURCE_SECTIONS,
  type ResourceContact,
  type ResourceFilter,
} from '../lib/resources'
import { SiteNav } from './SiteNav'
import { SiteFooter } from './sections/SiteFooter'
import { Item, Reveal, Stagger } from './motion'

function telephoneHref(number: string) {
  return `tel:${number.replace(/[^+\d]/g, '')}`
}

function ContactCard({ contact }: { contact: ResourceContact }) {
  return (
    <Item className="flex min-h-[154px] flex-col rounded-[14px] bg-white p-5 shadow-[0_1px_0_rgba(107,36,26,0.04)] sm:p-6">
      {contact.location ? (
        <span className="mb-3 w-fit rounded-full bg-[#f0e9e4] px-3 py-1 text-[11px] font-semibold text-oxblood">
          {contact.location}
        </span>
      ) : null}

      <h3 className="font-serif text-[17px] leading-[22px] text-field">
        {contact.title}
      </h3>
      {contact.subtitle ? (
        <p className="mt-1 text-[11px] leading-[16px] text-oxblood/70">
          {contact.subtitle}
        </p>
      ) : null}
      {contact.description ? (
        <p className="mt-3 text-[12px] leading-[18px] text-field/75">
          <span className="font-semibold text-field">What it is for: </span>
          {contact.description}
        </p>
      ) : null}

      {contact.numbers?.length ? (
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <span className="text-[11px] text-field/45">Number</span>
          <div className="flex flex-wrap justify-end gap-x-2 gap-y-1">
            {contact.numbers.map((number, index) => (
              <span key={number} className="flex items-center gap-2">
                {index > 0 ? <span className="text-field/30">/</span> : null}
                <a
                  href={telephoneHref(number)}
                  className="text-[12px] font-bold text-oxblood transition-colors hover:text-field"
                >
                  {number}
                </a>
              </span>
            ))}
          </div>
        </div>
      ) : contact.numberLabel ? (
        <p className="mt-auto pt-5 text-[11px] leading-[17px] text-field/60">
          {contact.numberLabel}
        </p>
      ) : null}
    </Item>
  )
}

export function ResourcesPage() {
  const [filter, setFilter] = useState<ResourceFilter>('All Resources')
  const visible = useMemo(
    () =>
      filter === 'All Resources'
        ? RESOURCE_SECTIONS
        : RESOURCE_SECTIONS.filter((section) => section.filter === filter),
    [filter],
  )

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-paper">
          <SiteNav pinned base="/" />

          <main className="pt-[56px] lg:pt-[68px]">
            <div className="section-shell py-[56px] lg:py-[104px]">
              <div className="mx-auto flex w-full max-w-[1254px] flex-col gap-12 lg:gap-16">
                <header className="flex max-w-[900px] flex-col gap-5">
                  <Reveal>
                    <h1 className="font-serif text-[clamp(2.4rem,4.2vw,56px)] leading-[1.1] text-field">
                      Emergency Contacts
                    </h1>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <p className="max-w-[760px] text-[17px] leading-[27px] text-field/80">
                      Here is a list of emergency services and their direct contact information for quick access when you need immediate assistance.
                    </p>
                  </Reveal>
                  <div className="flex flex-wrap gap-2 pt-1" aria-label="Filter emergency resources">
                    {RESOURCE_FILTERS.map((item) => {
                      const active = filter === item
                      return (
                        <button
                          key={item}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setFilter(item)}
                          className={`rounded-full px-4 py-2 text-[12px] font-semibold transition-colors ${
                            active
                              ? 'bg-oxblood text-paper'
                              : 'bg-[#f0eee8] text-field/70 hover:bg-oxblood/10'
                          }`}
                        >
                          {item}
                        </button>
                      )
                    })}
                  </div>
                </header>

                <div className="flex flex-col gap-14 lg:gap-16">
                  {visible.map((section) => (
                    <section key={section.id} id={section.id} className="scroll-mt-[96px]">
                      <div className="mb-6 flex items-center gap-3 border-b border-oxblood/15 pb-3">
                        <span className="rounded-[3px] bg-oxblood px-2 py-1 text-[12px] font-bold text-paper">
                          {section.index}
                        </span>
                        <h2 className="font-serif text-[clamp(1.35rem,2vw,26px)] leading-tight text-field">
                          {section.title}
                        </h2>
                      </div>

                      {section.note ? (
                        <aside className="mb-6 border-l-[3px] border-oxblood bg-[#f2eee5] px-5 py-4 text-[12px] leading-[20px] text-field/70 sm:px-6">
                          {section.id === 'one-stop-centres' ? (
                            <strong className="mb-1 block text-field">What they are meant to be</strong>
                          ) : null}
                          {section.note}
                        </aside>
                      ) : null}

                      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.045}>
                        {section.contacts.map((contact) => (
                          <ContactCard
                            key={`${contact.location ?? ''}-${contact.title}`}
                            contact={contact}
                          />
                        ))}
                      </Stagger>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </main>

          <SiteFooter base="/" />
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
