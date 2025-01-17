export const filterBody = (payload: object) => {
    const body = Object.entries(payload)
    const filteredData = body.filter(data => data[1])
    const filteredBody = Object.fromEntries(filteredData) 
    return filteredBody
}