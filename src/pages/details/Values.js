import React, {useEffect, useState} from 'react';
import request from "../../utils/request";
import {api} from "../../utils/api";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {useForm} from "react-hook-form";

function Values(props) {
    const {values, details} = props

    const [showAddModal, setShowAddModal] = useState(false);
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [currentValue, setCurrentValue] = useState('')


    useEffect(() => {

    }, [])

    const hideAddModal = () => {
        setShowAddModal(!showAddModal)
        if (showAddModal === false) {
            setCurrentValue('')
        }
    }
    const saveValue = (e, v) => {
        console.log(e)
        request({
            url: !currentValue ? api.addValue : api.editValue + currentValue.id,
            method: 'POST',
            data: e
        }).then(res => {
            hideAddModal()
            window.location.reload();
        }).catch(err => {

        })
    }

    const editModal = (item) => {
        setCurrentValue(item)
        setShowAddModal(!showAddModal)
    }
    const deleteModal = (item) => {
        setCurrentValue(item)
        setShowDeleteModal(!showDeleteModal)
    }
    const deleteValue = () => {
        request({
            url: api.deleteValue + currentValue.id,
            method: 'DELETE'
        }).then(res => {
            window.location.reload()
        }).catch(err => {
        })
    }

    return (
        <div>
            <h4 style={{textAlign: "center"}}>Values</h4>
            <div style={{width: "100px"}}>
                <button className="btn fa fa-plus-circle fa-3x" onClick={hideAddModal}></button>
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
                {values?.map((item, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                            <button className="btn fa fa-edit fa-2x" onClick={() => editModal(item)}></button>
                            <button className="btn fa fa-trash-o fa-2x" onClick={() => deleteModal(item)}></button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <Modal isOpen={showAddModal} centered>
                <ModalHeader>{currentValue ? "Valueni taxrirlash" : "Value qo'shish"}</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(saveValue)}>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Detail nomi</label>
                                <input className="form-control form-control-lg" defaultValue={currentValue?.name}
                                       {...register("valueName")} required/>
                            </div>
                            <div className="col-md-6">
                                <label>Detail</label>
                                <select {...register("detailId")}
                                        className="form-control form-control-lg">
                                    <option value="">Detailni tanlang</option>
                                    {details?.map((item, index) =>
                                        <option value={item.id}>{item.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div>
                            <button className="btn fa fa-plus-circle fa-2x" type="submit"></button>
                            <button className="btn fa fa-close fa-2x" onClick={hideAddModal}></button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            <Modal isOpen={showDeleteModal} centered>
                <ModalHeader>{currentValue?.name + "ni o`chirishni xohlaysizmi?"}</ModalHeader>
                <ModalBody>
                    <button className="btn btn-danger m-1" onClick={deleteValue}>O`chirish</button>
                    <button className="btn btn-success m-1" onClick={deleteModal}>Bekor qilish</button>
                </ModalBody>
            </Modal>
        </div>
    );
}

Values.propTypes = {};

export default Values;