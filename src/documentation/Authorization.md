# login/log out

- position in sidbar, navbar or header

## session into redux store

[idee] https://chat.openai.com/auth/login (set time out) en array i en array. byte array efter timeout, byt index efter timeout

- make personal with interpolation--> "generate an array with good advice about ${favoritePlace}"

- this is not the schema we want25

```js
const SessionSchema = new Schema({
  // _id: {
  //   type: String,
  //   required: [true, 'The Task title is required '],
  //   unique: true,
  //   trim: true,
  //   maxlength: [40, 'title cannot be grater than 40 characters'],
  // },
  token: {
    type: String,
    required: true,
    trim: true,
  },
});
```

```js
import Session from '@/models/Session';
import User from '@/models/User';
import { dbConnect } from '@/utils/mongoose';
import { NextResponse } from 'next/server';
```

```js
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const createJWT = (payload) => {
    const token = jwt.sign(payload, 'secret', {
      expiresIn: '1h',
    });
    return token;
  };

  try {
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
```
