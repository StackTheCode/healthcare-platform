'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { decryptKey, encryptKey } from "@/lib/utils"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"



const PassKeyModal = () => {
  const router = useRouter()
  const path = usePathname();
  const [open, setOpen] = useState(true)
  const [passKey, setPassKey] = useState('');
  const [error, setError] = useState("")


  const encryptedKey = typeof window !== "undefined" ? window.localStorage.getItem('accessKey') : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push('/admin')
      }
      else {
        setOpen(true)
      }
    }
  }, [encryptedKey])




  const validatePassKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passKey)
      localStorage.setItem('accessKey', encryptedKey)
      setOpen(false);
    }
    else {
      setError("Invalid passKey")
    }
  }
  const closeModal = () => {
    setOpen(false)
    router.push('/')
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">Admin Access Verification
            <Image className="cursor-pointer" src="/assets/icons/close.png" width={25} height={25} alt="verification"
              onClick={() => closeModal()} />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To acceess the admin page please enter the passkey
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP maxLength={6} value={passKey} onChange={(value) => setPassKey(value)}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot index={0} className="shad-otp-slot" />
              <InputOTPSlot index={1} className="shad-otp-slot" />
              <InputOTPSlot index={2} className="shad-otp-slot" />
              <InputOTPSlot index={3} className="shad-otp-slot" />
              <InputOTPSlot index={4} className="shad-otp-slot" />
              <InputOTPSlot index={5} className="shad-otp-slot" />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="shad-error text-14-regular mt-4 justify-center">
            {error}
          </p>
          }

        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={(e) => validatePassKey(e)} className="shad-primary-btn w-full">Enter Admin PassKey</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PassKeyModal;