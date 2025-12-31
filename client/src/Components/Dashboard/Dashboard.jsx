import React, { useEffect, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import styles from "./Dashboard.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [currentPages, setCurrentPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchProductsData() {
      const skip = (currentPages - 1) * 12;
      const data = await fetch(
        `https://dummyjson.com/products?limit=12&skip=${skip}`
      ).then((res) => res.json());

      setTotalPages(Math.ceil(data.total / 12));
      setProducts(data.products);
    }

    fetchProductsData();
  }, [currentPages]);

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken)  
    navigate("/login")
  else 
    return (
    <>
    <Header />
      <section className={styles.container}>
        <p className={styles.heading}>Products</p>

        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <img
                src={product.images[0]}
                alt={product.title}
                loading="lazy"
                className={styles.image}
              />
              <p className={styles.title}>{product.title.slice(0, 12)}...</p>
              <p className={styles.price}>₹ {product.price}</p>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          <button
            className={`${styles.pageBtn} `}
            disabled={currentPages === 1}
            onClick={() => setCurrentPages((prev) => prev - 1)}
          >
            <FaArrowLeftLong size={24} />
          </button>

          <p className={styles.pageText}>
            Page {currentPages} of {totalPages}
          </p>

          <button
            className={`${styles.pageBtn} `}
            disabled={currentPages === totalPages}
            onClick={() => setCurrentPages((prev) => prev + 1)}
          >
            <FaArrowRightLong size={24} />
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Dashboard;
