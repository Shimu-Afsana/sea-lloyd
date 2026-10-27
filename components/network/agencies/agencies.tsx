'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import worldMap from '@svg-maps/world'
import { ArrowLeft, ArrowRight, Building2, Clock3, Mail, MapPin, Phone } from 'lucide-react'

type AgencyContact = { department?: string; phone?: string; email?: string }
type AgencyOffice = { id: string; officeName: string; city: string; address?: string; hours?: string; contacts: AgencyContact[]; imageSrc: string; imageAlt: string; locationLabel: string; locationUrl?: string }
type AgencyCountry = { id: string; name: string; countryCode: string; mapCode: string; offices: AgencyOffice[] }

const locationImages: Record<string, { src: string; alt: string }> = {
  Chennai: { src: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=82', alt: 'Chennai waterfront and city skyline' },
  Cochin: { src: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=82', alt: 'Kochi waterfront with traditional boats' },
  Kolkata: { src: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=900&q=82', alt: 'Kolkata city skyline and riverfront' },
  'Navi Mumbai': { src: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=900&q=82', alt: 'Mumbai harbor and city skyline' },
  'New Delhi': { src: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=82', alt: 'New Delhi city landmark and streets' },
  Tuticorin: { src: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=82', alt: 'South Indian coastal temple and city view' },
  Singapore: { src: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=82', alt: 'Singapore skyline and waterfront' },
  Jakarta: { src: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=900&q=82', alt: 'Jakarta city skyline' },
  Kuwait: { src: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=82', alt: 'Kuwait city architecture' },
  Colombo: { src: 'https://images.unsplash.com/photo-1586861635169-e5223aadc9fe?auto=format&fit=crop&w=900&q=82', alt: 'Colombo waterfront and port area' },
  Bangkok: { src: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=82', alt: 'Bangkok city skyline and river' },
  Malaysia: { src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=82', alt: 'Malaysia city and waterfront view' },
  Shanghai: { src: 'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?auto=format&fit=crop&w=900&q=82', alt: 'Shanghai skyline and commercial waterfront' },
  Mombasa: { src: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=900&q=82', alt: 'Mombasa coastline and waterfront' },
  Male: { src: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=900&q=82', alt: 'Malé island waterfront' },
  Doha: { src: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=82', alt: 'Doha city architecture' },
  'Jebel Ali': { src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=82', alt: 'Dubai skyline and logistics hub' },
  'HONG KONG': { src: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=900&q=82', alt: 'Hong Kong skyline and harbor' },
  Busan: { src: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=82', alt: 'Busan waterfront and city skyline' },
  'ICD Birgunj': { src: 'https://images.unsplash.com/photo-1586528116493-da8b8e7b6c3d?auto=format&fit=crop&w=900&q=82', alt: 'Inland logistics containers and depot' },
  Riyadh: { src: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=82', alt: 'Riyadh city skyline' },
  Tanzania: { src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=82', alt: 'Tanzanian coastal city landscape' },
  Philippine: { src: 'https://images.unsplash.com/photo-1559628233-6f3f3f4f6a7d?auto=format&fit=crop&w=900&q=82', alt: 'Representative Philippine waterfront' },
  Taiwan: { src: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=900&q=82', alt: 'Representative Taiwan city waterfront' },
  Vietam: { src: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=900&q=82', alt: 'Ho Chi Minh City streets and skyline' },
}

const office = (id: string, officeName: string, city: string, address: string | undefined, contacts: AgencyContact[], hours?: string): AgencyOffice => {
  const image = locationImages[city] ?? { src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=82', alt: `${city} representative waterfront photography` }
  const hasAddress = address && !/^to be announced/i.test(address)
  return { id, officeName, city, address, contacts, hours, imageSrc: image.src, imageAlt: image.alt, locationLabel: hasAddress ? 'Office location' : 'Location pending', locationUrl: hasAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : undefined }
}

const countries: AgencyCountry[] = [
  { id: 'india', name: 'India', countryCode: 'in', mapCode: 'IN', offices: [
    office('chennai','Chennai','Chennai','ARMENIAN CENTRE , 3rd LEVEL, NO:94,ARMENIAN STREET, CHENNAI - 600 001, INDIA',[{department:'AM – Operation',phone:'+91 9831530371',email:'amit.karmakar@sealloyd.in'}],'10.00 AM - 6.00 PM'),
    office('cochin','Cochin Office','Cochin','39/5109, 2nd Floor, Church Landing Road, Cochin 682016',[{department:'Sales and Support',phone:'+91 9051384775',email:'tamal.maity@sealloyd.in'}]),
    office('kolkata','Kolkata','Kolkata','Unit 205, 2nd floor, Arrjavv Square, 95A Elliot Road, Kolkata 700016',[{phone:'+91 33 4600 4075',email:'ccu@sealloyd.in'}],'10.00 AM - 6.00 PM'),
    office('mumbai','Mumbai/NhavaSheva','Navi Mumbai','Unit No: B-1108, Trishul Goldmine, Plot. 04, Sector 15, CBD Belapur, Navi Mumbai- 400614.',[{department:'Customer Service and Support',phone:'+91 22 47783539',email:'cs.mum@sealloyd.in'}],'10.00 AM - 6.00 PM'),
    office('mundra','Mundra/New Delhi','New Delhi','Unit # 404, 4th Floor, DLF Tower-B, Jasola, New Delhi -110025, India:',[{department:'Operations and Support',phone:'+91 9899855305',email:'asifkhan@sealloyd.com'}],'10.00 AM- 6.00 PM'),
    office('tuticorin','Tuticorin','Tuticorin','97G/2D, Teachers Colony, Tuticorin -628008 7th Street.',[{department:'Sales and Support',phone:'+91 9051384775',email:'tamal.maity@sealloyd.in'}],'10.00 AM - 6.00 PM'),
  ]},
  { id:'bangladesh', name:'Bangladesh', countryCode:'bd', mapCode:'BD', offices:[
    office('chattogram','Chattogram Office','Chittagong','Joy Bangla Tower (14th Floor), 78 Agrabad C/A, Chattogram-4100:',[{department:'Export',phone:'+8801329727102',email:'mukul.bd@alviline.com'},{department:'Vessel Operation',phone:'+8801329727104',email:'borhan.bd@alviline.com'},{department:'Import Documentation',phone:'+8801329727110',email:'imports.bd@alviline.com'},{department:'Operation',phone:'+8801329727103',email:'rana.bd@alviline.com'}],'9.30 AM - 6.00 PM'),
    office('dhaka','Dhaka office','Dhaka','House# 14, 3rd Floor, Flat# C-2, Block# C, Main Road Banasree Dhaka – 1219, Bangladesh',[{department:'Export Department',phone:'+8801958575415',email:'salam.bd@alviline.com'},{department:'Export Documentation',phone:'+8801958575418',email:'exports.bd@alviline.com.'}]),
    office('mongla','Mongla Office','Mongla','69, Lower Jessore Road (Ground Floor), Khulna, Bangladesh',[{department:'Export Department',phone:'+880 17 2099 8511',email:'salam.bd@alviline.com'}]),
  ]},
  {id:'singapore',name:'Singapore',countryCode:'sg',mapCode:'SG',offices:[office('singapore','Singapore office','Singapore','10 ANSON ROAD #22-08, INTERNATIONAL PLAZA, SINGAPORE 079903',[{department:'Imports and Admin',phone:'+65 8650 7360‬',email:'doc.sin@sealloyd.com'}],'10.00 AM - 6.00 PM')]},
  {id:'indonesia',name:'Indonesia',countryCode:'id',mapCode:'ID',offices:[office('jakarta','Jakarta Office','Jakarta','PT. Jasa Guna Asia Raya, City Terrace Ruko Jatibening Park, Block 20-B I JL. Dr. Ratna, Jatibening, Bekasi 17412 I, Jakarta, Indonesia',[{department:'Customer Service',phone:'62 8564 8094 522',email:'exportdoc.sub@indo-oceania.com'}],'10.00 - 6.00')]},
  {id:'kuwait',name:'Kuwait',countryCode:'kw',mapCode:'KW',offices:[office('kuwait','Kuwait Office','Kuwait','P O Box 12075 | Shamiya 71651 | Kuwait',[{department:'Customer Service & Sales Manager -Import',phone:'965 9720 9416',email:'john@absckwt.com.kw'}],'10.00 AM - 6.00 PM')]},
  {id:'philippines',name:'Philippines',countryCode:'ph',mapCode:'PH',offices:[office('philippines','Philippines Office','Philippine','To Be Announced',[{department:'Sales and Support',phone:'+8801332806374',email:'info@sealloyd.com'}])]},
  {id:'srilanka',name:'Sri Lanka',countryCode:'lk',mapCode:'LK',offices:[office('colombo','Sri Lanka Office','Colombo','No 110, Kotahena Street , Colombo 13 , Sri Lanka',[{department:'Export Department',phone:'0094-713225155',email:'nalin@nipponmarine.lk'}])]},
  {id:'thailand',name:'Thailand',countryCode:'th',mapCode:'TH',offices:[office('bangkok','Bangkok Office','Bangkok','Address: 121/81 RS Tower, 27th Floor, Room No. 2765 Ratchadaphisek Road, Dindaeng, Dindaeng, Bangkok 10400:',[{department:'Sales and Support',phone:'+91 9051384775',email:'tamal.maity@sealloyd.in'}])]},
  {id:'malaysia',name:'Malaysia',countryCode:'my',mapCode:'MY',offices:[office('malaysia','Malaysia Office','Malaysia','Ground Floor, J-02, BLOCK J, NO.3, PERSIARAN MULTIMEDIA, I-CITY, SEKSYEN 7, 40000 SHAH ALAM, SELANGOR:',[{department:'Sales and Support',phone:'+60 19 511 1213',email:'shtan.sin@sealloyd.com'}])]},
  {id:'china',name:'China',countryCode:'cn',mapCode:'CN',offices:[office('shanghai','Shanghai Office','Shanghai','NO 289, WUJIN ROAD, ROOM 325 HI TIME BUILDING, HONG KOU DISTRICT, SHANGHAI 200081.',[{department:'Office Telephone',phone:'+862136396735 , +862136396736 ,+862136396737',email:'info@sealloyd.com'},{department:'Managing Director',phone:'+8619921694750',email:'mo@sealloyd.com'},{department:'General Manager',phone:'+8617701841297 , +65 88138684',email:'may.cn@sealloyd.com'},{department:'Export/Import Ops',phone:'+8613701933607',email:'export.cn@sealloyd.com'},{department:'Sales and Support',phone:'+8615000301325',email:'sales.cn@sealloyd.com'}])]},
  {id:'kenya',name:'Kenya',countryCode:'ke',mapCode:'KE',offices:[office('mombasa','Mumbasa Office','Mombasa','P.O. Box: 87684-80100 | Mombasa | Kenya',[{department:'Country Manager / GM',phone:'254-712-354 300',email:'mahesh.w@rsske.com'}])]},
  {id:'maldives',name:'Maldives',countryCode:'mv',mapCode:'MV',offices:[office('male','Male Office','Male','H.SAAHATH, 2ND FLOOR, FILIGAS MAGU MALE 20017, MALDIVES:',[{department:'Documentations',phone:'+960 7921024',email:'docs.mv@seamaster.lk'}])]},
  {id:'qatar',name:'Qatar',countryCode:'qa',mapCode:'QA',offices:[office('doha','Doha Office','Doha','P O BOX 22766, ABDULLAH AL KAWARI BUILDING, BLDG NO 348, OFF NO 13, 2ND FLOOR, C-RING ROAD, ZONE 24, STREET 230, AL MUNTHAZAH, DOHA, QATAR. BESIDE ASTER CLINIC:',[{department:'Operation',phone:'00974 55517345',email:'opseqc@united-shipping.net'}])]},
  {id:'taiwan',name:'Taiwan',countryCode:'tw',mapCode:'TW',offices:[office('taiwan','Taiwan Office','Taiwan','To Be Announced',[{department:'Sales and Support',phone:'+8801332806374',email:'info@sealloyd.com'}])]},
  {id:'uae',name:'United Arab Emirates',countryCode:'ae',mapCode:'AE',offices:[office('jebel-ali','Jebel Ali Office','Jebel Ali','OFFICE NO 402, 4TH FLOOR, 312 AL SOUQ AL KHABEER, DR SAEED AL YOUSUF COMPLEX, DUBAI PO BOX 118209:',[{department:'Import and Export',phone:'+97145537237',email:'uae@sealloyd.com'}])]},
  {id:'hong-kong',name:'Hong Kong',countryCode:'hk',mapCode:'HK',offices:[office('hong-kong','Hong Kong Office','HONG KONG','Unit 02, 8/F, Plaza 228, 228 Wan Chai Road, Hong Kong:',[{department:'Operations and Equipment Movement',phone:'+65 9179 6633',email:'shtan.sin@sealloyd.com'}])]},
  {id:'korea',name:'Korea',countryCode:'kr',mapCode:'KR',offices:[office('busan','Busan Office','Busan','TO BE ANNOUNCED:',[{department:'Sales and Support',phone:'+8801332806374',email:'info@sealloyd.com'}])]},
  {id:'nepal',name:'Nepal',countryCode:'np',mapCode:'NP',offices:[office('birgunj','ICD Birgunj Office','ICD Birgunj','BMC Building Dryport Sirsiya Nepal, WARD NO.25:',[{department:'Asst Manager Doc and Import',phone:'+91 9051384775',email:'taharima.parvin@sealloyd.in'}])]},
  {id:'saudi-arabia',name:'Saudi Arabia',countryCode:'sa',mapCode:'SA',offices:[office('riyadh','Riyadh Office','Riyadh','PO Box 753, Riyadh-11421, Kingdom of Saudi Arabia',[{department:'Sales and Support',phone:'966 505414851',email:'ksadruh@ruh.kanoosa.com'}])]},
  {id:'tanzania',name:'Tanzania',countryCode:'tz',mapCode:'TZ',offices:[office('tanzania','Tanzania Office','Tanzania','Tanzania, Tanzania:',[{department:'Documentation – Import',phone:'+255 787066978',email:'dar.info@rsstz.com'}])]},
  {id:'vietnam',name:'Vietnam',countryCode:'vn',mapCode:'VN',offices:[office('ho-chi-minh','Ho Chi Minh Office','Vietam','No 37, D4 Street, Tan Hung Ward, District 7, Ho Chi Minh City.',[{department:'AM – Operation',phone:'+65 9179 6633',email:'shtan.sin@sealloyd.com'}])]},
]

function MapSilhouette({ code }: { code: string }) {
  const source = worldMap.locations.find(
  (location: { id: string; path: string }) => location.id === code.toLowerCase()
)
  const pathRef = useRef<SVGPathElement>(null)
  const [viewBox, setViewBox] = useState(worldMap.viewBox)

  useLayoutEffect(() => {
    if (!pathRef.current) return
    const { x, y, width, height } = pathRef.current.getBBox()
    const padding = Math.max(width, height) * 0.12
    setViewBox(`${x - padding} ${y - padding} ${width + padding * 2} ${height + padding * 2}`)
  }, [source])

  return <div className="flex h-36 w-44 items-center justify-center sm:h-44 sm:w-56" aria-hidden="true">
    {source ? <svg viewBox={viewBox} className="h-full w-full overflow-visible" role="img" focusable="false"><path ref={pathRef} d={source.path} fill="white" /></svg> : null}
  </div>
}

export function Agencies() {
  const [selectedId, setSelectedId] = useState('bangladesh')
  const [start, setStart] = useState(0)
  const selected = useMemo(() => countries.find((country) => country.id === selectedId) ?? countries[1], [selectedId])
  const visible = countries.slice(start, start + 2)
  const choose = (id: string) => { setSelectedId(id); const index = countries.findIndex((country) => country.id === id); setStart(Math.min(Math.max(index - 1, 0), Math.max(countries.length - 2, 0))) }
  const move = (direction: number) => setStart((current) => (current + direction + countries.length) % countries.length)
  return <main className="min-h-screen bg-[#f7f9fc] text-slate-800">
    <section className="overflow-hidden bg-[#2b3386] text-white" aria-label="Country agency network">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
        <div className="mb-6 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">Sea Lloyd Global Network</p><h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Agency Network</h1></div><span className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70">{countries.length} locations</span></div>
        <div className="relative flex items-center justify-center gap-2 sm:gap-12">
          <button type="button" onClick={() => move(-1)} aria-label="Previous countries" className="z-10 grid size-10 shrink-0 place-items-center rounded-full bg-white/20 text-white transition hover:bg-[#ef7120] focus:outline-none focus:ring-2 focus:ring-white"><ArrowLeft /></button>
          <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2">{visible.map((country) => <button key={country.id} type="button" onClick={() => choose(country.id)} aria-pressed={selected.id === country.id} className={`group rounded-2xl px-2 py-3 transition duration-300 ${selected.id === country.id ? 'bg-white/10 ring-1 ring-[#ef7120]' : 'hover:bg-white/5'}`}><MapSilhouette code={country.mapCode} /><span className="flex items-center justify-center gap-2 text-base font-semibold"><img src={`https://flagcdn.com/w40/${country.countryCode}.png`} alt="" className="h-4 w-6 rounded-sm object-cover" />{country.name}</span><span className="mt-1 block text-xs text-white/55">{country.offices.length} {country.offices.length === 1 ? 'office' : 'offices'}</span></button>)}</div>
          <button type="button" onClick={() => move(1)} aria-label="Next countries" className="z-10 grid size-10 shrink-0 place-items-center rounded-full bg-white/20 text-white transition hover:bg-[#ef7120] focus:outline-none focus:ring-2 focus:ring-white"><ArrowRight /></button>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-14"><div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ef7120]">Global representation</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#2b3386] sm:text-4xl">Our Offices in {selected.name}</h2></div><p className="max-w-sm text-sm leading-6 text-slate-500">Select another country above to view its complete office and contact directory.</p></div>
      <div key={selected.id} className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{selected.offices.map((item) => <article key={item.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"><div className="relative aspect-[16/8] overflow-hidden bg-[#2b3386]"><img src={item.imageSrc} alt={item.imageAlt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#0e194d]/75 to-transparent" /><div className="absolute bottom-4 left-5 right-5 text-white"><p className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">{item.city}</p><h3 className="mt-1 text-xl font-semibold">{item.officeName}</h3></div></div><div className="flex flex-col gap-5 p-5"><div className="flex gap-3 text-sm leading-6 text-slate-600"><MapPin className="mt-1 size-4 shrink-0 text-[#ef7120]" /><span>{item.address ?? 'To Be Announced'}</span></div><div className="flex items-center justify-between gap-3 rounded-xl border border-[#2b3386]/10 bg-[#f6f7fc] px-3 py-2.5"><div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-[#2b3386]"><MapPin className="size-4 shrink-0 text-[#ef7120]" /><span>{item.locationLabel}</span></div>{item.locationUrl ? <a href={item.locationUrl} target="_blank" rel="noreferrer" className="shrink-0 rounded-lg bg-[#2b3386] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#ef7120] focus:outline-none focus:ring-2 focus:ring-[#ef7120]">View map</a> : <span className="shrink-0 text-xs text-slate-400">Coming soon</span>}</div>{item.hours && <div className="flex gap-3 text-sm text-slate-600"><Clock3 className="mt-0.5 size-4 shrink-0 text-[#ef7120]" /><span>{item.hours}</span></div>}<div className="flex flex-col gap-4 border-t border-slate-100 pt-4">{item.contacts.map((contact, index) => <div key={`${item.id}-${index}`} className="flex flex-col gap-1.5 text-sm"><p className="font-semibold text-[#2b3386]">{contact.department ?? 'Contact'}</p>{contact.phone && <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className="flex items-start gap-2 text-slate-600 transition hover:text-[#ef7120]"><Phone className="mt-0.5 size-4 shrink-0 text-[#ef7120]" /><span>{contact.phone}</span></a>}{contact.email && <a href={`mailto:${contact.email}`} className="flex items-start gap-2 break-all text-slate-600 transition hover:text-[#ef7120]"><Mail className="mt-0.5 size-4 shrink-0 text-[#ef7120]" /><span>{contact.email}</span></a>}</div>)}</div></div></article>)}</div>
    </section>
  </main>
}
