import AnimatedMenProducts from "@/components/animatedMenProducts";
import AnimatedWomenProducts from "@/components/animatedWomenProducts";

export default function Home() {
  return (
    <>
      <main className="bg-slate-100 h-screen md:flex md:gap-2">
        <section className="h-[70vh] bg-slate-200 mx-3 overflow-auto md:h-screen md:flex-1">
          {/* Left side: animated products */}
          <div className="grid grid-cols-2 gap-x-2">
            <div className="h-full">
              <AnimatedWomenProducts />
            </div>
            <div className="flex flex-col">
              <AnimatedMenProducts />
            </div>
            <div className="hidden">
              <AnimatedMenProducts />
            </div>
          </div>
        </section>
        {/* Right side: logo & texts */}
        <div className="md:h-screen">
          <section className="hidden md:flex h-[70vh] bg-slate-300 justify-center items-center">
            <div className="text-black text-6xl uppercase leading-none font-bold">
              <span>Veliore</span>
            </div>
          </section>
          <section className="h-[30vh] md:h-[30vh] p-2 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h1 class="w-full flex-none font-bold uppercase text-2xl leading-none text-slate-900">
                Welcome <br /> to Veliore
              </h1>
              <p>Our goal is to build the largest catalog of quality fashion products.</p>
            </div>
            <div className="flex justify-between gap-4">
              <button className="border border-black py-2 font-medium rounded-lg w-full">
                <span>Shop Women</span>
              </button>
              <button className="border border-black py-2 font-medium rounded-lg w-full">
                <span>Shop Men</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}