import AnimatedMenProducts from "@/components/animatedMenProducts";
import AnimatedWomenProducts from "@/components/animatedWomenProducts";
import LaunchDate from "@/components/launchDate";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const departments = [
  {
    id: 1,
    sex: "Shop Women",
  },
  {
    id: 2,
    sex: "Shop Men"
  }
]

export default function Home() {
  return (
    <>
      <main className="bg-[#f5f5f7] h-screen md:flex">
        <section className="h-[70vh] bg-[#f5f5f7] mx-3 overflow-auto md:h-screen md:flex-1">
          {/* Left side: animated products */}
          <div className="grid grid-cols-2 gap-x-2">
            <div className="flex flex-col gap-y-1">
              <AnimatedWomenProducts />
            </div>
            <div className="flex flex-col gap-y-1">
              <AnimatedMenProducts />
            </div>
          </div>
        </section>
        {/* Right side: logo & texts */}
        <div className="md:h-screen bg-white">
          <section className="hidden md:flex h-[70vh] bg-white justify-center items-center">
            <div className="text-black text-6xl text-center uppercase leading-none font-bold">
              <h1>Welcome to</h1>
              <h1>Veliore</h1>
            </div>
          </section>
          <section className="h-[30vh] md:h-[30vh] md:border-t px-3 py-5 flex flex-col gap-5 md:gap-8">
            <div className="flex flex-col gap-2">
              <h1 class="w-full flex-none md:hidden font-bold uppercase text-2xl leading-none text-slate-900">
                <span>Welcome <br /> to </span>Veliore
              </h1>
              <div className="md:text-xl max-w-lg md:font-semibol">Our goal is to build the largest catalog of quality footwears in Ghana.
              <Dialog>
                  <DialogTrigger asChild>
                      <span className="text-orange-600 underline pl-[4px] underline-offset-4 cursor-pointer">
                        Get early access.
                      </span>
                  </DialogTrigger>
                  <DialogContent className="h-full bg-[#f5f5f7]">
                      <div>
                        <LaunchDate />
                      </div>
                  </DialogContent>
                </Dialog>
                </div>
            </div>
            <div className="flex justify-between gap-4">
                {departments.map((department) => (
                  <Dialog key={department.id}>
                  <DialogTrigger asChild>
                    <Button variant="none" className='border border-black py-2 font-medium rounded-lg w-full'>
                      <span className="text-black">
                        {department.sex}
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="h-full bg-[#f5f5f7]">
                      <div>
                        <LaunchDate />
                      </div>
                  </DialogContent>
                </Dialog>
                ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}