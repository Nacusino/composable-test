import { ref } from "vue"

const buildUrl = (defaultUrl: string, params?: Record<string, string | number>) => {
    if (!params || Object.keys(params).length === 0) {
        return defaultUrl
    }
    const paramsUrl = new URL(defaultUrl)
    Object.entries(params).forEach(([key, value]) => {
        paramsUrl.searchParams.append(key, String(value))
    })
    return paramsUrl.toString()
}

export const useApi = (url: string, method?: string, headers?: Headers, params?: Record<string, string | number>, body?: string) => {
    const data = ref<Object | null>(null)
    const loading = ref(false)
    const error = ref<Error | null>(null)
    const status = ref(0)
    const fetchData = () => {
        const finalUrl = buildUrl(url, params)

        fetch(url, {
            method: method,
            headers: headers,
            body: (method == 'GET') || (method == 'HEAD')? undefined : body})
        .then((response) =>  {
            status.value = response.status
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            return response.json()
        })
        .then((json) => {
            data.value = json
        })
        .catch((err) => {
            error.value = err
            console.error(err)
        })
        .finally(() => {
            loading.value = false
        })
    }
    
    return {data, loading, error, status, fetchData}
}   