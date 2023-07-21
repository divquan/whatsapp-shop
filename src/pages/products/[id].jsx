import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { getProduct } from "@/firebase/firestore/getData";
import { dummyTrending } from "@/dummData";
import { useStateContext } from '@/context/StateContext';
import Layout from "@/components/layout";


const inter = Inter({ subsets: ["latin"] });

export default function ProductDetails() {
  const [productList, setProductList] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true); // Add the loading state



  const { qty, onAdd } = useStateContext();

    // -----------------------------------------
    const router = useRouter();
    const { id } = router.query; 

  useEffect(() => {
    const getProductList = async () => {
      setProductList(dummyTrending)
      try {
        const data = await getProduct(id);
        setProductList(data);
        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    };
    getProductList();
  }, [id]);

  const hasColors = Array.isArray(productList.color);
  const hasSizes = Array.isArray(productList.size);

  return (
    <>
    <Layout>
      <div className={`md:w-[900px] md:m-[auto] ${inter.className}`}>
        <div className="flex flex-col md:gap-11 md:flex-row py-4 md:py-6 bg-white my-6 rounded-sm shadow-md lg:py-8">
          {loading ? (
              // Render the skeleton image while loading
              <div className="flex flex-col items-center justify-between ring-1 ring-slate-200">
              <div className="animate-pulse bg-gray-200 h-[70vh] md:h-[550px] md:w-[300px]" />
              <div className="flex flex-col w-full text-sm px-[2px]">
                <div className="animate-pulse bg-gray-200 h-4 w-1/2 mb-2" />
                <div className="flex items-center gap-4">
                  <div className="animate-pulse bg-gray-200 h-4 w-1/4" />
                  <div className="animate-pulse bg-gray-200 h-4 w-1/4" />
                </div>
              </div>
            </div>
          ) : 
          (
            <>
              <div>
                <div className="md:w-[98%] relative mb-4 md:mb-0 border">
                  <img
                    width={500}
                    height={500}
                    src={productList.image}
                    alt={productList.name}
                    className="h-[608px] md:h-[550px] object-contain w-full"
                  />
                  {/* <p className="absolute top-0 text-sm text-red-400">Product ID: {productList.id}</p> */}
                </div>
              </div>
              <div className="md:w-2/3">
                <div>
                  {/* <div className="text-sm mb-2">{productList.views} views</div> */}
                  <h2 className="text-sm lg:text-base">{productList.name}</h2>
                  <div className="flex gap-4">
                    <p className='font-medium'>GHC {productList.normalPrice}</p>
                    <p className="line-through font-medium text-slate-400">GHC {productList.discPrice}</p>
                  </div>
                </div>
                <div>
                {hasSizes && (
                  <div className="flex items-center">
                    <label className="block font-medium" htmlFor="selectField">
                      Size
                    </label>
                    <select
                      id="selectField"
                      className="p-2 bg-white focus:outline-none"
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    >
                      <option value="">Select Size</option>
                      {productList.size.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                  <div className="mt-3 mb-3">
                    {/* Color picker goes here*/}
                    {hasColors && (
                      <div className="mt-3 mb-3">
                        <p>Select Color:</p>
                        <div className="flex gap-2">
                          {productList.color.map((color) => (
                            <button
                              key={color}
                              className={`w-8 h-8 rounded-full ${
                                selectedColor === color ? "border-2 border-gray-500" : ""
                              }`}
                              style={{ backgroundColor: color }}
                              onClick={() => setSelectedColor(color)}
                            ></button>
                          ))}
                        </div>
                        <p>Selected Color: {selectedColor}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <button
                  onClick={() => onAdd(productList, qty, selectedColor, selectedSize)} 
                  className="px-4 w-full py-2 bg-gray-900 text-white rounded-sm shadow-2xl hover: focus:outline-none focus:bg-gray-900">
                    Add to Bag
                  </button>              
                </div>
                <div className="w-full px-4 pt-0">
                  <div className="mx-auto w-full border-y max-w-md">
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between px- py-2 text-left text-black">
                            <span className="uppercase tracking-wider font-light text-sm">Details</span>
                            <ChevronUpIcon
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-black`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="pt-2 pb-2 text-sm text-left text-gray-500">
                            <p>Hearty suede means lasting style in this timeless Italian-made chukka boot with versatile appeal.</p>
                            <span className='mt-4 block'>More details about the product will go here.</span>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                  <div className="m-6">
                    <h2 className="text-center">Customer Reviews</h2>
                    <p className="text-center mt-4 text-sm text-slate-600">No reviews yet</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
    </>
  );
}