import { IVideo } from "@/modals/Video";
import VideoComponent from "./VideoComponent";
import { IIMAGE } from "@/modals/ImageModal";
import ImageComponent from "./ImageComponent";

interface VideoFeedProps {
  videos: IVideo[];
  images: IIMAGE[];
}

export default function VideoFeed({ videos, images }: VideoFeedProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoComponent key={video._id?.toString()} video={video} />
      ))}

      {images.map((image) => (
        <ImageComponent key={image._id?.toString()} image={image} />
      ))}
      {videos.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-base-content/70">No videos found</p>
        </div>
      )}
    </div>
  );
}
