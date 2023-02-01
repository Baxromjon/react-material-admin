import React, {Component, useEffect, useState} from 'react';
// import "./categories.css"
import {api} from "../../utils/api";
import request from "../../utils/request";
import {useForm} from "react-hook-form";
import {Modal, ModalHeader, ModalFooter, ModalBody} from 'reactstrap';
import EditCategory from "./EditCategory";
import {CURRENT_IMAGE} from "../../utils/constant";


const Categories = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentFile, setCurrentFile] = useState([]);
    const [currentCategory, setCurrentCategory]=useState('');
    const [editModal, setEditModal] = useState(false);
    useEffect(() => {
        getAllCategories()
    }, [])

    const getAllCategories = () => {
        request({
            url: api.getAllCategories,
            method: 'GET'
        }).then(res => {
            setCategories(res.data.data);
        }).catch(err => {
        })
    }

    const hideModal = () => {
        setShowModal(!showModal)
        console.log(showModal)
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
    const saveCategory = (e, v) => {
        let DTO = {
            name: e.name,
            index: e.index,
            categoryId: e.categoryId,
            photoId: currentFile
        }
        request({
            url: api.addCategory,
            method: 'POST',
            data: DTO
        }).then(res => {
            hideModal()
            getAllCategories()
        }).catch(err => {

        })
    }
    const hideEditModal = (item) => {
        setCurrentCategory(item)
        setEditModal(!editModal)
    }
    const editCategory=()=>{
        console.log('edit category')
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <button className="btn btn-info" onClick={hideModal}>qo`shish</button>
            <br/>
            <div className="row">
                {categories?.map((item, index) =>
                    <div className="card col-md-3 m-2" style={{width: "200px", cursor: "pointer"}}
                         onClick={() => hideEditModal(item)}>
                        <img src={'http://localhost:8090/api/photo/get/' + item.attachment.id} alt="Avatar"
                             style={{width: "100%"}}/>
                        <div className="container">
                            <h4 className="text-center"><b>{item.name}</b></h4>
                            <p className="text-center">{item.category?.name}</p>
                        </div>
                    </div>
                )}

            </div>
            <Modal isOpen={showModal} centered>
                <ModalHeader>Kategoriya qo`shish</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(saveCategory)}>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Yuqori kategoriya</label>
                                <select {...register("categoryId")}
                                        className="form-control form-control-lg">
                                    <option value="">Kategoriya tanlang</option>
                                    {categories?.map((item, index) =>
                                        <option value={item.id}>{item.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Kategoriya nomi</label>
                                <input className="form-control form-control-lg"
                                       {...register("name")} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Tartib raqami</label>
                                <input className="form-control form-control-lg" type="number"
                                       {...register("index")} required/>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Upload file</label><br/>
                                {<img
                                    src={'http://192.168.0.218:8090/api/photo/get/' + currentFile}
                                    width="220" height="130"/>}
                                <input className="mt-3" {...register("photoId", {required: true})} type="file"
                                       multiple
                                       accept='image/*' onChange={uploadFile}/>
                            </div>
                        </div>
                        <div>
                            <button className="btn" type="submit"><i className="fa fa-plus-circle"></i></button>
                            <button className="btn" onClick={hideModal}><i className="fa fa-close"></i></button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            {editModal&&
                <EditCategory
                toggle={(x)=>hideEditModal(x)}
                currentCategory={currentCategory}
                currentFile={currentCategory.attachment.id}
                categories={categories}
                editCategory={editCategory}
                />
        }
        </div>

    );
}

Categories.propTypes = {};

export default Categories;