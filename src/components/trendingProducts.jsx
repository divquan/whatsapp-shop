import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import MenTrendingProducts from './menTrendingProducts';
import WomenTrendingProducts from './womenTrendingProducts';




export default function TrendingProducts() {
  return (
    <div className="flex flex-col justify-between">
      <section className="px-4 py-2">
        <h3 className="uppercase text-center text-base tracking-wide md:text-lg lg:text-2xl text-black font-semibold mb-4 md:mb-8 lg:mb-10">Trending</h3>
        <Tabs defaultValue="women" className="w-full">
                  <TabsList className="flex justify-center">
                    <TabsTrigger value="women">Women</TabsTrigger>
                    <TabsTrigger value="men">Men</TabsTrigger>
                  </TabsList>
                  <TabsContent value="women">
                    <div>
                      <WomenTrendingProducts />
                    </div>
                  </TabsContent>
                  <TabsContent value="men">
                      <div className="">
                        <MenTrendingProducts />
                      </div>
                  </TabsContent>
                </Tabs>
      </section>
    </div>
  );
}