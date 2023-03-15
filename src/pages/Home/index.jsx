import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [, setProduct] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  //GET all datas
  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProduct(response.data);
  };

  //DELETE data
  const deleteProduct = async (id) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?"))
      try {
        await axios.delete(`http://localhost:5000/products/${id}`);
        toast.success("Berhasil menghapus data");
        getProducts();
      } catch (error) {
        console.log(error);
      }
  };

  // SEARCH data
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/products");
      setPosts(response.data);
      setLoading(false);
    };

    loadPosts();
  }, []);

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input
          type="text"
          placeholder="Masukan kata kunci..."
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Produk</th>
              <th>Stok</th>
              <th className="text-right">Harga</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <h4>Loading ...</h4>
            ) : (
              posts
                // eslint-disable-next-line
                .filter((value) => {
                  if (searchName === "") {
                    return value;
                  } else if (
                    value.name.toLowerCase().includes(searchName.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((product, index) => (
                  <tr key={product._id}>
                    <td align="center">{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td className="text-right">{product.price}</td>
                    <td className="text-center">
                      <Link
                        to={`detail/${product._id}`}
                        className="btn btn-sm btn-info"
                      >
                        Detail
                      </Link>
                      <Link
                        to={`edit/${product._id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Hapus
                      </Link>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
