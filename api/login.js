import {post} from '~/plugins/server'

export const login = (p) => post('/Utmel/Login/DevLogin'+p);