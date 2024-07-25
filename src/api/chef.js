import {request} from "../../utils/index";

export function queryList (params) {
  return request({
    url: '/api/chef/queryList',
    method: 'POST',
    data: params
  })
}
