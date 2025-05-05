import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import {columns} from "@/components/table/columns";
import StatCard from '@/components/StatCard';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import {DataTable} from '@/components/table/DataTable';


const Admin =  async() => {

  const appointments = await getRecentAppointmentList();
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className="admin-header">
        <Link href="/" className='cursor-pointer'>
          <Image src="/assets/icons/logo.svg" width={162} height={32} alt='Logo'
            className='h-8 w-fit' />
        </Link>

        <p className='text-16-semibold'> Admin Dashboard</p>
      </header>

      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Welcome 👋</h1>
          <p className='text-dark-700'>Start the day with managing new aappointments</p>
        </section>

        <section className='admin-stat'>
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon="/assets/icons/stat01.svg" />
            <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon="/assets/icons/stat02.svg" />
            <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon="/assets/icons/stat03.svg" />
        </section>

<DataTable columns ={columns} data={appointments.documents}/>


      </main>
    </div>
  )
}

export default Admin;