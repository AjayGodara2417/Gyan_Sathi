"use client";

import { CldUploadButton } from "next-cloudinary";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  contact: string;
  image_url: string;
}

export default function ProductsPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    contact: "",
    imageUrl: "",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSignedIn } = useUser();

  const fetchProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data.products);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!isSignedIn) {
      alert("You must be signed in to list a product.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/products", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Product listed!");
      setFormData({
        title: "",
        description: "",
        price: "",
        contact: "",
        imageUrl: "",
      });
      fetchProducts();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to list product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-[#F6FDF8] text-gray-900 min-h-screen px-6 py-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <div className="flex items-center gap-2">
            <p className="text-green-500 text-xl font-serif" >List Product</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className= "p-2 rounded-full transition-colors duration-200 hover:bg-green-100"
            aria-label="Add Product"
          >
            <Plus size={28}></Plus>
          </button>
          </div>
        </div>
        <p className="text-gray-600 mb-6">Buy and sell student products</p>

        {/* Filters & Search */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          {/* <div className="flex gap-4 text-sm font-medium border-b w-full max-w-md">
            <button className="border-b-2 border-green-600 pb-1">All</button>
            <button className="text-gray-500">Buying</button>
            <button className="text-gray-500">Selling</button>
          </div> */}
          <input
            type="text"
            placeholder="Search for products"
            className="w-full max-w-md border border-green-200 bg-white rounded-md py-2 px-4 placeholder:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Featured Products - Static Preview */}
        <h2 className="text-xl font-semibold mb-4">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {products.slice(0,3).map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow">
              <Image
                src={item.image_url}
                alt={item.title}
                width={400}
                height={300}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
{/*         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "Laptop",
              desc: "High-performance laptop for students",
              img: "/laptop.jpg",
            },
            {
              title: "Textbook",
              desc: "Essential textbook for your studies",
              img: "/textbook.jpg",
            },
            {
              title: "Calculator",
              desc: "Scientific calculator for math and science courses",
              img: "/calculator.jpg",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow">
              <Image
                src={item.img}
                alt={item.title}
                width={400}
                height={300}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div> */}

        {/* All Products */}
        <h2 className="text-xl font-semibold mb-4">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow">
              {product.image_url && (
                <Image
                  width={400}
                  height={300}
                  src={product.image_url}
                  alt={product.title}
                  className="h-40 w-full object-cover rounded"
                />
              )}
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="mt-1 font-bold">₹{product.price}</p>
              <p className="text-sm text-gray-500 mt-1">Contact: {product.contact}</p>
            </div>
          ))}
        </div>

        {/* Modal for List Product */}
        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow space-y-4 max-w-2xl w-full relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-2">List a Product</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Product Title"
                  required
                  className="w-full p-3 border border-green-200 rounded"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Product Description"
                  className="w-full p-3 border border-green-200 rounded"
                />
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price (₹)"
                  required
                  className="w-full p-3 border border-green-200 rounded"
                />
                <input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Your Email or Phone"
                  required
                  className="w-full p-3 border border-green-200 rounded"
                />

                <div>
                  <label className="block font-medium mb-1">Product Image</label>
                  <CldUploadButton
                    uploadPreset="gyansathinext"
                    onSuccess={(result: any) => {
                      if (result.event === "success") {
                        setFormData((prev) => ({
                          ...prev,
                          imageUrl: result.info.secure_url,
                        }));
                      }
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  />
                  {formData.imageUrl && (
                    <Image
                      width={300}
                      height={200}
                      src={formData.imageUrl}
                      alt="Preview"
                      className="mt-3 w-full max-h-48 object-contain border rounded"
                    />
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded"
                >
                  {loading ? "Listing..." : "List Product"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
