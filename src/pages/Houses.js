import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchHousesList } from '../Components/action/Common'
import { setHousesData } from '../redux/slices/BooksSlice'

function Houses() {
  const dispatch=useDispatch()
  const {housesData}=useSelector(state=>state.books)
  const [searchText, setSearchText] = useState("")
  const [recordList, setRecordList] = useState([])

  // Initial data
  useEffect(()=>{
    fetchHousesListData()
  },[])

  useEffect(()=>{
    filterData()
  },[searchText, housesData])

  // Fetch houses details
  const fetchHousesListData=async()=>{
    try {
      let response=await fetchHousesList()
      dispatch(setHousesData(response?.data))
    } catch (err) {
      alert(err)
    }
  }

  // Filter house details using name
  function filterData(){
    let filteredData = []
    if(searchText){
      filteredData = housesData.filter((item)=>{
        return item.name.toLowerCase().includes(searchText.toLowerCase())      })
    }
    else{
      filteredData = housesData
    }
    setRecordList(filteredData)
  }

  return (
    <div className="container">
    <h2>House</h2>
    <div className="input-group">
    <input type="text" className="form-control" placeholder="Search" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
    </div>
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Region</th>
            <th>coatOfArms</th>
           
          </tr>
        </thead>
        <tbody>
          {
            recordList?.map((house, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx}</td>
                  <td>{house?.name ? house?.name : '-'}</td>
                  <td>{house?.region}</td>
                  <td>{house?.coatOfArms ? house?.coatOfArms : "-"}</td>
                 
                </tr>
              )
            })
          }

        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Houses