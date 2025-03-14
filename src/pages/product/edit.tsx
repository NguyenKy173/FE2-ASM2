import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaBox, FaShoppingCart, FaUsers, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, price: Number(product.price), stock: Number(product.stock) })
      });
      if (response.ok) {
        alert("Sản phẩm đã được cập nhật thành công!");
        navigate("/list");
      } else {
        alert("Lỗi khi cập nhật sản phẩm!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  return (
    <div className="d-flex vh-100 bg-light">
      <div className="bg-dark text-white p-4 d-flex flex-column" style={{ width: "300px" }}>
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
        <h1 className="text-center mb-4 text-primary">Chỉnh sửa sản phẩm</h1>
        <form onSubmit={handleSubmit} className="shadow-sm bg-white p-4 rounded">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Tên sản phẩm</label>
              <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Giá</label>
              <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Danh mục</label>
              <input type="text" className="form-control" name="category" value={product.category} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Tồn kho</label>
              <input type="number" className="form-control" name="stock" value={product.stock} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Hình ảnh (URL)</label>
              <input type="text" className="form-control" name="image" value={product.image} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Mô tả</label>
              <textarea className="form-control" name="description" value={product.description} onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary m-2">Cập nhật</button>
          <Link to="/list">
            <button type="button" className="btn btn-secondary">Hủy</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
