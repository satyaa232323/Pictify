'use client'
import { BlurFade } from '@/components/magicui/blur-fade';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Router } from 'next/router';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const CreateContent = () => {

 const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
   
   
    if (!image || !title) {
      toast.error('Image and title are required');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const res = await fetch('/api/pins', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        toast.success('Post created successfully!');
        setTitle('');
        setDescription('');
        setImage(null);
        setPreviewUrl(null);
        router.push('/');
        
      } else {
        toast.error('Failed to create post');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };


  return (
    <div className='min-h-screen p-6'>
      <div className='mx-auto border-b-2 border-gray-200'>
        <h1 className="text-3xl font-bold">Create a New Post</h1>
        <p className="text-gray-600 mt-2 mb-4">Use the form below to create a new post.</p>
        {/* Add your form or content creation component here */}
      </div>

      <div className="mt-6 space-y-4">
        {/* Upload & Preview */}
        {previewUrl ? (
          <BlurFade delay={0.1} className="relative w-full aspect-[4/5]">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover rounded-xl shadow-md"
            />
          </BlurFade>
        ) : (
          <Input type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
        )}

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Write a short description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button onClick={handleSubmit} disabled={!image || !title}>
          Publish Post
        </Button>
      </div>
    </div>
  )
}

export default CreateContent
