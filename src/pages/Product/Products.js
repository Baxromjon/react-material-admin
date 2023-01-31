import React, {useEffect, useState} from 'react';
// import "./product.css"
import request from "../../utils/request";
import {api} from "../../utils/api";
import {Modal, ModalHeader, ModalFooter, ModalBody} from 'reactstrap';
import {useForm} from "react-hook-form";
import AddMonthlyPrice from "./AddMonthlyPrice";


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
    const [init, setInit] = useState(1);
    const [month, setMonth] = useState([]);

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
        let DTO={
            productId:'',
            monthId:'',
            price:''
        }
        DTO.price=e.price;
        DTO.monthId=e.monthId;
        DTO.productId=currentProduct;
        console.log(DTO)
        console.log(currentProduct)
        request({
            url:api.saveMonthlyPrice,
            method:'POST',
            data:DTO
        }).then(res=>{
            getAllProducts()
            hideModalMonth()
        }).catch(err=>{})

    }
    const hideModalMonth = (item) => {
        setCurrentProduct(item.id)
        setShowModalMonth(!showMonthModal)
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
                                    <img src={'http://localhost:8090/api/photo/get/' + item.mainPhoto.id}
                                         className="card-img-top" alt="image" style={{width: "100%"}}/>
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

                                    <div className="row">
                                        <button className="btn btn-info m-1" onClick={()=>hideModalMonth(item)}>Bo`lib to`lash
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
            {showMonthModal&&
            <AddMonthlyPrice
            toggle={(x)=>hideModalMonth(x)}
            saveMonthPrice={saveMonthPrice}
            />}
        </div>

    );
}

Products.propTypes = {};

export default Products;