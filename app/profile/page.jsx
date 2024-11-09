"use client"

import {useState,useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const myProfile = () => {

    const {data : session} = useSession();
    const router = useRouter();
    const [posts,setPosts] = useState([])

    const handleEdit = (post) =>{
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelte = async (post)=>{
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
        
        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${prompt._id.toString()}`,{
                    method: DELETE
                })

                const filteredPosts = posts.filter((p) =>
                    p._id !== post._id);
                    setPosts(filteredPosts)
            } catch (error) {
                
            }
        }
    }

    useEffect(()=>{
        const fetchposts = async () =>{
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json()
    
          setPosts(data);
        }
    
        if(session?.user.id) fetchposts();
      },[]);

      console.log(session?.user.id);
      

  return (
    <Profile
        name="My"
        desc="Welcome to your personalised profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelte}
    />
  )
}

export default myProfile;