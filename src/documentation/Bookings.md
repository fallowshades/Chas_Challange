# Redux Toolkit

[redux-toolkit]https://redux-toolkit.js.org/introduction/getting-started

## homogeneous array of identical objects

###

layout.jsx

- the provider need to be in the body since javascript run after the basic html is set up

```jsx
import StoreProvider from '@/app/storeProvider'
import store from '@/lib/store'

function RootLayout({ children }) {
    ...
    return (
    <html>
      <body>
        <StoreProvider store={store}>
        ...
        </StoreProvider>
      </body>
    </html>
  );


}
```

storeProvider.jsx

- redux store like to recieve objects that can be refered as payload
- i dont know if the name count means anything

```jsx
import { initializeUser } from '../lib/features/user/userSlice'

export default function StoreProvider({ count, children }) {
  ...
  storeRef.current = makeStore()
  storeRef.current.dispatch(initializeUser({ value: count }))
}
```

auth/signup.jsx

- call the reducer to create a store on the local client in the browser

```jsx
const SignUp = ({ count }) => {
  const store = useAppStore()
  const initialized = useRef(false)
  if (!initialized.current) {
   ...
    store.dispatch(initializeUser({ value: count }))
  }
    return(

    )
}
```

#### setup slice with hydration

##### user slice --> roll baserad applikation som minns otp/token

##### sätta favoriter (kan hämta lokalt utan att behöva ladda om)

#### wrapp the store such that it is accessible

#### select type of travel in checkout
