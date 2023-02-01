import React, {useState} from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {useForm} from "react-hook-form";
import request from "../../utils/request";
import {api} from "../../utils/api";
import {CURRENT_IMAGE} from "../../utils/constant";

function EditCategory(props) {
    const {
        toggle,
        currentCategory,
        categories,
        currentFile
    } = props
    const [isOpen, setIsOpen] = useState(true);
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [currentFile1, setCurrentFile1] = useState(currentFile);
    console.log(currentFile1)
    const editCategory = (e, v) => {

    }
    const uploadFile = (file) => {
        let formData = new FormData();
        formData.append("file", file.target.files[0])
        request({
            url: api.addOneFile,
            method: 'POST',
            data: formData
        }).then(res => {
            setCurrentFile1(res.data)
        }).catch(err => {
        })
    }

    return (
        <div>
            <Modal isOpen={isOpen} centered>
                <ModalHeader>Kategoriyani taxrirlash</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(editCategory)}>
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
                                <input className="form-control form-control-lg" defaultValue={currentCategory.name}
                                       {...register("name")} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Tartib raqami</label>
                                <input className="form-control form-control-lg" type="number"
                                       defaultValue={currentCategory.index}
                                       {...register("index")} required/>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Upload file</label><br/>
                                {<img
                                    src={'http://192.168.0.218:8090/api/photo/get/' + currentFile1}
                                    width="220" height="130"/>}
                                <input className="mt-3" {...register("photoId", {required: true})} type="file"
                                       multiple
                                       accept='image/*' onChange={uploadFile}/>
                            </div>
                        </div>
                        <div>
                            <button className="btn" type="submit"><i className="fa fa-plus-circle"></i></button>
                            <button className="btn" onClick={toggle}><i className="fa fa-close"></i></button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
}

EditCategory.propTypes = {};

export default EditCategory;