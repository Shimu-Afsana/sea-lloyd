"use client"

import Image from "next/image"

const content = {
  eyebrow: "WHY SEA LLOYD",

  heading: "Moving Forward Through Smarter Shipping",

  paragraphOne:
    "Sea Lloyd connects businesses, people and markets through dependable shipping and logistics solutions designed for a changing world.",

  paragraphTwo:
    "With strong maritime expertise and a customer-focused approach, we create practical solutions that help cargo move efficiently across regional and global trade routes.",
}

const images = {
  first: "/sealloyd ship 2.jpeg",
  second: "/sealloyd container 2.jpeg",
  third: "/seallyod-truck.jpeg",
}

export default function WhySeaLloydStory() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full border border-[#2B3386]/[0.05]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-24 h-32 w-32 rotate-45 border border-[#EF7120]/[0.05]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-[45%] h-px w-40 bg-[#2B3386]/[0.05]"
      />


      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 lg:grid-cols-[42%_58%]">

        {/* 
            LEFT CONTENT
         */}

        <div className="relative z-20 flex items-center px-6 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-[590px]">

           

            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#EF7120]" />

              <span className="font-[Biome,sans-serif] text-[11px] font-semibold tracking-[0.22em] text-[#2B3386] sm:text-xs">
                {content.eyebrow}
              </span>
            </div>


            <h2 className="font-[Biome,sans-serif] text-[clamp(2rem,4vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[#2B3386]">
              {content.heading}
            </h2>


            <div className="mt-7 h-[3px] w-16 bg-[#EF7120]" />

          

            <p className="mt-7 max-w-[540px] font-[Biome,sans-serif] text-[15px] leading-[1.8] text-slate-600 sm:text-base">
              {content.paragraphOne}
            </p>

          
            <p className="mt-5 max-w-[540px] font-[Biome,sans-serif] text-[15px] leading-[1.8] text-slate-600 sm:text-base">
              {content.paragraphTwo}
            </p>

          </div>
        </div>

        {/* 
            RIGHT VISUAL 
        */}

        <div className="relative mt-14 min-w-0 overflow-hidden lg:mt-0">

          

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
          >
            <div className="absolute left-[5%] right-0 top-[25%] h-px bg-[#2B3386]/[0.05]" />

            <div className="absolute left-[15%] right-0 top-[50%] h-px bg-[#EF7120]/[0.05]" />

            <div className="absolute left-[25%] right-0 top-[75%] h-px bg-[#2B3386]/[0.05]" />
          </div>

          {/* 
              ANIMATION CONTAINER
           */}

          <div className="relative z-10 h-[390px] w-full overflow-hidden sm:h-[470px] lg:h-[560px] xl:h-[600px]">


            <div className="why-sea-arrow absolute top-[14%] h-[72%] w-[52%] lg:w-[58%]">

              <div className="relative h-full w-full overflow-hidden shadow-[0_18px_45px_rgba(43,51,134,0.12)] [clip-path:polygon(20%_0,100%_0,82%_50%,100%_100%,20%_100%,0_50%)]">

                <Image
                  src={images.first}
                  alt="Sea Lloyd maritime shipping"
                  fill
                  priority
                  sizes="(max-width: 1024px) 55vw, 34vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-[#2B3386]/[0.08]" />

              </div>

            </div>

            {/* 
                ARROW 2
             */}

            <div className="why-sea-arrow why-sea-arrow-2 absolute top-[14%] h-[72%] w-[52%] lg:w-[58%]">

              <div className="relative h-full w-full overflow-hidden shadow-[0_18px_45px_rgba(43,51,134,0.12)] [clip-path:polygon(20%_0,100%_0,82%_50%,100%_100%,20%_100%,0_50%)]">

                <Image
                  src={images.second}
                  alt="Sea Lloyd maritime shipping"
                  fill
                  sizes="(max-width: 1024px) 55vw, 34vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-[#2B3386]/[0.08]" />

              </div>

            </div>

            {/* 
                ARROW 3
            */}

            <div className="why-sea-arrow why-sea-arrow-3 absolute top-[14%] h-[72%] w-[52%] lg:w-[58%]">

              <div className="relative h-full w-full overflow-hidden shadow-[0_18px_45px_rgba(43,51,134,0.12)] [clip-path:polygon(20%_0,100%_0,82%_50%,100%_100%,20%_100%,0_50%)]">

                <Image
                  src={images.third}
                  alt="Sea Lloyd maritime shipping"
                  fill
                  sizes="(max-width: 1024px) 55vw, 34vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-[#2B3386]/[0.08]" />

              </div>

            </div>

            {/* 
                SMALL ACCENT
            */}

            <div
              aria-hidden="true"
              className="absolute bottom-8 right-8 z-20 hidden h-3 w-3 rounded-full bg-[#EF7120] shadow-[0_0_0_8px_rgba(239,113,32,0.08)] sm:block"
            />

          </div>
        </div>
      </div>

      <style jsx>{`

        

        .why-sea-arrow {
          left: 108%;
          animation: seaLloydArrowMove 12s linear infinite;
        }

       

        .why-sea-arrow-2 {
          animation-delay: -4s;
        }


        .why-sea-arrow-3 {
          animation-delay: -8s;
        }

        @keyframes seaLloydArrowMove {

          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-190%);
          }

        }

        /*
           TABLET
         */

        @media (max-width: 1023px) {

          .why-sea-arrow {
            left: 108%;
            animation-duration: 11s;
          }

          .why-sea-arrow-2 {
            animation-delay: -3.67s;
          }

          .why-sea-arrow-3 {
            animation-delay: -7.34s;
          }

        }

        /* 
           MOBILE
        */

        @media (max-width: 640px) {

          .why-sea-arrow {
            left: 112%;
            width: 68%;
            animation-duration: 10s;
          }

          .why-sea-arrow-2 {
            animation-delay: -3.33s;
          }

          .why-sea-arrow-3 {
            animation-delay: -6.66s;
          }

        }

        /*
           REDUCED MOTION
         */

        @media (prefers-reduced-motion: reduce) {

          .why-sea-arrow,
          .why-sea-arrow-2,
          .why-sea-arrow-3 {
            animation: none;
            left: 22%;
          }

        }

      `}</style>
    </section>
  )
}