import React, {Component, useEffect, useState} from 'react';
import {api} from "../../utils/api";
import request from "../../utils/request";
import {Modal, ModalHeader, ModalFooter, ModalBody} from 'reactstrap';
import {useForm} from "react-hook-form";

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [showAddModel, setShowAddModal] = useState(false);
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [currentFile, setCurrentFile] = useState('');
    const [currentBrand, setCurrentBrand] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    const hideAddModal = () => {
        setShowAddModal(!showAddModel)
    }

    const saveBrand = (e, v) => {
        let DTO = {
            name: e.name,
            photoId: currentFile
        }
        request({
            url: !currentBrand ? api.addBrand : api.editBrand + currentBrand.id,
            method: 'POST',
            data: DTO
        }).then(res => {
            getAllBrands()
            hideAddModal()
        }).catch(err => {
        })
    }

    const uploadFile = (file) => {
        let formData = new FormData();
        formData.append("file", file.target.files[0])
        request({
            url: api.addOneFile,
            method: 'POST',
            data: formData
        }).then(res => {
            setCurrentFile(res.data)
        }).catch(err => {
        })
    }
    const hideEditModal = (item) => {
        setCurrentBrand(item)
        setShowAddModal(!showAddModel)
        setCurrentFile(item.attachment.id)
    }
    const deleteModal = () => {
        setShowDeleteModal(!showDeleteModal)
        setShowAddModal(false)
    }
    const deleteBrand = () => {
        request({
            url: api.deleteBrand + currentBrand.id,
            method: 'DELETE'
        }).then(res => {
            getAllBrands()
            hideAddModal()
            deleteModal()
        }).catch(err => {

        })
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

            <button className="btn fa fa-plus-circle fa-3x" onClick={hideAddModal}></button>
            <br/>
            <div className="row ml-2">
                {brands?.map((item, index) =>
                    <div className="card col-md-2 m-2" style={{width: "220px", cursor: "pointer"}}
                         onClick={() => hideEditModal(item)}>
                        <img src={'http://localhost:8090/api/photo/get/' + item.attachment.id} alt="Avatar"
                             style={{width: "100%", margin: "5px 0 0 0"}}/>
                        <div className="container">
                            <h4 className="text-center"><b>{item.name}</b></h4>
                        </div>
                    </div>
                )}

            </div>
            <Modal isOpen={showAddModel} centered>
                <ModalHeader>{currentBrand ? "Brandni taxrirlash" : "Brand qo'shish"}</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(saveBrand)}>
                        <div>
                            <div className="form-group">
                                <label>Brand nomi</label>
                                <input className="form-control form-control-lg" defaultValue={currentBrand.name}
                                       {...register("name")} required/>
                            </div>
                            <div className="form-group">
                                <label>Upload file</label><br/>
                                {<img
                                    src={'http://192.168.0.218:8090/api/photo/get/' + currentFile}
                                    width="300" height="220"/>}
                                <input className="mt-3" {...register("photoId")} type="file"
                                       accept='image/*' onChange={uploadFile}/>
                            </div>
                        </div>
                        <div>
                            <button className="btn fa fa-plus-circle fa-2x" type="submit"></button>
                            <button className="btn fa fa-close fa-2x"
                                    onClick={currentBrand ? hideEditModal : hideAddModal}></button>
                            <button className="btn fa fa-trash-o fa-2x" onClick={deleteModal}></button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <Modal isOpen={showDeleteModal} centered>
                <ModalHeader
                    style={{textAlign: "center"}}>{currentBrand.name + "  brandini o`chirishni xohlaysizmi?"}</ModalHeader>
                <ModalBody>
                    <button className="btn btn-danger m-1" onClick={deleteBrand}>O`chirish</button>
                    <button className="btn btn-success m-1" onClick={deleteModal}>Bekor qilish</button>
                </ModalBody>
            </Modal>
        </div>
    );
}

Brands.propTypes = {};

export default Brands;