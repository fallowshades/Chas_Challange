import User from '@/models/User';

import { NextResponse } from 'next/server';

import { dbConnect } from '@/utils/mongoose';
export async function GET() {
  await dbConnect();
  const tasks = await User.find();
  return NextResponse.json(tasks);
}

export async function POST(request) {
  try {
    const body = await request.json(); //no req object parsed

    const isFirstAccount = (await User.countDocuments()) === 0;
    body.role = isFirstAccount ? 'admin' : 'user';

    const newUser = new User(body);
    const savedUser = await newUser.save();
    return NextResponse.json(savedUser);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
