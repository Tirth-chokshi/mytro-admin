"use client"
import React from 'react'
import { useParams } from 'next/navigation'
function page() {
    const { id } = useParams()
  return (
    <div>
        store id: {id}
    </div>
  )
}

export default page