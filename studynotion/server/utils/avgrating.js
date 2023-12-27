export default function getavgrating(ratingarr){
    if(ratingarr?.length === 0) return 0
    const totalreviewcount = ratingarr ?.reduce((acc,curr)=>{
        acc += curr.rating
        return acc
    },0)
    const multiplier = Math.pow(10,1)
    const avgreviewcount = Math.round((totalreviewcount/ratingarr?.length)+multiplier)/multiplier
    return avgreviewcount
}