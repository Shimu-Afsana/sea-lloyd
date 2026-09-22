import Link from 'next/link'
import { Camera } from 'lucide-react'

const navigation = [
  {
    title: 'Discover',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Agency Network', href: '/agency-network' },
      { label: 'Career', href: '/career' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Company Profile', href: '/company-profile' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Tracking', href: '/tracking' },
      { label: 'Schedule', href: '/schedule' },
    ],
  },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: 'in' },
  { label: 'Facebook', href: 'https://www.facebook.com', icon: 'f' },
  { label: 'Instagram', href: 'https://www.instagram.com', icon: 'instagram' },
]

function SeaLloydMark() {
  return (
    <Link href="/" aria-label="Sea Lloyd home" className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="relative block h-16 w-12">
        <span className="absolute left-1 top-1 h-14 w-7 -rotate-25 rounded-[50%] border-l-[7px] border-[#2B3386]" />
        <span className="absolute left-3 top-3 h-11 w-6 rotate-25 rounded-[50%] border-l-[5px] border-[#EF7120]" />
        <span className="absolute bottom-1 left-0 h-2 w-9 -rotate-6 rounded-[50%] bg-slate-400/55" />
      </span>
      <span className="leading-none">
        <span className="block text-[27px] font-extrabold tracking-[-0.07em] text-[#2B3386]">
          SEA<span className="text-[#EF7120]">LLOYD</span>
        </span>
        <span className="mt-1 block text-[8px] tracking-[0.45em] text-[#2B3386]">WWW.SEALLOYD.COM</span>
      </span>
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#f7f8fa] text-[#243657]">
      <div className="mx-auto max-w-[1440px] px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
        <div className="mb-12 flex justify-center sm:mb-16">
          <SeaLloydMark />
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(300px,1.8fr)_repeat(3,minmax(130px,0.8fr))_minmax(190px,1fr)] lg:gap-x-12 xl:gap-x-20">
          <div className="max-w-[530px]">
            <h2 className="text-sm font-bold uppercase tracking-[0.02em] text-[#2B3386] sm:text-base">
              Sea Lloyd Shipping Lines Pte. Ltd
            </h2>
            <p className="mt-5 max-w-[510px] text-[16px] leading-[1.8] text-[#344767] sm:text-[17px]">
               From our foundation in India, Sea Lloyd has grown into a regional 
               presence across Asia, with offices and partnerships extending across China, 
               Hong Kong, Malaysia, Singapore, and Bangladesh. Building on this strong Asian network, 
               we are expanding our reach towards a truly global presence—connecting markets, 
               strengthening relationships, and creating seamless opportunities for our customers.
            </p>
          </div>

          {navigation.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h2 className="text-sm font-bold uppercase tracking-[0.02em] text-[#2B3386] sm:text-base">
                {section.title}
              </h2>
              <ul className="mt-5 space-y-3.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-[16px] text-[#344767] transition-colors duration-300 hover:text-[#EF7120] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EF7120] sm:text-[17px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.02em] text-[#2B3386] sm:text-base">Social</h2>
            <div className="mt-5 flex gap-2.5" aria-label="Social media links">
              {socialLinks.map(({ label, href, icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group flex size-[62px] items-center justify-center rounded-sm border border-[#EF7120]/35 bg-white text-[#EF7120] transition-colors duration-300 hover:bg-[#EF7120] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EF7120] sm:size-[68px]"
                >
                  {icon === 'instagram' ? (
                    <Camera aria-hidden="true" className="size-6 stroke-[2.2] transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <span aria-hidden="true" className="text-[25px] font-bold leading-none transition-transform duration-300 group-hover:scale-105">
                      {icon}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
