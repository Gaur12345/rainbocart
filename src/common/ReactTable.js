import React, { Component } from 'react';


class ReactTable extends Component{
      constructor(props){
            super(props);
            this.state={
                  tableHeader:[],
                  tableBody:[]

            }

      }

      


      render(){
            console.log("tableBody",this.props)
            const {tableHeader,tableBody}=this.props;
            return(
                  <div>
                        <table className='table'>
                        <thead className="tableHead">
                                    <tr>
                                          {tableHeader.map((data,index)=>
                                                <th className="th-sm">{data}</th>
                                          )}
                                    </tr>
                              </thead>
                              <tbody>

                                    {tableBody}
                         
                              </tbody>
                        </table>
                  </div>
            )
      }
      
      
}
export default ReactTable;