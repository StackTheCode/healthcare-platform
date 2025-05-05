import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAppointment } from '@/lib/actions/appointment.actions';
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';
// http://localhost:3000/patients/680d0daf0006efa25d31/new-appointment/success?appointmentId=680d17800015aaa4ab9f
const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || '';
    const appointment = await getAppointment(appointmentId)

    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician)
    return (
        <div className='flex h-screen max-h-screen px-[5%]'>
            <div className="success-img">
                <Link href="/">
                    <Image src="/assets/icons/logo.svg" alt="Logo"
                        height={1000} width={1000} className='h-10 w-fit' />

                </Link>
                <section className='flex flex-col items-center'>
                    <Image
                        src="/assets/gifs/success.gif" height={300} width={280}
                        alt='success' />

                    <h2 className='header mb-6 max-w-[600px] text-center'>
                        Your <span className='text-green-500'>appointment request </span>
                        has been successfully submitted!
                    </h2>
                    <p className='text-gray-400'>We'll be in touch shortly to confirm</p>
                </section>
                <section className="request-details">
                    <p>Requested appointment details:</p>
                    <div className='flex flex-row items-center gap-3'>
                        <Image
                            src={doctor?.image!}
                            alt='Doctor' width={250} height={250} className='h-10 w-10' />
                        <p>Dr {doctor?.name}</p>

                    </div>
                    <div className='flex gap-2'>
                        <Image src="/assets/icons/calendar.svg" width={50} height={50} alt='calendar' className='h-5 w-5' />
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>
                <Button variant="outline" className='shad-primary-btn' asChild>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New Appointment</Link>
                </Button>

                <p className='copyright'> @2025 CarePulse</p>
            </div>
        </div>
    )
}

export default Success