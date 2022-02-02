import { HTTPResponse } from '@nuxtjs/auth-next'

const errorCodes = [400, 404, 500]

class Api {
  static parseResponse(data: HTTPResponse) {
    if (errorCodes.includes(data.status)) {
      throw Error(data.statusText)
    }
    return data.data.data
  }
}

export default Api
