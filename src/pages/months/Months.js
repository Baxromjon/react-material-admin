import React from 'react';

function Months () {
        return (
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <div>
                    <button className="btn fa fa-plus-circle fa-3x"></button>
                </div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Oy</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        );
}

Months.propTypes = {};

export default Months;