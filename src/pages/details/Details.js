import React, {useEffect, useState} from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import request from "../../utils/request";
import {api} from "../../utils/api";
import {useForm} from "react-hook-form";
import DeleteDetail from "./DeleteDetail";
import Values from "./Values";


function Details() {

    const [details, setDetails] = useState([]);
    const [currentDetail, setCurrentDetail] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [values, setValues] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    useEffect(() => {
        getAllDetails()
    }, [])

    const getAllDetails = () => {
        request({
            url: api.getDetails,
            method: 'GET'
        }).then(res => {
            setDetails(res.data.data)
        }).catch(err => {
        })
    }
    const hideModal = () => {
        setShowAddModal(!showAddModal)
    }
    const saveMeasurement = (e, v) => {
        request({
            url: api.addDetail,
            method: 'POST',
            data: e
        }).then(res => {
            hideModal()
            getAllDetails()
        }).catch(err => {
        })
    }
    const getDetailId = (item) => {
        request({
            url: api.getAllValueByDetailId + item.id,
            method: 'GET'
        }).then(res => {
            setValues(res.data.data)
        })
    }
    const deleteModal = (item) => {
        setCurrentDetail(item);
        setShowDeleteModal(!showDeleteModal)
    }

    const editModal = (item) => {
        setCurrentDetail(item);
        setShowEditModal(!showEditModal);
    }
    const editMeasurement = (e, v) => {
        request({
            url: api.editDetail + currentDetail.id,
            method: 'POST',
            data: e
        }).then(res => {
            getAllDetails()
            setShowEditModal(false);
        }).catch(err => {
        })
    }
    const deleteDetail = () => {
        request({
            url: api.deleteDetail + currentDetail.id,
            method: 'DELETE'
        }).then(res => {
            getAllDetails()
            deleteModal()
        }).catch(err => {

        })
    }
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className="row">
                <div className="col-md-6">
                    <h4 style={{textAlign: "center"}}>Details</h4>
                    <div style={{width: "100px"}}>
                        <button className="btn fa fa-plus-circle fa-3x" onClick={hideModal}></button>
                    </div>
                    <br/>
                    <table className="table table-hover text-center">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>O`lchov birlik nomi</th>
                            <th>Taxrirlash</th>
                        </tr>
                        </thead>
                        <tbody>
                        {details?.map((item, index) =>
                            <tr key={index} onClick={() => getDetailId(item)}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    <button className="btn fa fa-edit fa-2x" onClick={() => editModal(item)}></button>
                                    <button className="btn fa fa-trash-o fa-2x"
                                            onClick={() => deleteModal(item)}></button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">{
                    <Values values={values}
                    details={details}/>
                }

                </div>
            </div>

            <Modal isOpen={showAddModal} centered>
                <ModalHeader>Detail qo`shish</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(saveMeasurement)}>
                        <div className="form-group">
                            <label>Detail nomi</label>
                            <input className="form-control form-control-lg"
                                   {...register("name")} required/>
                        </div>
                        <div>
                            <button className="btn fa fa-plus-circle fa-2x" type="submit"></button>
                            <button className="btn fa fa-close fa-2x" onClick={hideModal}></button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <Modal isOpen={showEditModal} centered>
                <ModalHeader>Detailni taxrirlash </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(editMeasurement)}>
                        <div className="form-group">
                            <label>Detail nomi</label>
                            <input className="form-control form-control-lg" defaultValue={currentDetail?.name}
                                   {...register("name")} required/>
                        </div>
                        <div>
                            <button className="btn fa fa-plus-circle fa-2x" type="submit"></button>
                            <button className="btn fa fa-close fa-2x" onClick={editModal}></button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <Modal isOpen={showDeleteModal} centered>
                <ModalHeader>{currentDetail?.name + "ni o`chirishni xohlaysizmi?"}</ModalHeader>
                <ModalBody>
                    <button className="btn btn-danger m-1" onClick={deleteDetail}>O`chirish</button>
                    <button className="btn btn-success m-1" onClick={deleteModal}>Bekor qilish</button>
                </ModalBody>
            </Modal>
        </div>
    );
}

Details.propTypes = {};

export default Details;