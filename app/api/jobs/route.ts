import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const skip = (page - 1) * limit;

  const [jobs, totalJobs] = await Promise.all([
    prisma.job.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.job.count(),
  ]);

  const totalPages = Math.ceil(totalJobs / limit);

  return NextResponse.json({
    jobs,
    metadata: {
      currentPage: page,
      totalPages,
      totalJobs,
      limit,
    },
  });
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
