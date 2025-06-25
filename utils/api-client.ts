import { IVideo } from "@/modals/Video";
import {IIMAGE} from "@/modals/ImageModal"

export type VideoFormData = Omit<IVideo, "_id">;
export type ImageFormData = Omit<IIMAGE, "_id">;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  async getVideos() {
    return this.fetch<IVideo[]>("/videos");
  }

  async getImages() {
    return this.fetch<IIMAGE[]>("/images");
  }


  async getVideo(id: string) {
    return this.fetch<IVideo>(`/videos/${id}`);
  }

    async getImage(id: string) {
    return this.fetch<IIMAGE>(`/images/${id}`);
  }
  async createVideo(videoData: VideoFormData) {
    return this.fetch<IVideo>("/videos", {
      method: "POST",
      body: videoData,
    });
  }

   async createImage(imageData: ImageFormData) {
    return this.fetch<IIMAGE>("/images", {
      method: "POST",
      body: imageData,
    });
  }
}

export const apiClient = new ApiClient();
