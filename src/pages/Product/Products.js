import React, {useEffect, useState} from 'react';
import "./product.css"
import request from "../../utils/request";
import {api} from "../../utils/api";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {useForm} from "react-hook-form";
import AddMonthlyPrice from "./AddMonthlyPrice";
import EditProduct from "./EditProduct";
import {Link, useHistory} from "react-router-dom";
import {CURRENT_PRODUCT} from "../../utils/constant";


const Products = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [measurements, setMeasurements] = useState([]);
    const [categories, setCategories] = useState([]);
    const [details, setDetails] = useState([]);
    const [brands, setBrands] = useState([]);
    const [currentFile, setCurrentFile] = useState([]);
    const [showMonthModal, setShowModalMonth] = useState(false);
    const [showEditModal, setEditShowModal] = useState(false);
    const [month, setMonth] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const history = useHistory();
    // window.setTimeout(function () {
    //     if (showEditModal===false) {
    //         window.location.reload();
    //     }
    // }, 10000)
    useEffect(() => {
        getAllProducts()
        getAllMeasurements()
        getAllCategories()
        getAllDetails()
        getAllBrands()
        getMonth()
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
    const getAllMeasurements = () => {
        request({
            url: api.getAllMeasurements,
            method: 'GET'
        }).then(res => {
            setMeasurements(res.data.data)
        }).catch(err => {
            alert(err.data.message)
        })
    }
    const getAllCategories = () => {
        request({
            url: api.getAllCategories,
            method: 'GET'
        }).then(res => {
            setCategories(res.data.data)
        }).catch(err => {
        })
    }
    const getAllDetails = () => {
        request({
            url: api.getDetails,
            method: 'GET'
        }).then(res => {
            setDetails(res.data.data)
        }).catch(err => {
        })
    }
    const getAllBrands = () => {
        request({
            url: api.getAllBrands,
            method: 'GET'
        }).then(res => {
            setBrands(res.data.data)
        }).catch(err => {
        })
    }
    const hideModal = () => {
        setShowModal(!showModal)
    }
    const uploadFile = (file) => {
        let formData = new FormData();
        for (let i = 0; i < file.target.files.length; i++) {
            formData.append("files", file.target.files[i])
        }
        request({
            url: api.addFile,
            method: 'POST',
            data: formData
        }).then(res => {
            setCurrentFile(res.data)
        }).catch(err => {
        })
    }
    const AddProduct = (e, v) => {
        let ProductDTO = {
            name: '',
            categoryId: '',
            measurementId: '',
            discountPercent: '',
            description: '',
            photoId: [],
            warrantyMonth: '',
            detailId: [],
            price: '',
            active: '',
            brandId: '',
            carousel: '',
            flash: ''
        }
        ProductDTO.name = e.name;
        ProductDTO.categoryId = e.categoryId;
        ProductDTO.brandId = e.brandId;
        ProductDTO.carousel = e.carousel;
        ProductDTO.description = e.description;
        ProductDTO.detailId = e.detailId;
        ProductDTO.discountPercent = e.discountPercent;
        ProductDTO.flash = e.flash;
        ProductDTO.measurementId = e.measurementId;
        ProductDTO.photoId = currentFile;
        ProductDTO.price = e.price;
        ProductDTO.warrantyMonth = e.warrantyMonth;
        ProductDTO.active = e.active;
        request({
            url: api.addProduct,
            method: 'POST',
            data: ProductDTO
        }).then(res => {
            getAllProducts()
            hideModal()
        }).catch(err => {
        })
    }
    const getMonth = () => {
        request({
            url: api.getAllMonth,
            method: 'GET'
        }).then(res => {
            setMonth(res.data.data)
        }).catch(err => {
        })
    }
    const saveMonthPrice = (e, v) => {
        let DTO = {
            productId: '',
            monthId: '',
            price: ''
        }
        DTO.price = e.price;
        DTO.monthId = e.monthId;
        DTO.productId = currentProduct.id;
        request({
            url: api.saveMonthlyPrice,
            method: 'POST',
            data: DTO
        }).then(res => {
            getAllProducts()
            setShowModalMonth(false)
        }).catch(err => {
            alert(err.response.data.message)
        })

    }
    const hideModalMonth = (item) => {
        setCurrentProduct(item)
        setShowModalMonth(!showMonthModal)
    }
    const hideEditModal = (item) => {
        setCurrentProduct(item)
        setEditShowModal(!showEditModal)
        getAllProducts()
    }

    const deleteModal = (item) => {
        setCurrentProduct(item)
        setShowDeleteModal(!showDeleteModal)
    }
    const deleteProduct = () => {
        request({
            url: api.deleteProduct + currentProduct.id,
            method: 'DELETE'
        }).then(res => {
            getAllProducts()
            deleteModal()
        }).catch(err => {
        })
    }
    const getCurrentProduct=(item)=>{
        localStorage.setItem(CURRENT_PRODUCT, item.id);
    }

    return (
        <div>
            <br/>
            <div>
                <button className="btn fa fa-plus-circle fa-3x" onClick={hideModal}></button>
            </div>
            {/*<div className="container py-5">*/}
            {/*    <div className="row">*/}
            {/*        {products?.map((item, index) =>*/}
            {/*            <div className="col-md-3" style={{width: "300px", cursor: "pointer"}}>*/}
            {/*                <div className="card text-black">*/}
            {/*                    <div className="card-body">*/}
            {/*                        <img src={'http://localhost:8090/api/photo/get/' + item.mainPhoto.id}*/}
            {/*                             className="card-img-top" alt="image"*/}
            {/*                             style={{width: "220px", height: "300px"}}/>*/}
            {/*                        /!*<div className="flip-card-back">*!/*/}
            {/*                        <div className="text-center">*/}
            {/*                            <h6 className="card-title">{item.name}</h6>*/}
            {/*                            <p className="text-muted mb-4">{item.brand.name}</p>*/}
            {/*                        </div>*/}
            {/*                        <div>*/}
            {/*                            <div className="d-flex justify-content-between text-style">*/}
            {/*                                <span>Narx</span><span>{item.price} UZS</span>*/}
            {/*                            </div>*/}
            {/*                            <div className="d-flex justify-content-between">*/}
            {/*                                <span>Chegirma</span><span>{item.discountPercent}%</span>*/}
            {/*                            </div>*/}
            {/*                            <div className="d-flex justify-content-between">*/}
            {/*                                <span>Umumiy narx</span><span>{item.totalPrice} UZS</span>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div className="d-flex justify-content-between total font-weight-bold mt-4">*/}
            {/*                            <span>Umumiy narx</span><span>{item.totalPrice} UZS</span>*/}
            {/*                        </div>*/}
            {/*                        /!*</div>*!/*/}

            {/*<div className="row">*/}
            {/*    <button className="btn btn-info m-1" onClick={() => hideModalMonth(item)}>Bo`lib*/}
            {/*        to`lash*/}
            {/*    </button>*/}
            {/*    <button className="btn fa fa-edit fa-2x" style={{marginTop: "2px"}}*/}
            {/*            onClick={() => hideEditModal(item)}>*/}
            {/*    </button>*/}
            {/*    <button className="btn fa fa-trash-o fa-2x"*/}
            {/*            onClick={() => deleteModal(item)}></button>*/}
            {/*</div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="row container">
                {products?.map((item, index) =>
                    <div className="col-md-6 bootstrap snippets bootdeys">
                        <div className="product-content product-wrap clearfix">
                            <div className="row">
                                <div className="col-md-5 col-sm-12 col-xs-12">
                                    <div className="product-image">
                                        <img src={'http://localhost:8090/api/photo/get/' + item.mainPhoto.id}
                                             alt="194x228"
                                             className="img-responsive" style={{width: "194px", height: "228px"}}/>
                                        <span className="tag2 hot">
							HOT
						</span>
                                    </div>
                                </div>
                                <div className="col-md-7 col-sm-12 col-xs-12">
                                    <div className="product-deatil">
                                        <h5 className="name">
                                            <a href="#">
                                                {item.name} <span>{item.category.name}</span>
                                            </a>
                                        </h5>
                                        <p className="price-container">
                                            <span>{item.totalPrice + " UZS"}</span>
                                        </p>
                                        <span className="tag1"></span>
                                    </div>
                                    <div className="description">
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="product-info smart-form">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6 col-xs-6"
                                                 onClick={() => getCurrentProduct(item)}>
                                                <Link to="/app/ui/productInfo" className="btn btn-info">Ko`proq</Link>
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-xs-6">
                                                <div className="rating">
                                                    <label htmlFor="stars-rating-5"><i
                                                        className="fa fa-star"></i></label>
                                                    <label htmlFor="stars-rating-4"><i
                                                        className="fa fa-star"></i></label>
                                                    <label htmlFor="stars-rating-3"><i
                                                        className="fa fa-star text-primary"></i></label>
                                                    <label htmlFor="stars-rating-2"><i
                                                        className="fa fa-star text-primary"></i></label>
                                                    <label htmlFor="stars-rating-1"><i
                                                        className="fa fa-star text-primary"></i></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{marginTop: "5px"}}>
                                            <div className="col-md-4 col-sm-4 col-xs-4">
                                                <button className="btn fa fa-money fa-2x"
                                                        onClick={() => hideModalMonth(item)}>
                                                </button>
                                            </div>
                                            <div className="col-md-4 col-sm-4 col-xs-4">
                                                <button className="btn fa fa-edit fa-2x"
                                                        onClick={() => hideEditModal(item)}>
                                                </button>
                                            </div>
                                            <div className="col-md-4 col-sm-4 col-xs-4">
                                                <button className="btn fa fa-trash-o fa-2x"
                                                        onClick={() => deleteModal(item)}></button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <Modal isOpen={showModal} centered size="lg" style={{maxWidth: "1000px", width: "80%"}}>
                <ModalHeader>Mahsulot qo`shish</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(AddProduct)}>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Mahsulot nomi</label>
                                        <input className="form-control form-control-lg"
                                               defaultValue="" {...register("name")} required/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Mahsulot narxi</label>
                                        <input className="form-control form-control-lg" type="number"
                                               defaultValue="" {...register("price")} required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Chegirma (%da)</label>
                                        <input className="form-control form-control-lg" type="number"
                                               defaultValue="" {...register("discountPercent")} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Kafolat muddati (oylarda)</label>
                                        <input className="form-control form-control-lg" type="number"
                                               defaultValue="" {...register("warrantyMonth")} required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Kategoriya</label>
                                        <select {...register("categoryId")} className="form-control form-control-lg">
                                            {categories?.map((item, index) =>
                                                <option value={item.id}>{item.name}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>O`lchov</label>
                                        <select {...register("measurementId")} className="form-control form-control-lg">
                                            {measurements?.map((item, index) =>
                                                <option value={item.id}>{item.name}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Detail</label>
                                        <select {...register("detailId")} className="form-control form-control-lg"
                                                multiple>
                                            {details?.map((item, index) =>
                                                <option value={item.id}>{item.name}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Brand</label>
                                        <select {...register("brandId")} className="form-control form-control-lg">
                                            {brands?.map((item, index) =>
                                                <option value={item.id}>{item.name}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <label>Active</label>
                                        <input type="checkbox" value="true" {...register("active")}/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Flash</label>
                                        <input type="checkbox" value="true" {...register("flash")}/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Carousel</label>
                                        <input type="checkbox" value="true" {...register("carousel")}/>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Mahsulot haqida</label>
                                    <textarea className="form-control form-control-lg"
                                              defaultValue="" {...register("description")} />
                                </div>
                                <div className="form-group">
                                    <label>Upload file</label><br/>
                                    {<img src={'http://192.168.0.218:8090/api/photo/get/' + currentFile[0]}
                                          width="300" height="220"/>}
                                    <input className="mt-3" {...register("photoId", {required: true})} type="file"
                                           multiple
                                           accept='image/*' onChange={uploadFile}/>
                                </div>
                            </div>
                        </div>

                        <div className="row" style={{marginLeft: "10px"}}>
                            <button className="btn btn-success mr-2" type="submit">Saqlash</button>
                            <button className="btn btn-danger" onClick={hideModal}>Bekor qilish</button>
                        </div>

                    </form>
                </ModalBody>
            </Modal>
            <Modal isOpen={showDeleteModal} centered>
                <ModalHeader
                    style={{textAlign: "center"}}>{currentProduct?.name + "ni o'chirishni xohlaysizmi"}</ModalHeader>
                <ModalBody>
                    <button className="btn btn-danger m-1" onClick={deleteProduct}>O`chirish</button>
                    <button className="btn btn-success m-1" onClick={deleteModal}>Bekor qilish</button>
                </ModalBody>
            </Modal>
            {showMonthModal &&
                <AddMonthlyPrice
                    toggle={(x) => hideModalMonth(x)}
                    saveMonthPrice={saveMonthPrice}
                    currentProduct={currentProduct}
                />}
            {showEditModal &&
                <EditProduct
                    toggle={(x) => hideEditModal(x)}
                    currentFile={currentProduct.mainPhoto.id}
                    currentProduct={currentProduct}
                    categories={categories}
                    measurements={measurements}
                    details={details}
                    brands={brands}
                />}
        </div>

    );
}

Products.propTypes = {};

export default Products;