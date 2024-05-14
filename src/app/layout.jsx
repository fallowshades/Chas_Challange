import { CreateObjects } from '@/components/CreateNavbar'
import '../styles/globals.css'

export const metadata = {
  title: 'NextMongo',
  description: 'NextMongo is a simple app to manage tasks.',
}
import StoreProvider from '@/app/storeProvider'

function RootLayout({ children }) {
  const creatingeTest = true
  return (
    <html>
      <body>
        <StoreProvider>
          {creatingeTest && <CreateObjects />}
          <main className='px-5 md:px-0 container mx-auto'>{children}</main>
        </StoreProvider>
      </body>
    </html>
  )
}

export default RootLayout
