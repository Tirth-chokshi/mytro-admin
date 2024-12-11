"use client"
import React from 'react'
import { useParams } from 'next/navigation'
export default function EditStore() {
    const { id } = useParams()
  return (
    <div>
        store id: {id}
    </div>
  )
}