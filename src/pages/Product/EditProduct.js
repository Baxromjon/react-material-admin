import React, {useEffect, useState} from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {useForm} from "react-hook-form";
import request from "../../utils/request";
import {api} from "../../utils/api";


EditProduct.propTypes = {};

function EditProduct(props) {
    const {
        toggle,
        editMonthPrice,
        currentProduct,
        categories,
        measurements,
        details,
        brands,
        currentFile
    } = props
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [isOpen, setIsOpen] = useState(true);
    const [currentFile1, setCurrentFile1] = useState(currentFile);
    console.log(currentFile1)
    useEffect(() => {

    }, [])
    const editProduct = (e, v) => {
        console.log(e)
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
            flash: e.flash
        }
        ProductDTO.detailId = e.detailId;
        ProductDTO.photoId = currentFile;
        request({
            url: api.editProduct + currentProduct.id,
            method: 'POST',
            data: ProductDTO
        }).then(res => {
            setIsOpen(false)
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
            setCurrentFile1(res.data)
        }).catch(err => {
        })
    }

    return (
        <div>
            <Modal isOpen={isOpen} centered size="lg" style={{maxWidth: "1000px", width: "80%"}}>
                <ModalHeader>Mahsulotni tahrirlash</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(editProduct)}>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Mahsulot nomi</label>
                                        <input className="form-control form-control-lg"
                                               defaultValue={currentProduct.name} {...register("name")} required/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Mahsulot narxi</label>
                                        <input className="form-control form-control-lg" type="number"
                                               defaultValue={currentProduct.price} {...register("price")} required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Chegirma (%da)</label>
                                        <input className="form-control form-control-lg" type="number"
                                               defaultValue={currentProduct.discountPercent} {...register("discountPercent")} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Kafolat muddati (oylarda)</label>
                                        <input className="form-control form-control-lg" type="number"
                                               defaultValue={currentProduct.warrantyMonth} {...register("warrantyMonth")}
                                               required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Kategoriya</label>
                                        <select {...register("categoryId")} defaultValue={currentProduct.category.name}
                                                className="form-control form-control-lg">
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
                                        <select {...register("brandId")} defaultValue={currentProduct.brand.name}
                                                className="form-control form-control-lg">
                                            {brands?.map((item, index) =>
                                                <option value={item.id}>{item.name}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <label>Active</label>
                                        <input type="checkbox" value="true"
                                               defaultValue={currentProduct.active == true ? "checked" : ""} {...register("active")}/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Flash</label>
                                        <input type="checkbox" value="true"
                                               defaultValue={currentProduct.flash} {...register("flash")}/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Carousel</label>
                                        <input type="checkbox" value="true"
                                               defaultValue={currentProduct.carousel} {...register("carousel")}/>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Mahsulot haqida</label>
                                    <textarea className="form-control form-control-lg"
                                              defaultValue={currentProduct.description} {...register("description")} />
                                </div>
                                <div className="form-group">
                                    <label>Upload file</label><br/>
                                    {<img
                                        src={'http://192.168.0.218:8090/api/photo/get/' + currentFile1}
                                        width="300" height="220"/>}
                                    <input className="mt-3" {...register("photoId", {required: true})} type="file"
                                           multiple
                                           accept='image/*' onChange={uploadFile}/>
                                </div>
                            </div>
                        </div>

                        <div className="row" style={{marginLeft: "10px"}}>
                            <button className="btn btn-success mr-2" type="submit">Saqlash</button>
                            <button className="btn btn-danger" onClick={toggle}>Bekor qilish</button>
                        </div>

                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
}


export default EditProduct;