import React, { useEffect, useState } from 'react'
import BlogCard from '@/BlogCard'
import axios from 'axios'

const Blogs = () => {

    const [data, setData] = useState([])


    const fetchBlogs = async () => {
        const response = await axios.get("http://localhost:5000/posts")
        setData(response.data)
        console.log(response.data);

    }

    useEffect(() => {
        fetchBlogs()
    }, [])


    return (
        <>
            <div className="min-h-screen bg-gray-900 p-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-white mb-8">Latest Blog Posts</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {
                            data.map((item, index) => (

                                <BlogCard
                                    key={item._id}
                                    imageUrl={item.image}
                                    title={item.title}
                                    content={item.content}
                                    summary={item.summary}
                                    category="React"
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blogs



