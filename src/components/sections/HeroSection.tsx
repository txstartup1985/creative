'use client'
import Image from 'next/image'
import { heroSlides } from '@/lib/data'
import { useImageSlider } from '@/hooks/useImageSlider'

export function HeroSection() {
  const { current, goTo } = useImageSlider(heroSlides.length, 3000)

  return (
    <section id="home" className="bg-[#1a1a1a] section-padding min-h-[480px]">
      <div className="max-w-[1200px] mx-auto flex items-center gap-[60px] max-lg:flex-col max-lg:gap-10">

        {/* Left — headline + CTA */}
        <div className="flex-1 min-w-0">
          <div className="w-[60px] h-[2px] bg-[#555] mb-8" />
          <h2 className="text-[#d0d0d0] text-[48px] max-lg:text-[36px] max-md:text-[28px] font-semibold leading-tight tracking-[-0.5px] mb-6">
            We Create<br />Experiences
          </h2>
          <p className="text-[#999] text-[18px] max-md:text-base leading-[1.8] mb-10 max-w-[480px]">
            A minimalist design studio crafting elegant digital solutions that balance form and function. We turn complex ideas into clear, compelling experiences.
          </p>
          <button className="btn-graphite inline-block px-8 py-4 text-[#d0d0d0] text-sm uppercase tracking-[1px] font-semibold">
            <span>Start a Project</span>
          </button>
        </div>

        {/* Right — image slider */}
        <div className="flex-1 min-w-0 w-full max-w-[540px] max-lg:max-w-full">
          <div className="relative h-[400px] max-lg:h-[380px] max-md:h-[300px] overflow-hidden bg-[#222]">
            {heroSlides.map((slide, i) => (
              <div
                key={slide.src}
                className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
                style={{ opacity: i === current ? 1 : 0 }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>

          {/* Dot controls */}
          <div className="flex gap-3 mt-4">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={[
                  'w-3 h-3 rounded-full transition-all duration-300 bg-white',
                  i === current ? 'opacity-100 scale-125' : 'opacity-40',
                ].join(' ')}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
