import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Button, Input} from 'antd';

const Table = () => {

    const [order, setOrder] = useState ('ASC')
    const [data, setData] = useState ([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const getData=async() => {
    
            try {
                const response = await axios ({
                    url: 'https://my-json-server.typicode.com/improvein/dev-challenge/bands',
                });
                setData(response.data);
            
            }catch(error){
                console.log(error)
                }}

            getData()
            }, []);

    const orderNames = (col) => {
        if (order==="ASC") {
            const sorted = [...data].sort((a,b) =>
            a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1)
            setData(sorted)
            setOrder("DSC");
        }
        if (order === "DSC") {
            const sorted = [...data].sort((a,b) =>
            a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1)
            setData(sorted)
            setOrder("ASC");
        }
    }
    
    return (
        <div id= "content-wrapper">
                <Input placeholder="Search..." onChange={(event) => setSearch(event.target.value)}/> 
                
                <table>
                    <tr>
                        <th><Button id= "th"type="text" onClick={() => orderNames('name')}>Name</Button></th>
                    </tr>
                    {data.filter((val) => {
                        if (search =="") {
                            return val
                        }
                        else if (val.name.toLowerCase().includes(search.toLowerCase())) {
                            return val
                            }
                        }).map((val,key) => {
                            return (
                                <tr className="user" key={key}>
                                <p>{val.name}</p>
                                </tr>
                            )
                        })}
                </table>
        </div>
    )
    }
export default Table
