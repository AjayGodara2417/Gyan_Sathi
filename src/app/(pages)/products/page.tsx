"use client";

import { CldUploadButton } from "next-cloudinary";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

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

  const fetchProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data.products);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
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
    <div className="min-h-screen px-6 py-10 bg-gray-100 text-black">
      <h2 className="text-3xl font-bold text-center mb-6">Sell a Product</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Product Title"
          required
          className="w-full p-3 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="w-full p-3 border rounded"
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price (₹)"
          required
          className="w-full p-3 border rounded"
        />
        <input
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Your Email or Phone"
          required
          className="w-full p-3 border rounded"
        />
        
        <div>
          <label className="block font-semibold mb-1">Product Image</label>
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
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          />
          {formData.imageUrl && (
            <Image
            width={300}
            height={300}
              src={formData.imageUrl}
              alt="Preview"
              className="mt-3 w-full max-h-48 object-contain border rounded"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          {loading ? "Listing..." : "List Product"}
        </button>
      </form>

      <div className="max-w-5xl mx-auto mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            {product.image_url && (
              <Image
                width={300}
                height={200}
                src={product.image_url}
                alt={product.title}
                className="h-40 w-full object-cover rounded"
              />
            )}
            <h3 className="text-xl font-semibold mt-2">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="mt-1 font-bold">₹{product.price}</p>
            <p className="text-sm text-gray-500 mt-2">
              Contact: {product.contact}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
