import { useState, useEffect, useRef } from "react";
import { getAnimationProducts } from "@/firebase/firestore/getData";

export default function AnimatedMenProducts() {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const bottomRef = useRef(null);

    useEffect(() => {
      const getProductList = async () => {
        try {
          const data = await getAnimationProducts();
          const filterMenProducts = data.filter((product) => product.sex === 'm');
          setProductList(filterMenProducts);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      getProductList();
    }, []);

    // Function to scroll to the bottom of the list
    const scrollToBottom = () => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Call the scrollToBottom function after the component renders
    useEffect(() => {
      scrollToBottom();
    }, [productList]);

    return (
        <>
            {productList.map((product) => (
                <div key={product.id} className="animate-carouselB2T flex flex-col gap-y-2" ref={bottomRef}>
                    <div className="flex-none">
                        <img
                            width={600}
                            height={600}
                            className="w-full h-auto relative" 
                            src={product.image} 
                            alt=""
                        />
                    </div>
                </div>
            ))}
            {/* <div ref={bottomRef} /> */}
        </>
    );
}
