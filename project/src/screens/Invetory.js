/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

import Swal from "sweetalert2";

import { Tabs } from "antd";
import useFetch from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
const { TabPane } = Tabs;

function Inventory() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="invt mt-3 ml-3 mr-3 bs">
      <h3 className="invt text-center">
        <b>Inventory</b>
      </h3>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Items" key="1">
          <Items />
        </TabPane>
        <TabPane tab="Add Items" key="2">
          <Additem />
        </TabPane>
        <TabPane tab="Re-order Items" key="3">
          <ReoderItems />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Inventory;


//**Display all the items */
export function Items() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const [searchQuery, setSearchQuery] = useState("");

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get("/api/items");
          setItems(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setError("Failed to fetch items.");
        }
      };
      fetchData();
    }, []);
  
    async function deleteItem(id) {
      try {
        Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this record!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`/api/items/${id}`);
          setItems(items.filter((item) => item._id !== id));
          Swal.fire(
            "Deleted!",
            "Your Item has been deleted.",
            "success"
          ).then((result) => {
           window.location.reload();
         });
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Ooops!", "Something went wrong", "error");
    }
  }
  if(loading){
    return<div>Loading...</div>;
  }

  if(error){
      return<div>{error}</div>;
  }
    function handlePrint() {
      window.print();
    }
   
  
    return (
      <div className="invt row">
        <div className="invt col-md-10">
          <h5>Items</h5>
          <input style={{marginBottom:'10px'}}
             type="text"
             placeholder="Search by item name..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handlePrint}>Print</button>
  
          <table className="invt table table-boardered table-dark">
            <thead className="invt thed-dark ">
              <tr>
              
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Value per item</th>
                <th>Total Value</th>
                <th>Edit</th>
              </tr>
            </thead>
  
            <tbody>

              {items.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item) => {
                const totalValue = item.quanty * item.value;
                return (
                  <tr key={item._id}>
                   
                    <td>{item.title}</td>
                    <td>{item.quanty}</td>
                    <td>LKR {item.value}.00</td>
                    <td>LKR {totalValue}.00</td>
                    <td>
                      <button style={{marginLeft:'10px'}}
                        className="btn-danger mt-1" 
                        onClick={() => {
                          deleteItem(item._id);
                        }}
                      >
                        Delete Item
                      </button>
                      <Link to={`/updateitems/${item._id}`}>
                       
                        <button style={{marginLeft:'10px'}}
                         className="btn-success mt-4">
                          Update Item
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  


/**add item component*/  
 export function Additem() {
   const [title, settitle] = useState('');
   const [quanty, setquanty] = useState('');
   const [value, setvalue] = useState('');
 
   async function addItem() {
     const newitem = {
       title,
       quanty,
       value,
     };
 
     try {
       const result = await axios.post('/api/items', newitem);
       console.log(result.data);
       Swal.fire(
         'Congratulations !',
         ' Item Added Successfully',
         'success'
       ).then((result) => {
         window.location.href = '/inventory';
       });
     } catch (error) {
       console.log(error);
       Swal.fire('Ooops !', 'Something went Wrong ', 'error');
     }

      

    if (isNaN(quanty) || isNaN(value) || +quanty <= 0 || +value <= 0) {
      Swal.fire('Please enter valid quantity and value', '', 'warning');
      return;
    }
   }
 
   return (
     <div>
       <h5>Add Item</h5>
       <div className="invt row">
         <div className="invt col-md-5">
           <input
             type="text"
             className="invt form-control"
             placeholder="Item name"
             value={title}
             onChange={(e) => {
               settitle(e.target.value);
             }}
           />
           <input
             type="text"
             className="invt form-control"
             placeholder="Quantity"
             value={quanty}
             onChange={(e) => {
               setquanty(e.target.value);
             }}
           />
           <input
             type="text"
             className="invt form-control"
             placeholder="Value per item"
             value={value}
             onChange={(e) => {
               setvalue(e.target.value);
             }}
           />
           <div className="invt text-right">
             <button className="btn-success mt-4" onClick={addItem}>
               Add Item
             </button>
           </div>
         </div>
       </div>
     </div>
   );
 }   


 /*re-order levels*/
 export function ReoderItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/items");
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Failed to fetch items.");
      }
    };
    fetchData();
  }, []);

  function handlePrint() {
    window.print();
  }


  // Filter items where the quantity is less than or equal to 3
  const filteredItems = items.filter((item) => item.quanty <= 3);

  return (
    <div className="invt row">
      <div className="invt col-md-10">
        <h5>Items Low on Quantity</h5>

        <button onClick={handlePrint}>Print</button>

        <table className="invt table table-boardered table-dark">
          <thead className="invt thed-dark ">
            <tr>
              
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Value per item</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item) => {
              return (
                <tr key={item._id}>
                 
                  <td>{item.title}</td>
                  <td>{item.quanty}</td>
                  <td>{item.value}</td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
