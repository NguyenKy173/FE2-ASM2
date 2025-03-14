import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBox, FaShoppingCart, FaUsers, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  image: string;
}

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
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
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setProducts(products.filter(product => product.id !== id));
          // alert("Sản phẩm đã được xóa thành công!");
        } else {
          alert("Lỗi khi xóa sản phẩm!");
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  return (
    <div className="d-flex vh-100 bg-light">
      <div className="bg-dark text-white p-4 d-flex flex-column" style={{ width: "250px" }}>
        <h2 className="text-center border-bottom pb-3">Admin Panel</h2>
        <ul className="nav flex-column mt-3">
          <li className="nav-item">
            <Link className="btn text-white w-100 text-start py-2 bg-dark" to="/list">
              <FaBox /> Quản lý sản phẩm
            </Link>
          </li>
          <li className="nav-item">
            <Link className="btn text-white w-100 text-start py-2 bg-dark" to="/orders">
              <FaShoppingCart /> Quản lý đơn hàng
            </Link>
          </li>
          <li className="nav-item">
            <Link className="btn text-white w-100 text-start py-2 bg-dark" to="/customers">
              <FaUsers /> Quản lý khách hàng
            </Link>
          </li>
          <li className="nav-item">
            <Link className="btn text-white w-100 text-start py-2 bg-dark" to="/stats">
              <FaChartBar /> Quản lý thống kê
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-grow-1 p-4">
        <h1 className="text-center mb-4 text-primary">Danh sách sản phẩm</h1>
        {loading ? (
          <p className="text-center fs-5 text-primary">Đang tải sản phẩm...</p>
        ) : (
          <div className="table-responsive shadow-sm bg-white p-3 rounded">
            <Link to ="/add"><button className="btn btn-primary mb-2">Thêm mới</button></Link>
            <table className="table table-hover">
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
                  <tr key={product.id} className="text-center align-middle">
                    <td>
                      <img src={product.image} alt={product.name} className="rounded shadow-sm" style={{ width: "80px", height: "80px" }} />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td className="text-danger fw-bold">
                      {product.price.toLocaleString()} VND
                    </td>
                    <td className="text-muted">
                      {product.stock > 0 ? `✅ Còn hàng: ${product.stock}` : "❌ Hết hàng"}
                    </td>
                    <td>
                      <button className="btn btn-warning me-2"> Cập nhật</button>
                      <button className="btn btn-danger" onClick={()=>handleDelete(product.id)}> Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
