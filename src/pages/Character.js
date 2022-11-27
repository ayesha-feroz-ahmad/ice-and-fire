import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCharactersList } from '../Components/action/Common'
import { setCharactersData } from '../redux/slices/BooksSlice'

function Character() {
  const dispatch = useDispatch()
  const { charactersData } = useSelector(state => state.books)
  const [searchText, setSearchText] = useState("")
  const [recordList, setRecordList] = useState([])

   // Initial data
  useEffect(() => {
    fetchCharactersListData()
  }, [])

  useEffect(()=>{
    filterData()
  },[searchText, charactersData])

  // Get list of all the characters
  const fetchCharactersListData = async () => {
    try {
      let response = await fetchCharactersList()
      dispatch(setCharactersData(response?.data))
    } catch (err) {
       alert(err)
    }
  }
  
  // Filter characters using name
  function filterData(){
    let filteredData = []
    if(searchText){
      filteredData = charactersData.filter((item)=>{
        return item.aliases[0].toLowerCase().includes(searchText.toLowerCase())      })
    }
    else{
      filteredData = charactersData
    }
    setRecordList(filteredData)
  }

  return (
    <div className="container">
      <h2>Character</h2>
      <div className="input-group">
      <input type="text" className="form-control" placeholder="Search" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Gender</th>
              <th>culture</th>
         
            </tr>
          </thead>
          <tbody>
            {
              recordList?.map((characters, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx}</td>
                    <td>{characters?.aliases ? characters?.aliases?.[0] : '-'}</td>
                    <td>{characters?.gender}</td>
                    <td>{characters?.culture}</td>
                
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

export default Character