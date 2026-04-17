  import Image from "next/image";
import Link from "next/link";

  export default function Home() {
    return (
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
         <div className="w-screen h-screen flex flex-col items-center">
      <div className="w-screen h-20 flex justify-evenly bg-gray-500 items-center ">
      <Link href="/">Home</Link>
      <Link href="/alunos">Alunos</Link>
      <span>Sair</span>
      </div>
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="text-4xl font-bold">
              To get started, edit the page.tsx file.
            </h1>

            <div className="group relative block max-w-[300px] overflow-hidden rounded-[10px] bg-gradient-to-b from-[#c3e6ec] to-[#a7d1d9] p-[2em_1.2em] text-left transition-all duration-500 z-0">
              <div className="absolute -right-4 -top-4 z-[-1] h-8 w-8 origin-center scale-100 rounded-full bg-gradient-to-br from-[#364a60] to-[#384c6c] transition-transform duration-[0.35s] ease-out group-hover:scale-[28]"></div>

              <div className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center overflow-hidden rounded-bl-[32px] rounded-tr-[4px] bg-gradient-to-br from-[#6293c8] to-[#384c6c]">
                <span className="mt-[-4px] mr-[-4px] text-white font-mono text-sm leading-none">→</span>
              </div>

              <h3 className="mb-[0.5em] text-[1.5em] font-bold leading-normal text-[#262626] transition-all duration-500 group-hover:text-white">
                Explore Resources
              </h3>

              <p className="text-[1em] font-normal leading-[1.5em] text-[#452c2c] transition-all duration-500 group-hover:text-white/80">
                Looking for a starting point or more instructions? Head over to{" "}
                <a
                  href="https://vercel.com/templates?framework=next.js"
                  className="font-medium underline decoration-current transition-all"
                >
                  Templates
                </a>{" "}
                or the{" "}
                <a
                  href="https://nextjs.org/learn"
                  className="font-medium underline decoration-current transition-all"
                >
                  Learning
                </a>{" "}
                center.
              </p>
            </div>

          </div>

          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-8">
            <a
              className="group relative flex h-12 items-center justify-center gap-1 overflow-hidden rounded-[100px] border-4 border-transparent bg-inherit px-9 py-4 text-base font-semibold text-[greenyellow] shadow-[0_0_0_2px_greenyellow] transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-xl hover:text-[#212121] hover:shadow-[0_0_0_12px_transparent] active:scale-95 active:shadow-[0_0_0_4px_greenyellow]"
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative z-10">Deploy Now</span>
              <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a6a7a6] opacity-0 transition-all duration-800 group-hover:h-[220px] group-hover:w-[220px] group-hover:opacity-100" />
            </a>

            <a
              className="group relative flex w-[10em] h-[3.5em] items-center justify-center bg-transparent text-white font-bold text-base border-[3px] border-ridge border-[#149CEA] rounded-[0.3em] cursor-pointer transition-all duration-1000 outline-none hover:shadow-[inset_0px_0px_25px_#1479EA]"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="absolute top-[-10px] left-[3%] w-[95%] h-[40%] bg-white dark:bg-black transition-all duration-500 origin-center group-hover:scale-0"></span>
              <span className="relative z-10 text-black dark:text-white">Documentation</span>
              <span className="absolute top-[80%] left-[3%] w-[95%] h-[40%] bg-white dark:bg-black transition-all duration-500 origin-center group-hover:scale-0"></span>
            </a>
          </div>
        </main>
      </div>
      </div>
    );
  }