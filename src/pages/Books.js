import React from 'react'
import { useEffect } from 'react'
import { fetchBookList } from '../Components/action/Common'
import { useDispatch, useSelector } from 'react-redux'
import { setBooksData } from '../redux/slices/BooksSlice'
import { useState } from 'react'

function Books() {
  const dispatch = useDispatch()

  // global state
  const { booksData } = useSelector(state => state.books)
  const [searchText, setSearchText] = useState("")
  const [recordList, setRecordList] = useState([])

  // Initial data
  useEffect(() => {
    fetchBooksDetails()
  }, [])

  useEffect(()=>{
    filterData()
  },[searchText, booksData])


  // Fetch books details
  const fetchBooksDetails = async () => {
    try {
      let response = await fetchBookList()
      dispatch(setBooksData(response?.data))
    } catch (response) {

    }
  }

  // Filter books using name
  function filterData(){
    let filteredData = []
    if(searchText){
      filteredData = booksData.filter((item)=>{
        return item.name.toLowerCase().includes(searchText.toLowerCase())
      })
    }
    else{
      filteredData = booksData
    }
    setRecordList(filteredData)
  }

  return (
    <>
    <div className="container">
      <h2>Books</h2>
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Media Type</th>
              <th>numberOfPages</th>
              <th>publisher</th>
              <th>released</th>
             
            </tr>
          </thead>
          <tbody>
            {
              recordList?.map((books, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx}</td>
                    <td>{books?.name}</td>
                    <td>{books?.mediaType}</td>
                    <td>{books?.numberOfPages}</td>
                    <td>{books?.publisher}</td>
                    <td>{books?.released}</td>
                    
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
    </div>
    
  


      
    </>

  )
}

export default Books