import React, {Component, useEffect, useState} from 'react';
import "./categories.css"
import {api} from "../../utils/api";
import request from "../../utils/request";

const Categories = () => {
    const [categories, setCategories] = useState([]);


   useEffect(()=>{
       getAllCategories()
   },[])

   const getAllCategories = () => {
        request({
            url: api.getAllCategories,
            method: 'GET'
        }).then(res => {
            setCategories(res.data.data);
        }).catch(err => {
        })
    }

        return (
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <button className="btn"  >qo`shish</button>
                <br/>
                <div className="row">
                    {categories?.map((item, index) =>
                        <div className="card col-md-3 m-2" style={{width: "220px", cursor: "pointer"}}>
                            <img src={'http://localhost:8090/api/photo/get/' + item.attachment.id} alt="Avatar"
                                 style={{width: "100%"}}/>
                            <div className="container">
                                <h4 className="text-center"><b>{item.name}</b></h4>
                                <p className="text-center">{item.category?.name}</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        );
}

Categories.propTypes = {};

export default Categories;