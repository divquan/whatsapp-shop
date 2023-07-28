import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Sort({ totalNumberOfProducts }) {
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for low to high, 'desc' for high to low
  

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  return (
    <div className="w-[95%] m-auto md:py-4 py-6 flex justify-between items-center text-sm font-medium">
      <p>{totalNumberOfProducts} Products</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="none">
            <div className="flex gap-3">
              <p>Sort</p>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
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
            <DropdownMenuItem onClick={() => handleSortChange('best_selling')}>
              <span>Best selling</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
