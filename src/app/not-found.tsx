'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Bloquear scroll inmediatamente
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.height = '100%'
    document.body.style.top = '0'
    document.body.style.left = '0'

    const timeout = setTimeout(() => {
      router.replace('/')
    }, 1800)

    return () => {
      clearTimeout(timeout)
      // Restaurar scroll
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.height = ''
      document.body.style.top = ''
      document.body.style.left = ''
    }
  }, [router])

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#191916] z-50 overflow-hidden">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Image src="/error-pet-page.png" alt="Redirigiendo" width={350} height={350} className="mb-8" />
        <div className="text-[#E9DDB5] font-frente text-[42px] md:text-[82px] text-center">
          Redirigiendo al inicio...
        </div>
      </div>
    </div>
  )
} 