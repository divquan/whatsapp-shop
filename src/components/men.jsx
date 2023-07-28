import Link from 'next/link';
import db from '@/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { getProducts } from '@/firebase/firestore/getData';
import Layout from './layout';
import Title from './collection-title';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from "@/components/ui/separator"

export default function Women() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true); // Add the loading state
  const [sortOrder, setSortOrder] = useState('asc'); // New state for sorting order ('asc' or 'desc')
  const [selectedCategory, setSelectedCategory] = useState(null); // New state for selected category filter


  useEffect(() => {
    const getProductList = async () => {
      try {
        const data = await getProducts();
        let filteredProducts = data.filter((product) => product.sex === 'm');

        // Filter products based on the selected category
        if (selectedCategory) {
          filteredProducts = data.filter((product) => product.sex === 'm' && product.category === selectedCategory);
        }

        // Sort the products based on the selected sort order
        if (sortOrder === 'asc') {
          filteredProducts.sort((a, b) => a.discPrice - b.discPrice);
        } else if (sortOrder === 'desc') {
          filteredProducts.sort((a, b) => b.discPrice - a.discPrice);
        } else if (sortOrder === 'best_selling') {
          // Add your custom logic for sorting by best selling here
          // For example, you might have a 'sales' field in the products and sort based on that.
        }

        setProductList(filteredProducts);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error(error);
      }
    };
    getProductList();
  }, [sortOrder, selectedCategory]); // Add selectedCategory as a dependency


  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

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
    <Layout>
      <div>
        <Title title={"Men's"} />
      </div>
      <div className='sticky top-[84px] md:top-[94px] bg-white z-40 border-y'>
          <div className="w-[95%] m-auto py-3 flex justify-between items-center text-sm font-medium">
            <p>{productList.length} Products</p>
            <div className='flex items-center'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="none">
                    <div className="flex gap-3">
                      <p>Filter</p>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                      </svg>
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <div className="flex flex-col items-center gap-3 py-3">
                    <DropdownMenuItem onClick={() => handleFilterChange('')}>
                      <span>All</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('Oxfords')}>
                      <span>Oxfords</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('Loafers')}>
                      <span>Loafers</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('Sandals')}>
                      <span>Sandals</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('Boots')}>
                      <span>Boots</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('Sneakers')}>
                      <span>Sneakers</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('Trainers')}>
                      <span>Trainers</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <div>
                <Separator orientation="vertical" />
              </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="none">
                  <div className="flex gap-3">
                    <p>Sort</p>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                      </svg>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <div className="flex flex-col items-center gap-3 py-3">
                  <DropdownMenuItem onClick={() => handleSortChange('asc')}>
                    <span>Price, low to high</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSortChange('desc')}>
                    <span>Price, high to low</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled={true} onClick={() => handleSortChange('best_selling')}>
                    <span>Best selling</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
          </div>
      </div>
      <section className="my-3 md:my-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-3 lg:grid-cols-4">
          {loading
            ? 'Loading...' 
            // Array.from(Array(8).keys()).map((index) => (
            //     <div
            //       key={index}
            //       className="flex flex-col items-center justify-between ring-1 ring-slate-200"
            //     >
            //       <div className="animate-pulse bg-gray-200 h-[208px] md:h-[550px] w-full" />
            //       <div className="flex flex-col w-full text-sm px-[2px]">
            //         <div className="animate-pulse bg-gray-200 h-4 w-1/2 mb-2" />
            //         <div className="flex items-center gap-4">
            //           <div className="animate-pulse bg-gray-200 h-4 w-1/4" />
            //           <div className="animate-pulse bg-gray-200 h-4 w-1/4" />
            //         </div>
            //       </div>
            //     </div>
            //   ))
            : 
            (
              // Render the actual product image when data is available
              productList.map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  id={`product-link-${product.id}`}
                  className="flex flex-col items-center"
                >
                    <img
                      width='500'
                      height='500'
                        className="h-[30vh] object-contain md:h-auto w-full"
                        src={product.image}
                        alt={product.name}
                        // style={{
                        //   aspectRatio: '16/14',
                        // }}
                    />
                    <div className='flex flex-col w-full text-sm px-[2px]'>
                      <p className="font-semibold">{product.name}</p>
                      <div className="flex items-center font-normal gap-4 pt-1">
                        <p className=''>GHC {product.normalPrice}</p>
                        <p className="line-through text-slate-400">GHC {product.discPrice}</p>
                      </div>
                    </div>
                </Link>
              ))
            )}
          </div>
        </section>
    </Layout>
  );
}