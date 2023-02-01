import React, {Component, useEffect, useState} from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {useForm} from "react-hook-form";
import request from "../../utils/request";
import {api} from "../../utils/api";

AddMonthlyPrice.propTypes = {};

function AddMonthlyPrice(props) {
    const {
        toggle,
        saveMonthPrice,
        isEdit,
        currentProduct
    } = props
    const [isOpen, setIsOpen] = useState(true);
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [month, setMonth] = useState([]);
    const [monthlyPrice, setMonthlyPrice]=useState([]);

    useEffect(() => {
        getMonth()
        getAllProductByMonth()
    }, [])
    const getMonth = () => {
        request({
            url: api.getAllMonth,
            method: 'GET'
        }).then(res => {
            setMonth(res.data.data)
        }).catch(err => {
        })
    }
    const getAllProductByMonth=()=>{
        request({
            url:api.getProductByMonthly+currentProduct.id,
            method:'GET'
        }).then(res=>{
            setMonthlyPrice(res.data.data)
        }).catch(err=>{

        })
    }

    return (
        <div>
            <Modal isOpen={isOpen} centered size="lg" style={{maxWidth: "700px", width: "80%"}}>
                <ModalHeader>Mahsulotning oylik narxlari</ModalHeader>
                <ModalBody>
                    <table className="table table-hover">
                        <tbody>
                        {monthlyPrice?.map((item, index)=>
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.productName}</td>
                            <td>{item.month}</td>
                            <td>{item.productPrice}</td>
                        </tr>
                        )}
                        </tbody>
                    </table>
                    <form onSubmit={handleSubmit(saveMonthPrice)}>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Oylar</label>
                                <select {...register("monthId")} className="form-control form-control-lg">
                                    {month?.map((item, index) =>
                                        <option value={item.id}>{item.month}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Narx</label>
                                <input className="form-control form-control-lg" type="number"
                                       defaultValue="" {...register("price")} />
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-success m-1" type='submit'>Saqlash</button>
                            <button className="btn btn-danger m-1" onClick={toggle}>Bekor qilish</button>
                        </div>
                    </form>

                    {/*<form onSubmit={handleSubmit(save)}>*/}
                    {/*    <div className="row">*/}
                    {/*        <div className="col-md-10">*/}
                    {/*            {[...Array(init).keys()].map((id) => (*/}
                    {/*                <div key={id} className="row">*/}
                    {/*                    <div className="form-group col-md-6">*/}
                    {/*                        <label>Oylar</label>*/}
                    {/*                        <select {...register("monthId")} className="form-control form-control-lg">*/}
                    {/*                            {month?.map((item, index) =>*/}
                    {/*                                <option value={item.id}>{item.month}</option>*/}
                    {/*                            )}*/}
                    {/*                        </select>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="form-group col-md-6">*/}
                    {/*                        <label>Narx</label>*/}
                    {/*                        <input className="form-control form-control-lg" type="number"*/}
                    {/*                               defaultValue="" {...register("price")} />*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            ))}*/}
                    {/*        </div>*/}
                    {/*        <div className="col-md-2">*/}
                    {/*            <button type='button' onClick={() => setInit(p => p + 1)} className="btn"><i*/}
                    {/*                className="fa fa-plus-circle"></i></button>*/}
                    {/*            <button type='button' onClick={() => setInit(p => p - 1)} className="btn"><i*/}
                    {/*                className="fa fa-minus-circle"></i></button>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <button className="btn btn-success" type="submit">Saqlash</button>*/}
                    {/*        <button className="btn btn-danger" onClick={hideModalMonth}>Bekor qilish</button>*/}
                    {/*    </div>*/}

                    {/*</form>*/}
                </ModalBody>
            </Modal>
        </div>
    );
}

AddMonthlyPrice.propTypes = {};

export default AddMonthlyPrice;