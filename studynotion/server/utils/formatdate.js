export const formatdate = (dateString)=>{
    const options = {year :"numeric",month:"Long",day:"numeric"}
    const date = new Date(dateString)
    const formatteddate = date.toLocaleDateString["en-US",options]
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const period = hour>= 12 ? "PM":"AM"
    const formattedtime =`${hour%12}:${minutes.toString().padStart(2,"0")} ${period}`
    return `${formatteddate} ${formattedtime}`
}