import React, {useEffect, useState} from 'react';
import "./productInfo.css"
import {CURRENT_PRODUCT} from "../../utils/constant";
import request from "../../utils/request";
import {api} from "../../utils/api";
import {useForm} from "react-hook-form";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {useHistory} from "react-router-dom";

function ProductInfo() {
    const [productId, setProductId] = useState(localStorage.getItem(CURRENT_PRODUCT))
    const [currentProduct, setCurrentProduct] = useState(localStorage.getItem(CURRENT_PRODUCT))
    const [amountProduct, setAmountProduct] = useState([]);
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [measurements, setMeasurements] = useState([]);
    const [details, setDetails] = useState([])
    const [currentDetail, setCurrentDetail] = useState('');
    const [value, setValue] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentFile, setCurrentFile] = useState([]);

    const history = useHistory();

    useEffect(() => {
        getCurrentProduct()
        getAmountProduct()
        getAllMeasurements()
        getAllDetails()
        getAllBrands()
        getAllCategories()
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
    const getAllCategories = () => {
        request({
            url: api.getAllCategories,
            method: 'GET'
        }).then(res => {
            setCategories(res.data.data)
        }).catch(err => {
        })
    }
    const getCurrentProduct = () => {
        request({
            url: api.getProductById + productId,
            method: 'GET'
        }).then(res => {
            setCurrentProduct(res.data.data)
        }).catch(err => {
        })
    }
    const getAmountProduct = () => {
        let id = currentProduct.id
        request({
            url: api.getAmountProduct + productId,
            method: 'GET'
        }).then(res => {
            setAmountProduct(res.data.data)
        }).catch(err => {
        })
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

    const getAllMeasurements = () => {
        request({
            url: api.getAllMeasurements,
            method: 'GET'
        }).then(res => {
            setMeasurements(res.data.data)
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
    const getDetailId = (item) => {
        let id = item.target.value
        request({
            url: api.getAllValueByDetailId + id,
            method: 'GET'
        }).then(res => {
            setValue(res.data.data)
        }).catch(err => {
        })
    }
    const saveAmount = (e, v) => {
        request({
            url: api.addProductAmount + currentProduct.id,
            method: 'POST',
            data: e
        }).then(res => {
            getCurrentProduct()
            getAmountProduct()
            getAllMeasurements()
            getAllDetails()
        }).catch(err => {
        })
    }
    const hideEditModal = () => {
        setShowEditModal(!showEditModal)
    }
    const editProduct = (e, v) => {
        let ProductDTO = {
            name: e.name,
            categoryId: e.categoryId,
            measurementId: e.measurementId,
            discountPercent: e.discountPercent,
            description: e.description,
            photoId: [],
            warrantyMonth: e.warrantyMonth,
            detailId: [],
            price: e.price,
            active: e.active,
            brandId: e.brandId,
            carousel: e.carousel,
            flash: e.flash,
            amount:e.amount
        }
        ProductDTO.detailId = e.detailId;
        ProductDTO.photoId = currentFile;
        console.log(ProductDTO)
        request({
            url: api.editProduct + currentProduct.id,
            method: 'POST',
            data: ProductDTO
        }).then(res => {
            getCurrentProduct()
            hideEditModal()
        }).catch(err => {
        })
    }
    const deleteModal = () => {
        setShowDeleteModal(!showDeleteModal)
    }
    const deleteProduct = () => {
        request({
            url: api.deleteProduct + currentProduct.id,
            method: 'DELETE'
        }).then(res => {
            deleteModal()
            history.push("/app/ui/products")
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
                                            style={{width: "490px", height: "380px"}} alt=""/>
                                    </div>
                                    <div>
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
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5 className="pro-d-title">
                                                {currentProduct.name}
                                            </h5>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row" style={{marginTop: "5px"}}>
                                                {/*<div className="col-md-4 col-sm-4 col-xs-4">*/}
                                                {/*    <button className="btn fa fa-money fa-2x"*/}
                                                {/*        // onClick={() => hideModalMonth(item)}*/}
                                                {/*    >*/}
                                                {/*    </button>*/}
                                                {/*</div>*/}
                                                <div className="col-md-3 col-sm-4 col-xs-4">
                                                    <button className="btn fa fa-edit fa-2x"
                                                            onClick={hideEditModal}
                                                    >
                                                    </button>
                                                </div>
                                                <div className="col-md-3 col-sm-4 col-xs-4">
                                                    <button className="btn fa fa-trash-o fa-2x"
                                                            onClick={deleteModal}
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
                                        <form onSubmit={handleSubmit(saveAmount)}>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label>O`lcham</label>
                                                    <select {...register("measurementId")}
                                                            className="form-control">
                                                        <option value="">O`lcham</option>
                                                        {measurements?.map((item, index) =>
                                                            <option value={item.id}>{item.name}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="col-md-3">
                                                    <label>Detail</label>
                                                    <select {...register("detailId")}
                                                            className="form-control"
                                                            onChange={(item) => getDetailId(item)}
                                                    >
                                                        <option value="">Detail</option>
                                                        {details?.map((item, index) =>
                                                            <option value={item.id}>{item.name}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="col-md-3">
                                                    <label>Value</label>
                                                    <select {...register("valueId")}
                                                            className="form-control">
                                                        <option value="">Value</option>
                                                        {value?.map((item, index) =>
                                                            <option value={item.id}>{item.name}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="col-md-3">
                                                    <label>Sonini kiriting</label>
                                                    <input className="form-control" type="number"
                                                           {...register("amount")} required/>
                                                </div>
                                                <div className="col-md-3 mt-1 mb-1">
                                                    <button className="btn btn-success">Saqlash</button>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                    <div>
                                        <table className="table table-hover text-center">
                                            <thead>
                                            <tr>
                                                <th>№</th>
                                                <th>O`lchami</th>
                                                <th>Rangi</th>
                                                <th>Mahsulot soni</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {amountProduct?.map((item, index) =>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.measurement}</td>
                                                    <td>{item.value}</td>
                                                    <td>{item.amount}</td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
            </div>
            <Modal isOpen={showDeleteModal} centered>
                <ModalHeader>{currentProduct?.name + "ni o`chirishni istaysizmi"}</ModalHeader>
                <ModalBody>
                    <button className="btn btn-danger m-1" onClick={deleteProduct}>O`chirish</button>
                    <button className="btn btn-success m-1" onClick={() => setShowDeleteModal(false)}>Bekor qilish
                    </button>
                </ModalBody>
            </Modal>
            <Modal isOpen={showEditModal} centered size="lg" style={{maxWidth: "1000px", width: "80%"}}>
                <ModalHeader>{currentProduct?.name + "ni taxrirlash"}</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(editProduct)}>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Mahsulot nomi</label>
                                        <input className="form-control form-control-lg"
                                               defaultValue={currentProduct?.name} {...register("name")} required/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Mahsulot narxi</label>
                                        <input className="form-control form-control-lg" type="number"
                                               defaultValue={currentProduct?.price} {...register("price")} required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Chegirma (%da)</label>
                                        <input className="form-control form-control-lg" type="number"
                                               defaultValue={currentProduct?.descountPercent} {...register("discountPercent")} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Kafolat muddati (oylarda)</label>
                                        <input className="form-control form-control-lg" type="number"
                                               defaultValue={currentProduct?.warrantyMonth} {...register("warrantyMonth")}
                                               required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Brand</label>
                                        <select {...register("brandId")} className="form-control form-control-lg">
                                            {brands?.map((item, index) =>
                                                <option value={item.id}>{item.name}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Kategoriya</label>
                                        <select {...register("categoryId")} className="form-control form-control-lg">
                                            {categories?.map((item, index) =>
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
                                              defaultValue={currentProduct?.description} {...register("description")} />
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
                            <button className="btn btn-danger" onClick={hideEditModal}>Bekor qilish</button>
                        </div>

                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
}

ProductInfo.propTypes = {};

export default ProductInfo;