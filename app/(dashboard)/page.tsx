import { div } from "motion/react-client";
import Image from "next/image";
import { DummyData } from "../data/DummyData";
import ImageCard from "@/components/ImageCard";



const image = {
  src: 'images/placeholder.png',
  alt: 'Placeholder Image',
}

export default function Home() {
  return (
    <div className="p-6">
      <div className="colums-2 md:columns-3 lg:colums-4 xl:colums-5 gap-4 space-y-4">
        {DummyData.map((image, index) => (
          <ImageCard
          key={image.id}
          src={image.src}
          title={image.title}
          alt={image.alt}
          description={image.author}
          delay={index * 0.1} // Optional: stagger the animation"
          />
        ))}

      </div>
    </div>
  );
}
