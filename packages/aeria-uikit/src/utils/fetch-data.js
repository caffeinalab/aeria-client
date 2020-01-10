import axios from 'axios'

export default function fetchData(url = '', options = {}) {
  const { token: cancelToken, cancel: cancelSource } = axios.CancelToken.source()

  const promise = new Promise((resolve, reject) => {
    const { headers, ...rest } = options

    const fetchOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(headers ? headers : {})
      },
      url,
      method: 'GET',
      mode: 'cors',
      cancelToken,
      ...rest
    }

    return axios(fetchOptions)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response)
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled')
        } else {
          reject(err)
        }
      })
  })

  promise.cancel = cancelSource
  return promise
}
