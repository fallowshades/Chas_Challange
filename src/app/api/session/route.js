import Session from '@/models/Session';
import User from '@/models/User';
import { dbConnect } from '@/utils/mongoose';
import { NextResponse } from 'next/server';
export async function GET() {
  await dbConnect();
  const tasks = await Session.find();
  return NextResponse.json(tasks);
}
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const createJWT = (payload) => {
    const token = jwt.sign(payload, 'secret', {
      expiresIn: '1h',
    });
    return token;
  };

  try {
    const body = await request.json();
    const { username, password } = body;
    const user = await User.findOne({ username, password });

    if (!user) {
      console.log('error');
      return NextResponse.status(401).json({
        error: 'Fel användarnamn eller lösenord',
      });
    }

    const token = createJWT({ userId: user._id, role: user.role });
    const newSession = new Session({ token });
    const savedSession = await newSession.save();
    return NextResponse.json(savedSession);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
