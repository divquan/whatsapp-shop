

export const  filterByGender = (products, gender) =>{
    return products?.filter((product) => product.data.gender === gender);
  }

  
  export const  filterItemsBySubtext = (items, subtext) =>{
    return items.filter((item) => item.data.name.toLowerCase().includes(subtext.toLowerCase()));
  }
  
/*  // Usage example
  const items: Item[] = [
    // Array items here
  ];
  
  const filteredItems = filterItemsBySubtext(items, "Leather");
  
  
  
  */