import React from 'react'

const brands = [
  { name: "KREATEYO",     href: null,                    accent: "#3b82f6" },
  { name: "KYNOX AI",     href: null,                    accent: "#a855f7" },
  { name: "AUDNIX AI",    href: "https://audnixai.com",  accent: "#2563eb" },
  { name: "ORBIEON",      href: null,                    accent: "#10b981" },
  { name: "SAS REC",      href: null,                    accent: "#f43f5e" },
  { name: "FANTASY LUXE", href: null,                    accent: "#f59e0b" },
]

const BrandItem = ({ name, href, accent }) => {
  const inner = (
    <div className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-gray-200/70 dark:border-white/[0.06] bg-white dark:bg-zinc-900/60 hover:border-gray-300 dark:hover:border-white/10 transition-colors duration-300 group cursor-default select-none">
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: accent }}
      />
      <span className="text-sm font-semibold tracking-[0.12em] text-gray-400 dark:text-zinc-500 group-hover:text-gray-700 dark:group-hover:text-zinc-300 transition-colors duration-300 whitespace-nowrap font-syne">
        {name}
      </span>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
        {inner}
      </a>
    )
  }
  return inner
}

const TrustedBy = () => {
  const doubled = [...brands, ...brands]

  return (
    <section className="py-14 bg-white dark:bg-black border-y border-gray-100 dark:border-white/[0.04] overflow-hidden">
      <p className="text-center text-[10px] font-semibold tracking-[0.35em] text-gray-300 dark:text-zinc-700 uppercase mb-8 select-none">
        Clients &amp; Partners
      </p>

      {/* Marquee */}
      <div className="marquee-wrap relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 h-full w-24 sm:w-40 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 h-full w-24 sm:w-40 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

        <div className="marquee-track gap-4 px-4">
          {doubled.map((brand, i) => (
            <div key={i} className="px-2">
              <BrandItem {...brand} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustedBy
