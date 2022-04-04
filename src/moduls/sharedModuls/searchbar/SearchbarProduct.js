import React, { useState } from 'react';
import './css/SearchBar.css';


function SearchbarProduct(props) {
    const [Query, setQuery] = useState(""); /* useState to get the updated search query */
    const getfilteredItems = () => {

        if (!Query) {
            return props.data;
        }
        return props.data.filter((item) => {
            const postName = item.productName.toLowerCase();

            return postName.includes(Query.toLowerCase());
        });
    };

    const filteredItems = getfilteredItems();
    /* to store the filtered items and display  */


    return (
        <>
            <input type="text" className="bar" placeholder="Search Product by name" onChange={e => setQuery(e.target.value)} /> 
            {props.resultShow ? (
            <div className="tableDiv">
            <table className="table">
                <thead className="tableHead">
                    <tr>
                        <th>S.no</th>
                        <th>Product Name</th>

                    </tr>
                </thead>

                <tbody className="tableBody">

                    {filteredItems.map((user, index) => (

                        <tr key={user.u_id}>

                            <td>{index + 1}</td>
                            <td>{user.productName}</td>

                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
        ) : (

                <div>
                    <p>Data not avalible</p>
                </div>
            )}
        </>
    )
}

export default SearchbarProduct