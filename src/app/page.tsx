import Image from 'next/image'
import FormClient from './components/FormClient' 



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
     <FormClient/>
    </main>
  )
}
