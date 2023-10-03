import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react'
// api connector
import axios from 'axios';
// api link
import { API_URL } from '../Constants/URL';
// icons
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa';
// current page to navigate the another pages
import { useNavigate } from 'react-router-dom';
import './read.css'

const Read = () => {

  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate()
  const callGetAPI = async () => {
    const res = await axios.get(API_URL);
    setApiData(res.data);
    // console.log(res.data);
    // console.log(apiData)
  }

  // delete the user details
  const deleteUser = async ({ id, firstName, lastName }) => {
    await axios.delete(API_URL + id)
    callGetAPI();
    alert(`Delete the details  ${firstName} `)
  }

  // update the user details
  const updateUser = ({ id, firstName, lastName, email, checked }) => {

    // local storage to use update
    localStorage.setItem('id', id);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);
    localStorage.setItem('checked', checked);

    navigate('/update')

  }
  useEffect(() => {
    callGetAPI();
  }, [])
  return (
    <div className='readdiv container'>
      <Table className='table'>
        <Table.Header>
          <Table.Row className='tablerow'>
            <Table.HeaderCell className='tabelcol tabelcol2'>Firstname</Table.HeaderCell>
            <Table.HeaderCell className='tabelcol tabelcol2'>lastname</Table.HeaderCell>
            <Table.HeaderCell className='tabelcol tabelcol2'>Email ID</Table.HeaderCell>
            <Table.HeaderCell className='tabelcol tabelcol2'>Checked</Table.HeaderCell>
            <Table.HeaderCell className='tabelcol tabelcol2'>Edit</Table.HeaderCell>
            <Table.HeaderCell className='tabelcol tabelcol2'>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            apiData.map(data => (
              <Table.Row key={data.id} className='tablerow'>
                <Table.Cell className='tabelcol tabelcol1'>{data.firstName}</Table.Cell>
                <Table.Cell className='tabelcol tabelcol1'>{data.lastName}</Table.Cell>
                <Table.Cell className='tabelcol tabelcol1'>{data.email}</Table.Cell>
                <Table.Cell className='tabelcol tabelcol1'>{data.checked ? "checked" : "unchecked"}</Table.Cell>


                <Table.Cell className='tabelcol tabelcol1'><FaEdit onClick={() => updateUser(data)} /></Table.Cell>
                <Table.Cell className='tabelcol tabelcol1'><MdDelete onClick={() => deleteUser(data)} /></Table.Cell>
              </Table.Row>
            ))
          }


        </Table.Body>
      </Table>
    </div>
  )
}

export default Read