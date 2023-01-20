import React, {useEffect, useState} from 'react';
import "./product.css"
import request from "../../utils/request";
import {api} from "../../utils/api";
import {Modal, ModalHeader, ModalFooter} from 'reactstrap';

const Products = () => {

    const [products, setProducts] = useState([]);
    // const [currentProduct, setCurrentProduct] = useState('');
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        getAllProducts()
    }, [])

    const getAllProducts = () => {
        request({
            url: api.getAllProducts,
            method: 'GET'
        }).then(res => {
            setProducts(res.data.data)
        }).catch(err => {
        })
    }
    const hideModal = () => {
        setShowModal(!showModal)
        console.log(showModal)
    }
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <br/>
            <div style={{width: "100px"}}>
                <button className="btn btn-success" onClick={hideModal}>qo`shish</button>
            </div>
            <div className="container py-5">
                <div className="row justify-content-left">
                    {products?.map((item, index) =>
                        <div className="col-md-4 col-lg-3 col-xl-3" style={{width: "300px", cursor: "pointer"}}>
                            <div className="card text-black">
                                <div className="card-body">
                                    <img src={'http://localhost:8080/api/photo/get/' + item.mainPhoto.id}
                                         className="card-img-top" alt="image"/>
                                    {/*<div className="flip-card-back">*/}
                                    <div className="text-center">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="text-muted mb-4">{item.brand.name}</p>
                                    </div>
                                    <div>
                                        <div className="d-flex justify-content-between text-style">
                                            <span>Narx</span><span>{item.price} UZS</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Chegirma</span><span>{item.discountPercent}%</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Umumiy narx</span><span>{item.totalPrice} UZS</span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between total font-weight-bold mt-4">
                                        <span>Umumiy narx</span><span>{item.totalPrice} UZS</span>
                                    </div>
                                    {/*</div>*/}

                                    <div>
                                        <button className="btn btn-info m-1">Bo`lib to`lash
                                        </button>
                                        <button className="btn btn-info m-1" style={{marginTop: "2px"}}>Taxrirlash
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <Modal isOpen={showModal}>
                <ModalHeader>Modal ochildi</ModalHeader>
                <ModalFooter>
                    <button className="btn btn-success">Saqlash</button>
                    <button className="btn btn-danger" onClick={hideModal}>Bekor qilish</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

Products.propTypes = {};

export default Products;