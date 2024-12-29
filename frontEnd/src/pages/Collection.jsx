import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { assets } from '../assets/assets';

function Collection() {
  const { products , search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [filterdProducts, setFilterdProducts] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  // Toggle category selection
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Toggle sub-category selection
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Apply filtering and sorting
  const applyFilterAndSort = () => {
    // Start with all products
    let filtered = products.slice();

    // Apply category filter
    if (showSearch && search) {
      filtered = filtered.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    // Apply sub-category filter
    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
    }

    // Apply sorting
    if (sortType === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    // Update the state with the final result
    setFilterdProducts(filtered);
  };

  // Reapply filters and sorting when any dependency changes
  useEffect(() => {
    applyFilterAndSort();
  }, [category, subCategory, sortType, search ,products]);

  return (
    <div className='flex flex-col md:flex-row sm:gap-10 pt-10 border-t gap-1'>
      {/* Left side of page that contains filters */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2" >
          FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt=""/>
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-5 ${showFilter ? '' : 'hidden'} md:block`} >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label>
              <input className="w-3 m-1" type="checkbox" value="Men" onChange={toggleCategory} />
              Men
            </label>
            <label>
              <input className="w-3 m-1" type="checkbox" value="Women" onChange={toggleCategory} />
              Women
            </label>
            <label>
              <input className="w-3 m-1" type="checkbox" value="Kids" onChange={toggleCategory} />
              Kids
            </label>
          </div>
        </div>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} md:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label>
            <input className="w-3 m-1" type="checkbox" value="Topwear" onChange={toggleSubCategory} />
            Top-Wear
            </label>
            <label>
            <input className="w-3 m-1" type="checkbox" value="Bottomwear"onChange={toggleSubCategory}/>
            Bottom-Wear
            </label>
            <label>
              <input className="w-3 m-1" type="checkbox" value="Winterwear" onChange={toggleSubCategory} />
              Winter-Wear
            </label>
          </div>
        </div>
      </div>
      {/* ************************************************************************************************************* */}
      {/* Right side of page that contains products */}
      <div className="m-auto w-full md:w-9/12">
        <div className="flex justify-between text-base sm:text-xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select onChange={(e) => setSortType(e.target.value)} className="border border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-2 gap-y-6">
          {filterdProducts.length > 0 ? (
            filterdProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
          ) : (
            <p className='w-96'>No products found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collection;
