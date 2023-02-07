import React, {useEffect, useState} from 'react';
import "./productInfo.css"
import {CURRENT_PRODUCT} from "../../utils/constant";
import request from "../../utils/request";
import {api} from "../../utils/api";

function ProductInfo() {
    const [productId, setProductId] = useState(localStorage.getItem(CURRENT_PRODUCT))
    const [currentProduct, setCurrentProduct] = useState(localStorage.getItem(CURRENT_PRODUCT))
    console.log(currentProduct)
    useEffect(() => {
        getCurrentProduct()
    }, [])

    const getCurrentProduct = () => {
        request({
            url: api.getProductById + productId,
            method: 'GET'
        }).then(res => {
            setCurrentProduct(res.data.data)
        }).catch(err => {
        })
    }
    return (
        <div>
            <div className="container bootdey">
                <div className="col-md-12">
                    <section className="panel">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="pro-img-details">
                                        <img
                                            src={'http://localhost:8090/api/photo/get/' + currentProduct?.mainPhoto?.id}
                                            style={{width: "380px"}} alt=""/>
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5 className="pro-d-title">
                                                {currentProduct.name}
                                            </h5>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row" style={{marginTop: "5px"}}>
                                                <div className="col-md-4 col-sm-4 col-xs-4">
                                                    <button className="btn fa fa-money fa-2x"
                                                        // onClick={() => hideModalMonth(item)}
                                                    >
                                                    </button>
                                                </div>
                                                <div className="col-md-4 col-sm-4 col-xs-4">
                                                    <button className="btn fa fa-edit fa-2x"
                                                        // onClick={() => hideEditModal(item)}
                                                    >
                                                    </button>
                                                </div>
                                                <div className="col-md-4 col-sm-4 col-xs-4">
                                                    <button className="btn fa fa-trash-o fa-2x"
                                                        // onClick={() => deleteModal(item)}
                                                    ></button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <p>
                                        {currentProduct.description}
                                    </p>
                                    <div className="product_meta">
                                        <span className="posted_in"> <strong>Kategoriya:</strong> <a rel="tag"
                                                                                                     href="#">{currentProduct?.category?.name}</a>, <a
                                            rel="tag" href="#">{currentProduct?.category?.category?.name}</a>.</span>
                                        <span className="tagged_as"><strong>Teglar:</strong> <a rel="tag"
                                                                                                href="#">{currentProduct?.name}</a>, <a
                                            rel="tag" href="#">{currentProduct?.category?.name}</a>.</span>
                                    </div>
                                    <div className="m-bot15"><strong>Narxi : </strong> <span
                                        className="amount-old">{currentProduct.price + " UZS"}</span> <span
                                        className="pro-price"> {currentProduct.totalPrice + " UZS"}</span>
                                    </div>
                                    <div className="m-bot15">
                                        <label><strong>Omborda mavjud:</strong></label>
                                        <span >{currentProduct.amount +" dona"}</span>
                                    </div>
                                    {/*<p>*/}
                                    {/*    <button className="btn btn-round btn-danger" type="button"><i*/}
                                    {/*        className="fa fa-shopping-cart"></i> Add to Cart*/}
                                    {/*    </button>*/}
                                    {/*</p>*/}
                                </div>
                                <div className="col-md-12">
                                    <div className="pro-img-list">
                                        {currentProduct?.photo?.map((item, index) =>
                                            <a href="#">
                                                <img src={'http://localhost:8090/api/photo/get/' + item.id}
                                                     style={{width: "115px", height: "130px"}} alt=""/>
                                            </a>
                                        )}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

ProductInfo.propTypes = {};

export default ProductInfo;