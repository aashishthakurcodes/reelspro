"use client"
import { useEffect, useState } from "react";
import { IVideo } from "@/modals/Video";
import { IIMAGE } from "@/modals/ImageModal";
import { apiClient } from "@/utils/api-client";
import VideoComponent from "./components/VideoComponent";
import ImageComponent from "./components/ImageComponent";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [images, setImages] = useState<IIMAGE[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoData = await apiClient.getVideos();
        const imageData = await apiClient.getImages();
        setVideos(videoData);
        setImages(imageData);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ImageKit ReelsPro</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.length > 0 ? (
            videos.map((video) => (
              <VideoComponent key={video._id?.toString()} video={video} />
            ))
          ) : (
            <p className="col-span-full text-center text-base-content/70">
              No videos found.
            </p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length > 0 ? (
            images.map((image) => (
              <ImageComponent key={image._id?.toString()} image={image} />
            ))
          ) : (
            <p className="col-span-full text-center text-base-content/70">
              No images found.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
