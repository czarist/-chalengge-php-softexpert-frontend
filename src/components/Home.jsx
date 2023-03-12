import React, { useEffect, useContext, useState } from "react";
import IndexContext from "../Context/IndexContext";
import { Link } from 'react-router-dom';

export const Home = () => {
  const { Products, getProducts } = useContext(IndexContext);

  useEffect(() => {
    getProducts();
  }, []);

  const getStyle = (src) => ({
    backgroundImage: `url("${src}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '250px'
  });


  return (
    <div>
      <div className="content m-5">
        <div id="cards" className="row">

          {
            Products.map((Product) => {
              return (
                <div className="col-3 p-4"  >
                  <div className="card bg-grey" style={{ minHeight: '500px' }}>
                    <div className="d-flex justify-content-center align-items-center" >
                      <div className="" style={getStyle(Product.img)}></div>
                    </div>
                    <div className="p-4 d-flex flex-column">
                      <h4>Name: {Product.name}</h4>
                      <span>Description {Product.description}</span>
                      <span>Preço R$ {Product.price}</span>
                      <Link to="/cart" className="w-100">
                        <button className="w-100 btn btn-primary mt-4" onClick={''}>
                          <i className="bi bi-cart-fill"></i>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div >
  );
};
