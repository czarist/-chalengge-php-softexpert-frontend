import React, { useEffect, useContext, useState } from "react";
import ProductContext from "../Context/ProductContext";

export const Home = () => {
  const { Products, getProducts, } = useContext(ProductContext);

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
                      <img className="mt-2" width={200} height={200} src={Product.foto} alt={Product.nome} />
                    </div>
                    <div className="p-4 d-flex flex-column">
                      <h4>Nome: {Product.nome}</h4>
                      <span>Marca {Product.marca}</span>
                      <span>Modelo {Product.modelo}</span>
                      <span>Preço R$ {Product.valor}</span>
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
