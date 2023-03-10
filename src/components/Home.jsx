import React, { useEffect, useContext, useState } from "react";
import IndexContext from "../Context/IndexContext";

export const Home = () => {
  const { Products, getProducts, } = useContext(IndexContext);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="content m-5">
        <div id="cards" className="row">

          {
            Products.map((Product) => {
              return (
                <div className="col-3 p-4">
                  <div className="card bg-grey">
                    <div className="d-flex justify-content-center align-items-center">
                      <img className="mt-2" width={200} height={200} src={Product.img} alt={Product.name} />
                    </div>
                    <div className="p-4 d-flex flex-column">
                      <h4>Name: {Product.name}</h4>
                      <span>Description {Product.description}</span>
                      <span>Preço R$ {Product.price}</span>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};
