import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productApi";

const initialFormData = {
  name: "",
  description: "",
  category: "",
  image: "",
  price: "",
  oldPrice: "",
  stock: "",
  featured: false,
  rating: 0,
  reviews: 0,
  badge: "",
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const [editingProductId, setEditingProductId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await getAllProducts({
        limit: 50,
      });

      console.log("ADMIN PRODUCTS RESPONSE:", response);

      setProducts(response?.data?.products || []);
    } catch (error) {
      console.error("Failed to load products:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
      files,
    } = e.target;

    if (name === "image") {
      setImageFile(files?.[0] || null);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product._id);

    setImageFile(null);

    setFormData({
      name: product.name || "",
      description: product.description || "",
      category: product.category || "",
      image: product.image || "",
      price: product.price ?? "",
      oldPrice: product.oldPrice ?? "",
      stock: product.stock ?? "",
      featured: product.featured || false,
      rating: product.rating ?? 0,
      reviews: product.reviews ?? 0,
      badge: product.badge || "",
    });

    setShowForm(true);
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();

      productData.append(
        "name",
        formData.name.trim()
      );

      productData.append(
        "description",
        formData.description.trim()
      );

      productData.append(
        "category",
        formData.category.trim()
      );

      productData.append(
        "price",
        Number(formData.price)
      );

      productData.append(
        "stock",
        Number(formData.stock)
      );

      productData.append(
        "featured",
        formData.featured
      );

      productData.append(
        "rating",
        Number(formData.rating)
      );

      productData.append(
        "reviews",
        Number(formData.reviews)
      );

      productData.append(
        "badge",
        formData.badge.trim()
      );

      if (formData.oldPrice !== "") {
        productData.append(
          "oldPrice",
          Number(formData.oldPrice)
        );
      }

      if (imageFile) {
        productData.append(
          "image",
          imageFile
        );
      }

      console.log(
        editingProductId
          ? "UPDATING PRODUCT"
          : "CREATING PRODUCT"
      );

      if (editingProductId) {
        await updateProduct(
          editingProductId,
          productData
        );

        toast.success(
          "Product updated successfully"
        );
      } else {
        if (!imageFile) {
          toast.error(
            "Please select a product image"
          );
          return;
        }

        await createProduct(productData);

        toast.success(
          "Product created successfully"
        );
      }

      setShowForm(false);
      setEditingProductId(null);
      setImageFile(null);
      setFormData(initialFormData);

      await loadProducts();
    } catch (error) {
      console.error(
        "Product save error:",
        error
      );

      console.error(
        "PRODUCT ERROR RESPONSE:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to save product"
      );
    }
  };

  const handleDeleteProduct = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(product._id);

      toast.success(
        "Product deleted successfully"
      );

      await loadProducts();
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProductId(null);
    setImageFile(null);
    setFormData(initialFormData);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-8">
        <h2 className="text-3xl font-bold">
          Manage Products
        </h2>

        <p className="mt-5 text-gray-500">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">
            Manage Products
          </h2>

          <p className="mt-2 text-gray-500">
            View and manage your store products.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (showForm) {
              handleCancelForm();
            } else {
              setShowForm(true);
            }
          }}
          className="bg-green-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-600 transition"
        >
          {showForm
            ? "Close Form"
            : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmitProduct}
          className="mt-8 border rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold mb-6">
            {editingProductId
              ? "Edit Product"
              : "Add New Product"}
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              maxLength={120}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              required
              maxLength={80}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              name="price"
              type="number"
              min="0.01"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              name="oldPrice"
              type="number"
              min="0"
              step="0.01"
              value={formData.oldPrice}
              onChange={handleChange}
              placeholder="Old Price"
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              name="stock"
              type="number"
              min="0"
              step="1"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              required
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="border rounded-xl px-4 py-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>

              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-sm"
              />

              {imageFile && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: {imageFile.name}
                </p>
              )}

              {!imageFile &&
                editingProductId &&
                formData.image && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-500 mb-2">
                      Existing image:
                    </p>

                    <img
                      src={formData.image}
                      alt="Current product"
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <p className="mt-2 text-xs text-gray-500">
                      Existing image will be kept unless
                      you select a new one.
                    </p>
                  </div>
                )}
            </div>

            <input
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              placeholder="Badge e.g. New, Sale"
              maxLength={50}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <label className="flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4"
              />

              <span className="text-gray-700">
                Featured Product
              </span>
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product Description"
              required
              minLength={10}
              maxLength={2000}
              rows={5}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 md:col-span-2"
            />
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition"
            >
              {editingProductId
                ? "Update Product"
                : "Create Product"}
            </button>

            <button
              type="button"
              onClick={handleCancelForm}
              className="border px-6 py-3 rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {products.length === 0 ? (
        <div className="mt-8 bg-gray-50 rounded-2xl p-8 text-center">
          <p className="text-gray-500">
            No products found.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-2xl p-5 flex flex-col md:flex-row gap-5"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h3 className="text-xl font-bold">
                  {product.name}
                </h3>

                <p className="text-gray-500 mt-1">
                  {product.category}
                </p>

                <p className="text-green-600 font-bold mt-2">
                  ₹{product.price}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Stock: {product.stock}
                </p>

                {product.badge && (
                  <span className="inline-block mt-2 text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleEditProduct(product)
                  }
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteProduct(product)
                  }
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;