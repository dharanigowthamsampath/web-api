import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const jobs = await prisma.job.findMany();
  return NextResponse.json(jobs);
}

export async function POST(request: NextRequest) {
  const authResult = verifyToken(request);

  if (!(authResult instanceof NextResponse)) {
    const { userId } = authResult;
    const body = await request.json();
    const job = await prisma.job.create({
      data: {
        ...body,
        userId: userId,
      },
    });
    return NextResponse.json(job);
  } else {
    return authResult;
  }
}
