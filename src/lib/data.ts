import type { NavItem, ServiceCard, PortfolioItem, AboutFeature, ContactInfo, HeroSlide } from '@/types'

export const navItems: NavItem[] = [
  { label: 'Home',      href: '#home' },
  { label: 'Services',  href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About',     href: '#about' },
  { label: 'Contact',   href: '#contact' },
]

export const heroSlides: HeroSlide[] = [
  { src: '/images/tooplate-creative-01.jpg', alt: 'Design Workspace' },
  { src: '/images/tooplate-creative-02.jpg', alt: 'Creative Work' },
  { src: '/images/tooplate-creative-03.jpg', alt: 'Web Design' },
]

export const services: ServiceCard[] = [
  {
    number: '01',
    title: 'Web Design',
    description: 'Elegant and functional websites tailored to your brand, combining aesthetics with intuitive user experience.',
  },
  {
    number: '02',
    title: 'Development',
    description: 'Clean, scalable code built with modern technologies to power your digital presence reliably.',
  },
  {
    number: '03',
    title: 'Branding',
    description: 'Strategic visual identities that communicate your values and leave a lasting impression.',
  },
  {
    number: '04',
    title: 'Mobile Design',
    description: 'Responsive and intuitive mobile experiences that engage users across all devices.',
  },
  {
    number: '05',
    title: 'SEO & Analytics',
    description: 'Data-driven strategies to improve your visibility, drive traffic, and measure what matters.',
  },
  {
    number: '06',
    title: 'Launch & Support',
    description: 'Complete project management and ongoing support to keep your digital products running at their best.',
  },
]

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'alpha',
    title: 'Project Alpha',
    category: 'Web Design & Development',
    image: '/images/tooplate-creative-21.jpg',
    alt: 'Project Alpha',
    description: 'A comprehensive web design and development project featuring a modern interface and seamless user experience.',
    features: ['Responsive design', 'Custom CMS', 'SEO optimization', 'Analytics integration'],
    siteUrl: '#',
  },
  {
    id: 'beta',
    title: 'Project Beta',
    category: 'Branding & Identity',
    image: '/images/tooplate-creative-22.jpg',
    alt: 'Project Beta',
    description: 'A complete brand identity system built from the ground up, establishing a strong visual presence across all touchpoints.',
    features: ['Logo design', 'Brand guidelines', 'Typography system', 'Color palette'],
    siteUrl: '#',
  },
  {
    id: 'gamma',
    title: 'Project Gamma',
    category: 'Digital Experience',
    image: '/images/tooplate-creative-23.jpg',
    alt: 'Project Gamma',
    description: 'An immersive digital experience designed to engage and convert, with a focus on storytelling and interaction.',
    features: ['Interactive design', 'Motion graphics', 'Performance optimization', 'A/B testing'],
    siteUrl: '#',
  },
  {
    id: 'delta',
    title: 'Project Delta',
    category: 'Full Brand Development',
    image: '/images/tooplate-creative-24.jpg',
    alt: 'Project Delta',
    description: 'End-to-end brand development spanning strategy, visual identity, and digital implementation.',
    features: ['Brand strategy', 'Visual identity', 'Web development', 'Launch campaign'],
    siteUrl: '#',
  },
  {
    id: 'epsilon',
    title: 'Project Epsilon',
    category: 'Web & Mobile Design',
    image: '/images/tooplate-creative-25.jpg',
    alt: 'Project Epsilon',
    description: 'A unified web and mobile design system ensuring consistency and quality across every platform.',
    features: ['Design system', 'Mobile-first', 'Accessibility', 'Prototyping'],
    siteUrl: '#',
  },
  {
    id: 'zeta',
    title: 'Project Zeta',
    category: 'Concept & Strategy',
    image: '/images/tooplate-creative-26.jpg',
    alt: 'Project Zeta',
    description: 'Strategic concept development turning abstract ideas into actionable, visually compelling digital products.',
    features: ['UX research', 'Concept development', 'Wireframing', 'User testing'],
    siteUrl: '#',
  },
]

export const aboutFeatures: AboutFeature[] = [
  {
    title: 'Creative Excellence',
    description: 'Award-winning designs that push creative boundaries while staying true to your brand vision and business goals.',
  },
  {
    title: 'Technical Expertise',
    description: 'Modern technology stack and best practices ensuring your digital products are fast, secure, and future-proof.',
  },
  {
    title: 'Client Partnership',
    description: 'Collaborative approach that keeps you involved at every stage, from initial concept to final delivery and beyond.',
  },
]

export const contactInfo: ContactInfo = {
  email: 'hello@creativestudio.com',
  phone: '+1 (234) 567-890',
  location: 'Creative Hub, Design District, New York, NY 10001',
}
