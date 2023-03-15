import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {toast} from "react-toastify";
import "./index.scss";


const Edit = () => {
    const { empid } = useParams();

    useEffect(() => {
        fetch("http://localhost:5000/products/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp._id);
            namechange(resp.name);
            pricechange(resp.email);
            stockchange(resp.phone);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [empid]);

    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[price,pricechange]=useState("");
    const[stock,stockchange]=useState("");
    const history = useHistory();


    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={id,name,price,stock};
      

      fetch("http://localhost:5000/products/"+empid,{
        method:"PATCH",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
        toast.success('Berhasil mengubah data');
        history.push("/")
      }).catch((err)=>{
        console.log(err.message);
      })

    }


  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={handlesubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={name}
            onChange={e=>namechange(e.target.value)}
          />
        
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={price}
            onChange={e=>pricechange(e.target.value)}
          />
          
          <Input
            name="Stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={stock}
            onChange={e=>stockchange(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};


export default Edit;
