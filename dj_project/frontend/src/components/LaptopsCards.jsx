import api from "../api";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/HardwareSoftware.css";
import { getBaseURL } from "../api";

export default function LaptopCards() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedIds, setAddedIds] = useState({});
  const [pendingIds, setPendingIds] = useState({});

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`${getBaseURL()}/api/products/`);
        setProducts(res.data);
      } catch (error) {
        console.log("Error Downloading", error);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  async function handle_onClick(productId, quantity) {
    if (pendingIds[productId] || addedIds[productId]) return;

    setPendingIds((prev) => ({ ...prev, [productId]: true }));

    try {
      await api.post(`${getBaseURL()}/api/cart/items/`, {
        product: productId,
        quantity: quantity,
      });

      setAddedIds((prev) => ({ ...prev, [productId]: true }));

      setTimeout(() => {
        setAddedIds((prev) => {
          const next = { ...prev };
          delete next[productId];
          return next;
        });
      }, 2000);
    } catch (error) {
      console.log("Error adding to cart", error);
    } finally {
      setPendingIds((prev) => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });
    }
  }

  if (loading) {
    return <div>loading... (first render takes 60 secs)</div>;
  }

  return (
    <div className="services-container">
      <div className="laptops-sub-container">
        
        {[...products]
          .sort((a, b) => a.id - b.id)
          .map((product) => {
            const isAdded = !!addedIds[product.id];
            const isPending = !!pendingIds[product.id];

            return (
              <div key={product.id} className="items-container">
                <div className="image-wrapper">
                  <div className="image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="item-image"
                    />
                  </div>
                </div>
                <div className="service-text">{product.name}</div>
                <div className="intro-text">{product.details}</div>
                <div className="service-price">
                  <h2>AED {product.price}</h2>
                </div>
                <div className="service-price">
                  <button
                    onClick={() => handle_onClick(product.id, 1)}
                    className={`booking-btn ${isAdded ? "cart-btn-added" : ""}`}
                    disabled={isPending || isAdded}
                  >
                    {isPending ? "Adding..." : isAdded ? "Added ✓" : "Add to cart"}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}