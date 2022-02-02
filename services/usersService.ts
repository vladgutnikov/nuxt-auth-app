import { Context } from '@nuxt/types'
import ApiService from '~/services/apiService'

class UsersService extends ApiService{
  static async getUsers($axios: Context['$axios']) {
    return this.parseResponse(await $axios.get('/api/users'))
  }
}

export default UsersService
