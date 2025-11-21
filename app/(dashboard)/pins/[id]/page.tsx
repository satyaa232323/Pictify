'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';
import ImageCard from '@/components/ImageCard';

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
      name: string;
      id: string;
    }
  }[]
}

const Pin = () => {
  const { id } = useParams();
  const router = useRouter();
  const { userId, isLoaded, isSignedIn } = useAuth();

  const [pin, setPin] = useState<PinDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saves, setSaves] = useState<PinDetail['saves']>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [otherPins, setOtherPins] = useState<PinDetail[]>([]);

  useEffect(() => {
    const checkSaveStatus = () => {
      if (saves.length > 0 && userId) {
        const saved = saves.some(save => save.user.id === userId);
        setIsSaved(saved);
      }
    };

    checkSaveStatus();
  }, [saves, userId]);

  useEffect(() => {
    const fetchPin = async () => {
      try {
        const res = await fetch(`/api/pins/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch pin');
        }

        const data = await res.json();
        setPin(data);
        setSaves(data.saves || []);



        // fetch other pins
        const otherRes = await fetch(`/api/pins`);
        if (!otherRes.ok) {
          throw new Error('Failed to fetch other pins');
        }

        const allPins = await otherRes.json();
        const filteredPins = allPins.filter((p: PinDetail) => p.id !== id);
        setOtherPins(filteredPins);
      }
      catch (error) {
        console.error("Error fetching pin:", error);
        toast.error('Failed to load pin');
      }
      finally {
        setLoading(false);
      }
    }

    if (id) fetchPin();
  }, [id]);

  useEffect(() => {
    if (saves.length > 0 && userId) {
      const saved = saves.some(save => save.user.id === userId);
      setIsSaved(saved);
    }
  }, [saves, userId]);

  const handleSave = async () => {
    if (!isSignedIn) {
      toast.error('Please sign in to save pins', {
        duration: 3000,
        action: {
          label: "Sign In",
          onClick: () => router.push('/auth/sign-in')
        }
      });
      return;
    }

    if (!pin?.id || isSaving || isSaved) return;

    setIsSaving(true);

    try {
      const res = await fetch(`/api/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pinId: pin.id })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save pin');
      }

      // Update local state with new save
      setSaves(prev => [...prev, {
        user: {
          id: userId as string,
          name: data.user?.name || 'You'
        }
      }]);
      setIsSaved(true);
      toast.success('Pin saved successfully!');
    }
    catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load pin';
      console.error("Error fetching pin:", error);
      toast.error(errorMessage);
    }
    finally {
      setIsSaving(false);
    }
  };

  const handleUnsave = async () => {
    if (!pin?.id || isSaving || !isSaved) return;

    setIsSaving(true);

    try {
      const res = await fetch(`/api/save/${pin.id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Failed to unsave pin');
      }

      // Remove save from local state
      setSaves(prev => prev.filter(save => save.user.id !== userId));
      setIsSaved(false);
      toast.success('Pin removed from saves');
    }
    catch (error) {
      toast.error('Failed to remove pin from saves');
    }
    finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded) return null;
  if (loading) return <div className=" w-full flex justify-center items-center mt-14"><Loader2 className='animate-spin text-lg text-red-600' /></div>;
  if (!pin) return <div className="p-6 text-red-600">Pin not found</div>;

  return (
    <div className="p-6 columns-1 sm:columns-2 md:columns-3 lg:columns-2 gap-4 space-y-4">
      <div className="break-inside-avoid mb-4 bg-white rounded-xl shadow-sm overflow-hidden ">
        <img
          src={pin.imageUrl}
          alt={pin.title}
          className="rounded-xl w-full object-cover"
        />
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mt-4">{pin.title}</h1>
            <p className="text-gray-600 mt-2">{pin.description}</p>
          </div>
          <div>
            {isSaved ? (
              <Button
                onClick={handleUnsave}
                className="mt-4"
                variant="destructive"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Removing...
                  </>
                ) : (
                  <>
                    <BookmarkCheck className="mr-2 h-4 w-4" />
                    Saved
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                className="mt-4"
                variant="outline"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <img
            src={pin.user.image}
            alt={pin.user.name}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">{pin.user.name}</span>
        </div>
      </div>


      {otherPins.length > 0 && (
        <div>
          <h2 className='text-xl font-semibold mb-4'>Other Pins You Might Like</h2>
          <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-2 gap-4 space-y-4'>
            {otherPins.map((item, index) => (
              <ImageCard
                key={item.id}
                id={item.id}
                alt={item.title}
                title={item.title}
                imageUrl={item.imageUrl}
                src={item.imageUrl}
                description={item.user?.name}
                delay={index * 0.1}

              />
            ))}
          </div>
        </div>

      )}
    </div>
  )
}

export default Pin
