import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const job = await prisma.job.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(job);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = verifyToken(request);

  if (authResult instanceof NextResponse) {
    return authResult; // This is an error response
  }

  const { userId } = authResult;
  const jobId = Number(params.id);

  // Check if the job exists and belongs to the user
  const existingJob = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!existingJob) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  if (existingJob.userId !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const job = await prisma.job.update({
    where: { id: jobId },
    data: body,
  });
  return NextResponse.json(job);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = verifyToken(request);

  if (authResult instanceof NextResponse) {
    return authResult; // This is an error response
  }

  const { userId } = authResult;
  const jobId = Number(params.id);

  // Check if the job exists and belongs to the user
  const existingJob = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!existingJob) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  if (existingJob.userId !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const job = await prisma.job.delete({
    where: { id: jobId },
  });
  return NextResponse.json(job);
}
