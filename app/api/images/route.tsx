import Image,{IIMAGE} from "@/modals/ImageModal";
import { authOptions } from "@/utils/auth";
import { coonectDB } from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  try {
    await coonectDB();
    const images = await Image.find({}).sort({ createdAt: -1 }).lean();

    if (!images || images.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: 200,
      }
    );
  }
}



export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await coonectDB();
    const body: IIMAGE = await request.json();

    if (!body.title || !body.description || !body.ImageUrl ) {
      return NextResponse.json(
        { error: "Missing Required fields" },
        {
          status: 400,
        }
      );
    }

    const imageData = {
      ...body,
   
      transformation: {
        height: 1920,
        width:1080,
        quality:body.transformation?.quality ?? 100
      },
    };
 const newVideo=await Image.create(imageData)
    return NextResponse.json(newVideo)
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: 200,
      }
    );
  }
}