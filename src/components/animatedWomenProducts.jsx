import { useState, useEffect } from "react";
import { getAnimationProducts } from "@/firebase/firestore/getData";

export default function AnimatedWomenProducts() {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const getProductList = async () => {
        try {
          const data = await getAnimationProducts();
          const filterWomenProducts = data.filter((product) => product.sex === 'f');
        //   const slicedProducts = sortedProducts.slice(0, 4);
          setProductList(filterWomenProducts);
          setLoading(false)
        } catch (error) {
          console.error(error);
        }
      };
      getProductList();
    }, []);

    return (
        <>
            {productList.map((product) => (
                <div key={product.id} className="animate-carouselT2B flex flex-col gap-y-2">
                    <div className="flex-none">
                    <img
                        width={600}
                        height={600}
                        className="w-full h-auto relative" 
                        src={product.image} 
                        alt="" />
                    </div>
                </div>
            ))}
        </>
    )
}