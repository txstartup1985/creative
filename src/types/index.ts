export interface NavItem {
  label: string
  href: string
}

export interface ServiceCard {
  number: string
  title: string
  description: string
}

export interface PortfolioItem {
  id: string
  title: string
  category: string
  image: string
  alt: string
  description: string
  features: string[]
  siteUrl: string
}

export interface AboutFeature {
  title: string
  description: string
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
}

export interface HeroSlide {
  src: string
  alt: string
}
