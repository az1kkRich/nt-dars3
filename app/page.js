"use client";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default  function Home(request) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api`);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-3xl">Products:</h1>

      <div className="flex flex-row gap-4">
        {data.map((product) => (
          <div key={product.id} className="w-1/4 bg-gray-900 rounded-2xl">
            <img  src={product.img} alt={product.name} className="object-cover w-full h-79 rounded-t-2xl" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-white">{product.name}</h2>
              <p className="text-gray-400">{product.description}</p>
              <p className="text-lg font-bold text-white mt-2">${product.price}</p>
              {/* read more button */}
              <Link href={`/detail/${product.id}`} >
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
