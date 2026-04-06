'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { contactInfo } from '@/lib/data'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

const empty: FormState = { name: '', email: '', subject: '', message: '' }

export function ContactSection() {
  const [form, setForm] = useState<FormState>(empty)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('Contact form submission:', form)
    setSubmitted(true)
    setForm(empty)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="bg-[#1a1a1a] section-padding">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[60px] max-lg:gap-[50px]">

        {/* Left — contact info */}
        <div>
          <h2 className="text-[#d0d0d0] text-[42px] max-lg:text-[36px] max-md:text-[28px] font-bold tracking-[-0.5px] mb-6">
            Get In Touch
          </h2>
          <p className="text-[#999] text-[15px] leading-[1.8] mb-10">
            Have a project in mind? We would love to hear about it. Drop us a line and we will get back to you as soon as possible.
          </p>

          <div className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-[2px] bg-[#555] mt-[10px] shrink-0" />
              <div>
                <p className="text-[#777] text-xs uppercase tracking-[1px] mb-1">Email</p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-[#d0d0d0] text-[15px] hover:text-white transition-colors duration-200"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-[2px] bg-[#555] mt-[10px] shrink-0" />
              <div>
                <p className="text-[#777] text-xs uppercase tracking-[1px] mb-1">Phone</p>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-[#d0d0d0] text-[15px] hover:text-white transition-colors duration-200"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>
            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-[2px] bg-[#555] mt-[10px] shrink-0" />
              <div>
                <p className="text-[#777] text-xs uppercase tracking-[1px] mb-1">Location</p>
                <p className="text-[#d0d0d0] text-[15px]">{contactInfo.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — contact form */}
        <div>
          {submitted && (
            <div className="mb-6 px-5 py-4 bg-[#222] border border-[#555] text-[#d0d0d0] text-sm">
              Thank you for your message! We will be in touch soon.
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-[#999] text-xs uppercase tracking-[1px]">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="bg-[#222] border-[#333] text-[#d0d0d0] placeholder:text-[#555] focus-visible:ring-[#555] focus-visible:border-[#555] rounded-none h-11"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-[#999] text-xs uppercase tracking-[1px]">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="bg-[#222] border-[#333] text-[#d0d0d0] placeholder:text-[#555] focus-visible:ring-[#555] focus-visible:border-[#555] rounded-none h-11"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="subject" className="text-[#999] text-xs uppercase tracking-[1px]">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="Project inquiry"
                className="bg-[#222] border-[#333] text-[#d0d0d0] placeholder:text-[#555] focus-visible:ring-[#555] focus-visible:border-[#555] rounded-none h-11"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message" className="text-[#999] text-xs uppercase tracking-[1px]">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Tell us about your project..."
                rows={6}
                className="bg-[#222] border-[#333] text-[#d0d0d0] placeholder:text-[#555] focus-visible:ring-[#555] focus-visible:border-[#555] rounded-none resize-none"
              />
            </div>
            <button
              type="submit"
              className="btn-graphite self-start px-10 py-4 text-[#d0d0d0] text-sm uppercase tracking-[1px] font-semibold"
            >
              <span>Send Message</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
