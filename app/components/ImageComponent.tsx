import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { IIMAGE } from "@/modals/ImageModal"; // You should define this interface

export default function ImageComponent({ image }: { image: IIMAGE }) {
  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">
        <Link href={`/images/${image._id}`} className="relative group w-full">
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{ aspectRatio: "9/16" }}
          >
            <IKImage
              path={image.ImageUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              className="w-full h-full object-cover"
              loading="lazy"
              alt={image.title}
            />
          </div>
        </Link>
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/images/${image._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-lg">{image.title}</h2>
        </Link>

        <p className="text-sm text-base-content/70 line-clamp-2">
          {image.description}
        </p>
      </div>
    </div>
  );
}
