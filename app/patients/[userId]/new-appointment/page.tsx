
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
const  NewAppointment = async({params :{userId}} :SearchParamProps) => {
const patient = await getPatient(userId);
  return (
    <div className="flex  h-screen max-h-screen">
      <section className="remove-scrolllbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image src="/assets/icons/logo.svg" alt="logo" width={1000} height={1000} className="mb-12 h-10 w-fit" />

          <AppointmentForm type="create" userId={userId} patientId={patient?.$id}/>
         
            <p className="justify-items-end text-dark-600 xl:text-left">
              @2024 CarePulse
            </p>
           
        </div>
      </section>

      <Image src="/assets/images/appointment.png" alt="landing-image" width={1000} height={1000} className="side-img max-w-[390px] bg-bottom" />
    </div>
  )
}
export default NewAppointment;