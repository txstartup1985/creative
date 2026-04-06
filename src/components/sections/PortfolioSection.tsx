'use client'
import { useState } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { portfolioItems } from '@/lib/data'
import type { PortfolioItem } from '@/types'

function PortfolioCard({
  item,
  onClick,
}: {
  item: PortfolioItem
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group relative block w-full text-left overflow-hidden bg-[#222] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#555]"
      style={{ aspectRatio: '16/10' }}
      aria-label={`View ${item.title}`}
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white text-[16px] font-semibold leading-tight">{item.title}</h3>
        <p className="text-[#d0d0d0] text-[13px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
          {item.category}
        </p>
      </div>
    </button>
  )
}

export function PortfolioSection() {
  const [selected, setSelected] = useState<PortfolioItem | null>(null)

  return (
    <section id="portfolio" className="bg-[#1a1a1a] section-padding">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[#d0d0d0] text-[42px] max-lg:text-[36px] max-md:text-[28px] font-bold tracking-[-0.5px] mb-[60px]">
          Recent Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {portfolioItems.map(item => (
            <PortfolioCard
              key={item.id}
              item={item}
              onClick={() => setSelected(item)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <DialogContent className="bg-[#1a1a1a] border border-[#2a2a2a] max-w-[900px] p-0 overflow-hidden gap-0">
          <div className="flex max-md:flex-col">
            {/* Image */}
            {selected && (
              <div className="relative w-1/2 max-md:w-full max-md:h-[220px] min-h-[340px]">
                <Image
                  src={selected.image}
                  alt={selected.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
              </div>
            )}
            {/* Details */}
            {selected && (
              <div className="w-1/2 max-md:w-full p-10 max-md:p-6 overflow-y-auto max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle className="text-[#d0d0d0] text-[24px] font-bold leading-tight mb-1">
                    {selected.title}
                  </DialogTitle>
                  <p className="text-[#777] text-sm uppercase tracking-[1px]">{selected.category}</p>
                </DialogHeader>
                <p className="text-[#999] text-[15px] leading-[1.8] mt-5 mb-5">
                  {selected.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {selected.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-[#d0d0d0] text-[14px]">
                      <span className="w-4 h-[1px] bg-[#555] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={selected.siteUrl}
                  className="btn-graphite inline-block px-7 py-3 text-[#d0d0d0] text-sm uppercase tracking-[1px] font-semibold"
                >
                  <span>Visit Site</span>
                </a>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
