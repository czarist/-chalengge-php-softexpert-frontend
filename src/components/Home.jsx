import React, { useEffect, useContext, useState } from "react";
import PostContext from "../Context/PostContext";

export const Home = () => {
  const { Posts, getPosts, } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="content m-5">
        <div id="cards" className="row">

          {
            Posts.map((Post) => {
              return (
                <div className="col-3 p-4">
                  <div className="card bg-grey">
                    <div className="d-flex justify-content-center align-items-center">
                      <img className="mt-2" width={200} height={200} src={Post.foto} alt={Post.nome} />
                    </div>
                    <div className="p-4 d-flex flex-column">
                      <h4>Nome: {Post.nome}</h4>
                      <span>Marca {Post.marca}</span>
                      <span>Modelo {Post.modelo}</span>
                      <span>Preço R$ {Post.valor}</span>
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
