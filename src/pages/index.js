import Layout from "@/components/layout";
import SexLink from "@/components/sexLink";
import TrendingProducts from "@/components/trendingProducts";

export default function Home() {
  return (
    <>
    <Layout>
        <div className="my-6 px-2">
          <SexLink />
        </div>
        <div className="mt-2 lg:m-8">
          <TrendingProducts />
        </div>
    </Layout>
    </>
  );
}