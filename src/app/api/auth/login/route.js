import User from '@/models/User';
import { dbConnect } from '@/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const tasks = await User.find();
  return NextResponse.json(tasks);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const user = await User.findOne({ email: body.email }); //can use its methods
    if (!user) throw new UnauthenticatedError('invalid credentials');

    const isValidUser =
      user && (await User.comparePassword(body.password, user.password));
    if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

    const token = user.generateToken({ userId: user._id, role: user.role });

    return NextResponse.json({ token: token });
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
