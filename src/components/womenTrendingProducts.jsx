import Link from 'next/link';
import db from '@/firebase/config';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { dummyTrending } from '@/dummData';
import { getProducts } from '@/firebase/firestore/getData';


export default function WomenTrendingProducts() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProductList = async () => {
      try {
        const data = await getProducts();
        const filteredProducts = data.filter((product) => product.sex === 'f');
        const sortedProducts = filteredProducts.sort((a, b) => b.views - a.views);
        const slicedProducts = sortedProducts.slice(0, 4);
        setProductList(slicedProducts);
        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    };
    getProductList();
  }, []);
  // console.log(productList);

  useEffect(() => {
    // Update view count when a product is viewed
    const debouncedUpdateViewCount = debounce(async (productId) => {
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, { views: productList.find((product) => product.id === productId).views + 1 });
    }, 500); // Adjust the debounce delay (in milliseconds) as per your preference
    
    const updateViewCount = (productId) => debouncedUpdateViewCount(productId);
    

  // Add event listeners to track product views
  productList.forEach((product) => {
    const handleProductView = () => updateViewCount(product.id);
    const productLink = document.getElementById(`product-link-${product.id}`);
    if (productLink) {
      productLink.addEventListener('click', handleProductView);
      return () => {
        productLink.removeEventListener('click', handleProductView);
      };
    }
  });
  }, [productList]);

  return (
    <>
      <div className="flex flex-col justify-between px- md:px-6">
          <section className="my-3 md:my-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-3 lg:grid-cols-4">
                {loading
            ? Array.from(Array(4).keys()).map((index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-between ring-1 ring-slate-200"
                >
                  <div className="animate-pulse bg-gray-200 h-[208px] md:h-[550px] w-full" />
                  <div className="flex flex-col w-full text-sm px-[2px]">
                    <div className="animate-pulse bg-gray-200 h-4 w-1/2 mb-2" />
                    <div className="flex items-center gap-4">
                      <div className="animate-pulse bg-gray-200 h-4 w-1/4" />
                      <div className="animate-pulse bg-gray-200 h-4 w-1/4" />
                    </div>
                  </div>
                </div>
              ))
            : 
            (
              productList.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id} id={`product-link-${product.id}`} 
                className="flex flex-col items-center">
                    <div className='mb-2'>
                      <img
                      width='500'
                      height='500'
                          className="h-auto md:h-auto w-full"
                          src={product.image}
                          alt={product.name}
                      />
                      </div>
                      <div className='flex flex-col w-full text-sm px-[2px]'>
                        {/* <div className="text-sm mb-2">{product.views} views</div> */}
                        <p className="font-semibold">{product.name}</p>
                        <div className="flex items-center font-normal gap-4 pt-1">
                          <p className=''>GHC {product.discPrice}</p>
                          <p className="line-through text-slate-400">GHC {product.normalPrice}</p>
                        </div>
                    </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}
