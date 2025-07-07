"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Detail = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/${id}`);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, [id]);

  // 🛠 Edit function
  const handleEdit = async () => {
    const newName = prompt("Yangi nom:", data.name);
    const newPrice = prompt("Yangi narx:", data.price);
    const newImg = prompt("Yangi rasm URL:", data.img);

    if (!newName || !newPrice || !newImg) {
      alert("Hamma maydonlar to'ldirilishi kerak!");
      return;
    }

    try {
      const res = await fetch(`/api/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: newName,
          price: Number(newPrice),
          img: newImg
        })
      });

      if (res.ok) {
        const updated = await res.json();
        setData(updated); // UI'da yangilash
        alert("Mahsulot muvaffaqiyatli ozgartirildi");
      } 
    } catch (error) {
      console.error("Edit error:", error);
    }
  };

  // 🗑 Delete function
  const handleDelete = async () => {
    const confirmDelete = confirm("Haqiqatan ham ochirmoqchimisiz?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        alert("Mahsulot ochirildi");
        router.push("/"); 

      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) {
    return <div className="text-center text-2xl font-semibold">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-5 ">
      <div className="p-6 max-w-xl mx-auto border rounded shadow">
        <img src={data.img} alt={data.name} className="w-full h-104 object-cover mb-4" />
        <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
        <p className="text-xl text-gray-300 mb-4">${data.price}</p>
        <div className="flex justify-between gap-2 flex-wrap">
          <Link href="/" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
            Back to Products
          </Link>
          <button
            onClick={handleEdit}
            className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-300"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
