'use client'

import Link from 'next/link'
import { ArrowRight, Box, Cloud, Container, Ship, Truck } from 'lucide-react'

const journeyStops = [
  { label: 'Inland origin', Icon: Truck },
  { label: 'Port transfer', Icon: Container },
  { label: 'Global destination', Icon: Ship },
]

export default function ShippingAnimation() {
  return (
    <section
      className="overflow-hidden bg-[#f8f9fc] py-20 text-[#2b3386] sm:py-24 lg:py-32"
      aria-labelledby="shipping-heading"
    >
      <style jsx>{`
      @keyframes truckJourney {
  0%, 5% {
    transform: translateX(-30%);
  }

  10% {
    transform: translateX(-10%);
  }

  22% {
    transform: translateX(45%);
  }

  30%, 42% {
    transform: translateX(85%);
  }

  100% {
    transform: translateX(85%);
  }
}

        @keyframes craneLift {
          0%, 42% {
            transform: translateY(0);
          }
          48% {
            transform: translateY(-105px);
          }
          56% {
            transform: translateY(-105px);
          }
          64% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes craneMove {
          0%, 48% {
            transform: translateX(0);
          }
          58% {
            transform: translateX(90px);
          }
          68% {
            transform: translateX(90px);
          }
          76% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes cargoLiftAndMove {
          0%, 42% {
            transform: translate(0, 0);
            opacity: 1;
          }
          48% {
            transform: translate(0, -105px);
            opacity: 1;
          }
          58% {
            transform: translate(90px, -105px);
            opacity: 1;
          }
          68% {
            transform: translate(90px, 0);
            opacity: 1;
          }
          73% {
            transform: translate(90px, 0);
            opacity: 0;
          }
          100% {
            transform: translate(90px, 0);
            opacity: 0;
          }
        }

        @keyframes shipDeparture {
          0%, 72% {
            transform: translateX(0);
          }
          78% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(55%);
          }
        }

        @keyframes waves {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-40px);
          }
        }

        @keyframes clouds {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(80px);
          }
        }

        @keyframes wheels {
          from {
            transform: rotate(0);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .truck {
          animation: truckJourney 20s linear infinite;
        }

        .crane {
          animation: craneMove 20s linear infinite;
        }

        .spreader {
          animation: craneLift 20s linear infinite;
        }

        .cargo {
          animation: cargoLiftAndMove 20s linear infinite;
        }

        .ship {
          animation: shipDeparture 20s ease-in-out infinite;
        }

        .waves {
          animation: waves 4s linear infinite;
        }

        .clouds {
          animation: clouds 22s linear infinite;
        }

        .wheel {
          animation: wheels 1s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .truck,
          .crane,
          .spreader,
          .cargo,
          .ship,
          .waves,
          .clouds,
          .wheel {
            animation: none !important;
          }
        }

        @media (max-width: 640px) {
          @keyframes craneMove {
            0%, 48% {
              transform: translateX(0);
            }
            58% {
              transform: translateX(45px);
            }
            68% {
              transform: translateX(45px);
            }
            76% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(0);
            }
          }

          @keyframes cargoLiftAndMove {
            0%, 42% {
              transform: translate(0, 0);
              opacity: 1;
            }
            48% {
              transform: translate(0, -70px);
              opacity: 1;
            }
            58% {
              transform: translate(45px, -70px);
              opacity: 1;
            }
            68% {
              transform: translate(45px, 0);
              opacity: 1;
            }
            73%, 100% {
              transform: translate(45px, 0);
              opacity: 0;
            }
          }
        }
      `}</style>

      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(280px,.72fr)_minmax(0,1.28fr)] lg:gap-12 lg:px-12 xl:px-16">

        {/* CONTENT */}
        <div className="relative z-10 max-w-xl">
          <p className="text-xs font-bold tracking-[0.26em] text-[#ef7120]">
            SEALLOYD LOGISTICS
          </p>

          <h2
            id="shipping-heading"
            className="mt-5 max-w-[620px] text-[clamp(2git .5rem,5vw,5rem)] font-bold leading-[.98] tracking-[-.055em]"
          >
            Moving Cargo. Connecting Markets.
          </h2>

          <p className="mt-7 max-w-lg text-base leading-7 text-[#626b91] sm:text-lg sm:leading-8">
            From inland origin to global destination, Sealloyd connects cargo
            through reliable road, port and ocean transportation.
          </p>

          <Link
            href="/services"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#2b3386] px-6 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#ef7120]"
          >
            Explore Our Services
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="mt-12 grid grid-cols-3 gap-3 border-t border-[#dfe3ef] pt-5">
            {journeyStops.map(({ label, Icon }) => (
              <div
                key={label}
                className="flex flex-col gap-2 text-xs font-semibold text-[#626b91]"
              >
                <Icon className="text-[#ef7120]" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ANIMATION */}
        <div className="relative min-w-0">
          <div
            className="relative h-[340px] overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_24px_60px_rgba(43,51,134,.10)] sm:h-[430px] lg:h-[520px]"
            aria-label="Sealloyd logistics animation"
          >

            {/* CLOUDS */}
            <div className="clouds absolute inset-x-0 top-[15%] flex justify-around text-[#2b3386]/10">
              <Cloud className="size-12 sm:size-20" />
              <Cloud className="mt-8 size-10 sm:size-16" />
              <Cloud className="size-8 sm:size-14" />
            </div>

            {/* OCEAN */}
            <div className="absolute inset-x-0 bottom-0 h-[27%] bg-[#2b3386]/[.035]" />

            <div className="absolute bottom-[27%] left-[5%] h-px w-[90%] bg-[#ef7120]/20" />

            {/* ROAD */}
            <div className="absolute bottom-[18%] left-[5%] h-1 w-[38%] rounded-full bg-[#2b3386]/10" />

            {/* TRUCK */}
            <div className="truck absolute bottom-[20%] left-[5%] z-20">
              <div className="relative">

                <Truck className="size-14 text-[#2b3386] sm:size-20" />

                {/* CONTAINER ON TRUCK */}
                <div className="absolute -right-6 bottom-5 flex h-5 w-9 items-center justify-center bg-[#ef7120] text-[5px] font-bold text-white sm:-right-8 sm:h-7 sm:w-12 sm:text-[6px]">
                  SEALLOYD
                </div>

                {/* WHEELS */}
                <span className="wheel absolute bottom-[-3px] left-3 size-2 rounded-full border-2 border-[#2b3386] bg-white sm:size-3" />
                <span className="wheel absolute bottom-[-3px] right-3 size-2 rounded-full border-2 border-[#2b3386] bg-white sm:size-3" />
              </div>
            </div>

            {/* CRANE */}
            <div className="crane absolute bottom-[27%] left-[43%] z-10 h-[53%] w-[40%]">

              {/* CRANE STRUCTURE */}
              <div className="absolute bottom-0 left-0 h-full w-1 bg-[#2b3386]" />

              <div className="absolute bottom-0 left-0 h-1 w-full bg-[#2b3386]" />

              <div className="absolute left-0 top-0 h-1 w-full bg-[#ef7120]" />

              {/* VERTICAL CABLE + SPREADER */}
              <div className="spreader absolute left-[48%] top-0 h-[50%] w-px bg-[#2b3386]">

                <div className="absolute -left-2 bottom-0 h-2 w-5 bg-[#ef7120] sm:-left-3 sm:w-7" />

              </div>

              {/* CONTAINER BEING CARRIED */}
              <div className="cargo absolute left-[calc(48%-12px)] top-[50%] h-7 w-6 bg-[#ef7120] shadow-[inset_0_0_0_2px_rgba(43,51,134,.2)] sm:-left-[calc(48%-14px)] sm:h-9 sm:w-7">
                <span className="absolute inset-0 flex items-center justify-center text-[4px] font-bold text-white">
                  BOX
                </span>
              </div>
            </div>

            {/* SHIP */}
            <div className="ship absolute bottom-[25%] right-[6%] z-10">
              <div className="relative">

                <Ship className="size-28 text-[#2b3386] sm:size-40 lg:size-52" />

                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[7px] font-bold tracking-[.2em] text-[#ef7120] sm:text-[9px]">
                  SEALLOYD
                </span>
              </div>
            </div>

            {/* WAVES */}
            <div className="waves absolute bottom-[10%] left-[5%] flex gap-1">
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="h-1 w-7 rounded-full bg-[#2b3386]/15 sm:w-10"
                />
              ))}
            </div>

            {/* LABELS */}
            <div className="absolute bottom-[27%] left-[7%] text-[9px] font-bold uppercase tracking-[.2em] text-[#2b3386]/40">
              Road
            </div>

            <div className="absolute bottom-[27%] left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-[.2em] text-[#2b3386]/40">
              Port
            </div>

            <div className="absolute bottom-[27%] right-[7%] text-[9px] font-bold uppercase tracking-[.2em] text-[#2b3386]/40">
              Ocean
            </div>

            <div className="absolute bottom-4 right-5 text-[9px] font-semibold text-[#2b3386]/35">
              A connected journey, end to end.
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
