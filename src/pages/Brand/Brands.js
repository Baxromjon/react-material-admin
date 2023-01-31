import React, {Component, useEffect, useState} from 'react';
import {api} from "../../utils/api";
import request from "../../utils/request";

const Brands = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        getAllBrands()
    }, [])
    const getAllBrands = () => {
        request({
            url: api.getAllBrands,
            method: 'GET'
        }).then(res => {
            setBrands(res.data.data)
        }).catch(err => {
        })
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

            <button className="btn btn-success" >qo`shish</button>
            <br/>
            <div className="row">
                {brands?.map((item, index) =>
                    <div className="card col-md-3 m-2" style={{width: "220px", cursor: "pointer"}}>
                        <img src={'http://localhost:8090/api/photo/get/' + item.attachment.id} alt="Avatar"
                             style={{width: "100%", margin: "5px 0 0 0"}}/>
                        <div className="container">
                            <h4 className="text-center"><b>{item.name}</b></h4>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

Brands.propTypes = {};

export default Brands;