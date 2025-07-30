'use client'
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'
interface PinDetail {
  id: string;
  title: string;
  description: string;
  imageUrl: string
  user: {
    name: string;
    image: string;
  }
  saves: {
    user: {
      name: string
    }
  }[]
}


const Pin = () => {

  const { id } = useParams();
  const [pin, setPin] = useState<PinDetail | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPin = async () => {
      try {
        const res = await fetch(`/api/pins/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch pin');
        }

        const data = await res.json();
        setPin(data);
      }
      catch (error) {
        console.error("Error fetching pin:", error);
      }
      finally {
        setLoading(false);
      }
    }
    if (id) fetchPin();
  }
    , [id]);


  if (loading) return <div className="p-6">Loading...</div>
  if (!pin) return <div className="p-6 text-red-600">Pin not found</div>

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-10">
      {/* Gambar */}
      <div className="w-full lg:w-2/3">
        <img
          src={pin.imageUrl}
          alt={pin.title}
          className="rounded-xl w-full object-cover"
        />
        <h1 className="text-3xl font-bold mt-4">{pin.title}</h1>
        <p className="text-gray-600 mt-2">{pin.description}</p>

        <div className="flex items-center gap-3 mt-4">
          <img
            src={pin.user.image}
            alt={pin.user.name}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">{pin.user.name}</span>
        </div>
      </div>

      {/* Sidebar (optional) */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="font-semibold text-lg mb-2">Saved by</h2>
          {pin.saves.length > 0 ? (
            <ul className="list-disc pl-4 text-sm">
              {pin.saves.map((save, index) => (
                <li key={index}>{save.user.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No one has saved this pin yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Pin
