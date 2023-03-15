import Input from "../../components/Input";
import "./index.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Tambah = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/products", {
        name,
        price,
        stock,
      });
      console.log(response.data);
      toast.success("Berhasil menambahkan data");
      history.push("/");
    } catch (error) {
      console.error(error);
    }
    if (!name) {
      toast.error("Harap isi nama produk");
    }
    if (!price) {
      toast.error("Harap isi harga produk");
    }
    if (!stock) {
      toast.error("Harap isi stock produk");
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            id="name"
            placeholder="Nama Produk..."
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            label="Nama"
          />
          <Input
            name="price"
            id="price"
            type="number"
            placeholder="Harga Produk..."
            defaultValue={price}
            onChange={(e) => setPrice(e.target.value)}
            label="Harga"
          />
          <Input
            name="Stock"
            type="number"
            id="stock"
            placeholder="Stock Produk..."
            defaultValue={stock}
            onChange={(e) => setStock(e.target.value)}
            label="Stock"
          />
          {/* <Input name="status" 
          type="checkbox" 
          label="Active" checked/> */}
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
