import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsList } from "../apis/product";
import { FilterAside } from "../components/filterAside";
import { ProductCart } from "../components/productcart";
import { SearchContext } from "../context/SearchContext";

export const HomePage: React.FC = () => {
  const { searchTerm } = useContext(SearchContext);

  const [filters, setFilters] = useState({
    ascending: false,
    descending: false,
    includeOutOfStock: false,
    fastDeliveryOnly: false,
    rating: 0,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchProducts"],
    queryFn: fetchProductsList,
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error || !data) return <div className="text-center py-10">Error loading products.</div>;

  let filteredProducts = data.products;

  if (searchTerm.trim()) {
    filteredProducts = filteredProducts.filter((product: any) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (!filters.includeOutOfStock) {
    filteredProducts = filteredProducts.filter((product: any) => product.stock > 0);
  }

  if (filters.fastDeliveryOnly) {
    filteredProducts = filteredProducts.filter((product: any) => product.fastDelivery);
  }

  if (filters.rating > 0) {
    filteredProducts = filteredProducts.filter((product: any) => product.rating >= filters.rating);
  }

  if (filters.ascending) {
    filteredProducts.sort((a: any, b: any) => a.price - b.price);
  } else if (filters.descending) {
    filteredProducts.sort((a: any, b: any) => b.price - a.price);
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex flex-row gap-x-5 overflow-x-auto">
        {/* Sidebar Filter */}
        <div className=" shrink-0">
          <FilterAside filters={filters} setFilters={setFilters} />
        </div>

        {/* Product Grid */}
        <div className="flex-grow md:w-full mt-20 sm:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length ? (
              filteredProducts.map((product: any) => (
                <ProductCart key={product.id} {...product} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No products match the filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
