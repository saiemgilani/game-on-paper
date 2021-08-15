import useSWR from 'swr'
import axios from 'axios'
// This exists for the case where you want to use swr with the node.js api
// currently this is not intended to be used but should be kept in case we want to use it
export default function useRequest(request, { initialData, ...config } = {}) {
  return useSWR(
    request && JSON.stringify(request),
    () => axios(request || {}).then(response => response.data),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        headers: {},
        data: initialData
      }
    }
  )
}
