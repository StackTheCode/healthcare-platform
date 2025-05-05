
import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";
import PassKeyModal from "@/components/PassKeyModal";

export default function Home({searchParams}:SearchParamProps) {
const isAdmin= searchParams.admin === 'true';

  return (
    <div className="flex  h-screen max-h-screen">
      {isAdmin && <PassKeyModal/>}
      <section className="remove-scrolllbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image src="/assets/icons/logo.svg" alt="logo" width={1000} height={1000} className="mb-12 h-10 w-fit" />

          <PatientForm />
          <div className="text-14-regular flex justify-between mt-12">
            <p className="justify-items-end text-dark-600 xl:text-left">
              @2024 CarePulse
            </p>
            <Link href="/?admin=true" className="text-green-500 ">
              Admin Login
            </Link>


          </div>
        </div>
      </section>

      <Image src="/assets/images/home.png" alt="landing-image" width={1000} height={1000} className="side-img max-w-[50%]" />
    </div>
  )
}
