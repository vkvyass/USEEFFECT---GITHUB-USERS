import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Repo = () => {
    // All states handled here
    const [input, setInput] = useState("react")
    const [data, setData] = useState([])
    const [page,setPage] = useState(1)
    const [sort,setSort] = useState("")


    // useEffect
    useEffect(() => {
        handleFetch()
    }, [page,sort])

    // fetching the data 
    const handleFetch = () => {
       if(!sort){
        fetch(`https://api.github.com/search/repositories?q=${input}&_page=${page}&_limit=${5}`)
        .then((res) => res.json())
        .then((res) => setData(res.items))
        .catch((err) => console.log(err))
    }
    else{
        fetch(`https://api.github.com/search/repositories?q=${input}&_page=${page}&_limit=${5}&_sort=full_name&_order=${sort}`)
        .then((res) => res.json())
        .then((res) => setData(res.items))
        .catch((err) => console.log(err))
    } 
    }

    // fetching data for input provided
    const handleSearch = () => {
        if(!sort){
            fetch(`https://api.github.com/search/repositories?q=${input}&_page=${page}&_limit=${5}`)
            .then((res) => res.json())
            .then((res) => setData(res.items))
            .catch((err) => console.log(err))
        }
        else{
            fetch(`https://api.github.com/search/repositories?q=${input}&_page=${page}&_limit=${5}&_sort=full_name&_order=${sort}`)
            .then((res) => res.json())
            .then((res) => setData(res.items))
            .catch((err) => console.log(err))
        }
            
    }

    return (
        <div>
            <h1>Repositories Search</h1>
            <input type="text" placeholder='Enter Title' value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={() => handleSearch()}>Search</button>
            <h1 style={{color:"red"}}>Your Results</h1>
            {
                data.map((e) => (
                    <h2>{e.full_name}</h2>
                ))
            }
            <div style={{display:"flex", justifyContent:"center", gap:"10px"}}>
                <button disabled={page === 1} onClick={() => setPage(prevState => prevState-1)}>Prev</button>
                <p>{page}</p>
                <button onClick={() => setPage(prevState => prevState+1)}>Next</button>
            </div>
            <div style={{display:"flex", justifyContent:"center", gap:"10px"}}>
                <button onClick={() => setSort("asc")}>Asc</button>
                <button onClick={() => setSort("desc")}>Desc</button>
                <button onClick={() => setSort("")}>Dont Sort</button>
            </div>
        </div>
    )
}

export default Repo