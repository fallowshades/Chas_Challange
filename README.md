# Nextjs & Mongodb CRUD

A web aplication CRUD using Nodejs y Mongodb (with mongoose)

## local database setup

[community-server] https://www.mongodb.com/try/download/community
[locall-gui] https://www.mongodb.com/products/tools/compass

### Installation

```
cd next-mongodb-app
npm i
npm run dev
```

[CORRECT-FOLDER]https://github.com/shadcn-ui/ui/issues/755 (global.css is in src/app not in /app (bc of app router))

```sh
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input accordion alertdialog alert avatar badge breadcrumb calendar card carousel checkbox collapsible command dropdownmenu dialog form hovercard inputotp label pagination menubar radiogroup progress resizable scrollarea select navigationmenu sheet skeleton slider sonner switch table tabs textarea togglegroup toast tooltip

npm i flowbite-react
```

#### documentation

[flowbite]https://flowbite-react.com/docs/components/accordion
[shadcn]https://ui.shadcn.com/docs/installation/next
[semantic-ui]https://semantic-ui.com/elements/button.html

- note no "type":"module" in packacke.js (believe nextjs use ts-node behind the sceens https://www.npmjs.com/package/ts-node)
- thus we use static imports instead of dynamic imports like the documentation

```js
import flowbite from 'flowbite-react/tailwind'
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  content: [
    // ...
    flowbite.content(),
  ],
  plugins: [require('tailwindcss-animate'), flowbite.plugin()],
}
```

#### Fix accessibility noice as alternating between client ans server side

[accecability]

- problem: app-index.js:32 Warning: Prop `aria-controls` did not match. Server: "radix-:R256qcq:" Client: "radix-:R8kr9j9:" solution match on both server and client side (https://github.com/shadcn-ui/ui/issues/1018)

- fix aria for all components implementing the shadcn imports

```jsx
const AccordionComponent = () => {
  const idPrefix = 'radix'
  const triggerId = `${idPrefix}-trigger`
  const contentId = `${idPrefix}-content`

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger
          id={triggerId}
          value='account'
          aria-controls={contentId}
          aria-labelledby={triggerId}
        >
          ...
        </AccordionTrigger>
        <AccordionContent
          id={contentId}
          value='account'
          aria-labelledby={triggerId}
        >
          ...
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

#### skapa objekt

[struktur]

- see layout -->@/components/CreateNavbar --> link to crud folder (page)

//skapa objekt

#### api auth and user

[postman,thunderclient] test endpoints

{{travelSite}}/api/auth/register
POST

```json
{
  "name": "Bubbles McLaughster",
  "lastName": "Ticklebottom",
  "email": "test@test.com",
  "username": "String",
  "password": "secret123"
}
```

{{travelSite}}/api/auth/login
POST

```json
{
  "email": "test@test.com",
  "password": "secret123"
}
```

```js
import User from '@/models/User'

import { NextResponse } from 'next/server'

import { dbConnect } from '@/utils/mongoose'
export async function GET() {
  await dbConnect()
  const tasks = await User.find()
  return NextResponse.json(tasks)
}

export async function POST(request) {
  try {
    const body = await request.json() //no req object parsed

    const isFirstAccount = (await User.countDocuments()) === 0
    body.role = isFirstAccount ? 'admin' : 'user'

    const newUser = new User(body)
    const savedUser = await newUser.save()
    return NextResponse.json(savedUser)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    })
  }
}
```

NEXTJS use foldernames to map the request to the correct handler. note that in the api folder all request in an url that end in either '/' or '/:id' where id is a sequence of numbers. in your local database in mongodb compass you can see that once an object is created a random '\_id' is generated.

api/auth/register

```js
import { dbConnect } from '@/utils/mongoose'
export async function GET() {
  await dbConnect()
  const tasks = await User.find()
  return NextResponse.json(tasks)
}

export async function POST(request) {
  try {
    const body = await request.json() //no req object parsed

    const isFirstAccount = (await User.countDocuments()) === 0
    body.role = isFirstAccount ? 'admin' : 'user'

    const newUser = new User(body)
    const savedUser = await newUser.save()
    return NextResponse.json(savedUser)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    })
  }
}
```

#### changes in model

- mongoDB generate the id for us

```js
const AccountSchema = new Schema(
  {
    userid: {
      type: Number,
      required: [true, 'The Task title is required '],
      unique: true,
    },
    ...
  })
```

- a rolebased application like to use a finite set of roles to pich from.

````js
const userSchema = new Schema(
{
    email: String,
    username: String,
    password: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    ...
   } )
```
````

#### branch teamwork

- mv and create branch flag (test --> no go => instead in main branch)

```sh
git checkout -b redux-setup ( cant fetch data if on same branch)
```

```sh
 git fetch origin reduxBranch:redux-setup
 git checkout redux-setup
```

- some outdated packages

```sh
npm i --force
npm run dev
```

- see documentation/bookings

#### Fix

loader.jsx

- use proper imports

```jsx
import { Skeleton } from '@/components/ui/skeleton'
```

#### Fix broken stype. dont use too many component libraries

tailwind.config.js

- could not use grid since style are not working

```jsx
/**
 *   content: [
    // ...
    //flowbite.content(),
  ],
 */
```

#### resuable hero and image problem fixed

Hero.jsx

```jsx
import Image from 'next/image'
const Hero = ({ textContent }) => {
  const { paragraph, header } = textContent || {}
  const unSplashImage =
    'https://plus.unsplash.com/premium_photo-1677675594688-f7bc0a870930?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  return (
    <div>
      <Image
        src={unSplashImage}
        width={300}
        height={300}
        className='w-48 h-48 rounded shadow-lg mb-4'
        priority
        alt=''
      />
      <p>{paragraph}</p>
    </div>
  )
}
export default Hero
```

[can-put-indomains/remotePatterns] https://dev.to/joseph42a/practical-applications-of-the-nextjs-14-image-component-hands-on-examples-3753

next.config.js

```jsx
const nextConfig = {
  images: {
    domains: ['plus.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.thecocktaildb.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}
```

#### chat functionallity with a single array of objects

places\page.jsx

```jsx
import { dbConnect } from '@/utils/mongoose'
import TaskCard from '@/components/TaskCard'
import Task from '@/models/Task'

export async function loadTasks() {
  await dbConnect()
  const tasks = await Task.find()
  return tasks
}

const page = async () => {
  const tasks = await loadTasks()

  const personImg =
    'https://media.istockphoto.com/id/1437816897/sv/foto/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring-or.jpg?s=612x612&w=is&k=20&c=qVk5imD72SQIEw4EepIZEshWounStGku56lTX3lISEI='
  const personImg2 =
    'https://media.istockphoto.com/id/1158687574/sv/foto/ung-flicka-som-ler-i-skolan.jpg?s=612x612&w=is&k=20&c=eYdrLIlo8eF7saOLsvUpWD950Q6RkUrS-fM2_-fb8oo='
  return (
    <div>
      {tasks.map((task, index) => (
        <div>
          <div
            className={index % 2 === 0 ? 'chat chat-start' : 'chat chat-end'}
          >
            <div className='chat-image avatar'>
              <div className='w-10 rounded-full'>
                <img
                  alt='Tailwind CSS chat bubble component'
                  src={index % 2 === 0 ? personImg : personImg2}
                />
              </div>
            </div>
            <div className='chat-bubble'>
              <TaskCard task={task} key={task._id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default page
```
