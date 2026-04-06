import { aboutFeatures } from '@/lib/data'

export function AboutSection() {
  return (
    <section id="about" className="bg-[#121212] section-padding">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[80px] max-lg:gap-[60px]">

        {/* Left — Why Choose Us */}
        <div>
          <h2 className="text-[#d0d0d0] text-[42px] max-lg:text-[36px] max-md:text-[28px] font-bold tracking-[-0.5px] mb-8">
            About Us
          </h2>
          <h3 className="text-[#d0d0d0] text-[24px] font-semibold mb-6">Why Choose Us</h3>
          <p className="text-[#999] text-[15px] leading-[1.9] mb-5">
            We are a minimalist design studio focused on crafting digital experiences that are both beautiful and functional. Our work spans brand identity, web design, and digital strategy for clients across industries.
          </p>
          <p className="text-[#999] text-[15px] leading-[1.9] mb-5">
            Founded on the belief that great design solves real problems, we bring a rigorous creative process to every project — from initial concept through to final delivery and ongoing support.
          </p>
          <p className="text-[#999] text-[15px] leading-[1.9]">
            Every project is an opportunity to create something exceptional. We combine strategic thinking with hands-on craftsmanship to deliver results that exceed expectations.{' '}
            <a href="#" className="text-[#d0d0d0] hover:text-white transition-colors duration-200 underline underline-offset-2">
              Learn more about our studio.
            </a>
          </p>
        </div>

        {/* Right — Feature blocks */}
        <div className="flex flex-col gap-8">
          {aboutFeatures.map(feature => (
            <div
              key={feature.title}
              className="group pl-6 border-l-4 border-[#555] hover:border-[#999] transition-colors duration-300"
            >
              {/* Decorative line */}
              <div className="w-8 h-[2px] bg-[#555] group-hover:w-16 transition-[width] duration-300 mb-4" />
              <h4 className="text-[#d0d0d0] text-[20px] font-bold mb-3">{feature.title}</h4>
              <p className="text-[#999] text-[15px] leading-[1.8]">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
