/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"

const useFetch = (url) =>{
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    useEffect(() =>{
        setLoading(true);
        fetch(`${url}`)
        .then(res => res.json())
        .then(data => {
            setData(data);
            setLoading(false);
        })
    },[])
    return [data, loading]
}

export default useFetch