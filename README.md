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
import flowbite from 'flowbite-react/tailwind';
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
};
```

#### Fix accessibility noice as alternating between client ans server side

[accecability]

- problem: app-index.js:32 Warning: Prop `aria-controls` did not match. Server: "radix-:R256qcq:" Client: "radix-:R8kr9j9:" solution match on both server and client side (https://github.com/shadcn-ui/ui/issues/1018)

- fix aria for all components implementing the shadcn imports

```jsx
const AccordionComponent = () => {
  const idPrefix = 'radix';
  const triggerId = `${idPrefix}-trigger`;
  const contentId = `${idPrefix}-content`;

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
  );
};
```
