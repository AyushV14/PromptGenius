"use client"

import {useState,useEffect} from 'react'
import PromptCard from './PromptCard'


const PromptCardList = ({ data,handleTagClick })=>{
  return (
    <div className='mt-10 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText,setSearchText] = useState('')
  const [posts,setPosts] = useState([])

  const handleSearchChange = (e) =>{

  }

  useEffect(()=>{
    const fetchposts = async () =>{
      const response = await fetch('/api/prompt');
      const data = await response.json()

      setPosts(data);
    }

    fetchposts();
  },[]);

  return (
    <section className='feed'>
      <form  className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={posts}
        handletagCLick={()=> {}}
      />
    </section>
  )
}

export default Feed