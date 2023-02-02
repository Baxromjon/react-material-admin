import React, {useEffect, useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import request from "../../utils/request";
import {api} from "../../utils/api";
import {useForm} from "react-hook-form";

const Measurements = () => {
    const [measurements, setMeasurements] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModalMeasure, setShowDeleteModalMeasure] = useState(false);
    const [showMonthModal, setShowMonthModal] = useState(false);
    const [currentMeasurement, setCurrentMeasurement] = useState('');
    const [months, setMonths] = useState([]);
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentMonth, setCurrentMonth] = useState('');
    const [showEditModalMonth, setShowEditModalMonth] = useState(false);

    useEffect(() => {
        getAllMeasurements()
        getAllMonths()
    }, [])

    const getAllMeasurements = () => {
        request({
            url: api.getAllMeasurements,
            method: 'GET'
        }).then(res => {
            setMeasurements(res.data.data)
        }).catch(err => {
        })
    }

    const handleShow = () => {
        setShowModal(!showModal);
    }

    const saveMeasurement = (e, v) => {
        request({
            url:!currentMeasurement? api.addMeasurement:api.editMeasurement+currentMeasurement.id,
            method: 'POST',
            data: e
        }).then(res => {
            handleShow()
            getAllMeasurements()
        }).catch(err => {
        })
    }
    const getAllMonths = () => {
        request({
            url: api.getAllMonth,
            method: 'GET'
        }).then(res => {
            setMonths(res.data.data)
        }).catch(err => {
        })
    }
    const hideShowMonthModal = () => {
        setShowMonthModal(!showMonthModal)
    }
    const saveMonth = (e, v) => {
        request({
            url: api.addMonth,
            method: 'POST',
            data: e
        }).then(res => {
            hideShowMonthModal()
            getAllMonths()
        }).catch(err => {
        })
    }
    const hideDeleteModal = (item) => {
        setCurrentMonth(item)
        setShowDeleteModal(!showDeleteModal)
    }
    const deleteMonth = () => {
        request({
            url: api.deleteMonth + currentMonth.id,
            method: 'DELETE'
        }).then(res => {
            hideDeleteModal()
            getAllMonths()
        }).catch(err => {
        })
    }
    const hideEditMonthModal = (item) => {
        setCurrentMonth(item)
        setShowEditModalMonth(!showEditModalMonth)
    }
    const editMonth = (e, v) => {
        request({
            url: api.editMonth + currentMonth.id,
            method: 'POST',
            data: e
        }).then(res => {
            hideEditMonthModal()
            getAllMonths()
        }).catch(err => {
        })
    }
    const editModal = (item) => {
        setCurrentMeasurement(item)
        setShowModal(!showModal);
    }
    const deleteModalMeasur = (item) => {
        setCurrentMeasurement(item)
        setShowDeleteModalMeasure(!showDeleteModalMeasure)
    }
    const deleteMeasurement = () => {
        request({
            url: api.deleteMeasurement + currentMeasurement.id,
            method: 'DELETE'
        }).then(res => {
            getAllMeasurements()
            deleteModalMeasur()
        }).catch(err => {
        })
    }
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className="row">
                <div className="col-md-6">
                    <h4 style={{textAlign: "center"}}>O`lchov birliklari</h4>
                    <div style={{width: "100px"}}>
                        <button className="btn fa fa-plus-circle fa-3x" onClick={handleShow}></button>
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
                        {measurements?.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    <button className="btn fa fa-edit fa-2x" onClick={() => editModal(item)}></button>
                                    <button className="btn fa fa-trash-o fa-2x"
                                            onClick={() => deleteModalMeasur(item)}></button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h4 style={{textAlign: "center"}}>Oylar</h4>
                    <div style={{width: "100px"}}>
                        <button className="btn fa fa-plus-circle fa-3x" onClick={hideShowMonthModal}></button>
                    </div>
                    <br/>
                    <table className="table table-hover text-center">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Oylar</th>
                            <th>Taxrirlash</th>
                        </tr>
                        </thead>
                        <tbody>
                        {months?.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.month}</td>
                                <td>
                                    <button className="btn fa fa-edit fa-2x"
                                            onClick={() => hideEditMonthModal(item)}></button>
                                    <button className="btn fa fa-trash-o fa-2x"
                                            onClick={() => hideDeleteModal(item)}></button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={showModal} centered={true}>
                <ModalHeader>{currentMeasurement?"O`lchov birligini taxrirlash":"O`lchov birligini qo`shish"}</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(saveMeasurement)}>
                        <div className="form-group">
                            <label>O`lchov birlik nomi</label>
                            <input className="form-control form-control-lg" defaultValue={currentMeasurement?.name}
                                   {...register("name")} required/>
                        </div>
                        <div>
                            <button className="btn fa fa-plus-circle fa-2x" type="submit"></button>
                            <button className="btn fa fa-close fa-2x" onClick={handleShow}></button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <Modal isOpen={showMonthModal} centered={true}>
                <ModalHeader>Oy qo'shish</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(saveMonth)}>
                        <div className="form-group">
                            <label>Oy raqami</label>
                            <input className="form-control form-control-lg" type="number"
                                   {...register("month")} required/>
                        </div>
                        <div>
                            <button className="btn fa fa-plus-circle fa-2x" type="submit"></button>
                            <button className="btn fa fa-close fa-2x" onClick={hideShowMonthModal}></button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <Modal isOpen={showEditModalMonth} centered={true}>
                <ModalHeader>Oyni taxrirlash</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(editMonth)}>
                        <div className="form-group">
                            <label>Oy raqami</label>
                            <input className="form-control form-control-lg" type="number"
                                   defaultValue={currentMonth?.month}
                                   {...register("month")} required/>
                        </div>
                        <div>
                            <button className="btn fa fa-plus-circle fa-2x" type="submit"></button>
                            <button className="btn fa fa-close fa-2x" onClick={hideEditMonthModal}></button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <Modal isOpen={showDeleteModal} centered>
                <ModalHeader>{currentMonth?.month + "ni o`chirishni xohlaysizmi?"}</ModalHeader>
                <ModalBody>
                    <button className="btn btn-danger m-1" onClick={deleteMonth}>O'chirish</button>
                    <button className="btn btn-success m-1" onClick={hideDeleteModal}>Bekor qilish</button>
                </ModalBody>
            </Modal>
            <Modal isOpen={showDeleteModalMeasure} centered>
                <ModalHeader>{currentMeasurement?.name + "ni o`chirishni xohlaysizmi?"}</ModalHeader>
                <ModalBody>
                    <button className="btn btn-danger m-1" onClick={deleteMeasurement}>O'chirish</button>
                    <button className="btn btn-success m-1" onClick={deleteModalMeasur}>Bekor qilish</button>
                </ModalBody>
            </Modal>


        </div>
    );
}


export default Measurements;