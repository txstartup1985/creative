import { services } from '@/lib/data'
import type { ServiceCard } from '@/types'

function ServiceCardItem({ service }: { service: ServiceCard }) {
  return (
    <div className="group p-8 border border-[#2a2a2a] hover:border-l-[#555] transition-colors duration-300 relative">
      {/* Left border accent on hover */}
      <div className="absolute left-0 top-0 w-[4px] h-0 bg-gradient-to-b from-[#555] to-[#333] group-hover:h-full transition-[height] duration-300" />

      {/* Number */}
      <div className="relative mb-4">
        <span className="font-mono text-[48px] font-light text-[#333] group-hover:text-[#555] transition-colors duration-300 leading-none">
          .{service.number}
        </span>
        {/* Underline animation */}
        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#555] group-hover:w-[48px] transition-[width] duration-300" />
      </div>

      <h3 className="text-[#d0d0d0] text-[24px] font-bold mb-3 tracking-wide">
        {service.title}
      </h3>
      <p className="text-[#777] text-[15px] leading-[1.8]">
        {service.description}
      </p>
    </div>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="bg-[#121212] section-padding">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[#d0d0d0] text-[42px] max-lg:text-[36px] max-md:text-[28px] font-bold tracking-[-0.5px] mb-[60px]">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map(service => (
            <ServiceCardItem key={service.number} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
