import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  image: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products"); // Sửa URL API
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center fs-5">Đang tải sản phẩm...</p>;

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Danh sách sản phẩm</h1>
      <button className="btn btn-primary">Thêm mới</button>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-center">
                <td>
                  <img src={product.image} alt={product.name} className="img-thumbnail" style={{ width: "80px", height: "80px" }} />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td className="text-danger fw-bold">
                  {product.price.toLocaleString()} VND
                </td>
                <td className="text-muted">
                  {product.stock > 0 ? `Còn hàng: ${product.stock}` : "Hết hàng"}
                </td>
                <td>
                  <button className="btn btn-primary">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;