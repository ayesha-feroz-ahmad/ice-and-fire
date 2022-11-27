import axios from "axios";

export const fetchBookList = (props) => {
  return axios({
    method: 'GET',
    url: '/books',
    params: props
  })
}

export const fetchCharactersList = (props) => {
  return axios({
    method: 'GET',
    url: '/characters',
    params: props
  })
}

export const fetchHousesList = (props) => {
  return axios({
    method: 'GET',
    url: '/houses',
    params: props
  })
}
