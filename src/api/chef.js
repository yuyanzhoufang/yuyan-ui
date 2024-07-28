import {request} from "../../utils/index";

export function queryList (params) {
  return request({
    url: '/api/chef/queryList',
    method: 'POST',
    data: params
  })
}

export function deleteById (params) {
  return request({
    url: '/api/chef/deleteById',
    method: 'POST',
    data: params
  })
}

export function updateById (params) {
  return request({
    url: '/api/chef/updateById',
    method: 'POST',
    data: params
  })
}

export function removeImage (params) {
  return request({
    url: '/api/image/remove',
    method: 'POST',
    params,
  })
}

export function addChef (params) {
  return request({
    url: '/api/chef/add',
    method: 'POST',
    data: params,
  })
}
