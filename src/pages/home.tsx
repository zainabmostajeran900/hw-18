import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsList } from "../apis/product";
import { FilterAside } from "../components/filterAside";
import { ProductCart } from "../components/productcart";
import { SearchContext } from "../context/SearchContext";

export const HomePage: React.FC = () => {
  const { searchTerm } = useContext(SearchContext);

  const [filters, setFilters] = React.useState({
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

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error loading products.</div>;
  
  let filteredProducts = data.products;


  if (searchTerm.trim()) {
    filteredProducts = filteredProducts.filter((product: any) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (!filters.includeOutOfStock) {
    filteredProducts = filteredProducts.filter(
      (product: any) => product.stock > 0
    );
  }

  if (filters.fastDeliveryOnly) {
    filteredProducts = filteredProducts.filter(
      (product: any) => product.fastDelivery
    );
  }

  if (filters.rating > 0) {
    filteredProducts = filteredProducts.filter(
      (product: any) => product.rating >= filters.rating
    );
  }

  if (filters.ascending) {
    filteredProducts.sort((a: any, b: any) => a.price - b.price);
  } else if (filters.descending) {
    filteredProducts.sort((a: any, b: any) => b.price - a.price);
  }

  return (
    <section className="flex container relative mx-auto gap-8  py-16">
      <FilterAside filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-grow">
        {filteredProducts.map((product: any) => (
          <ProductCart key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};
