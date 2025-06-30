
import React from 'react';
import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDB from '@/db/connectDb';
import User from '@/models/User';
import { checkuser } from '@/actions/useractions';

const Username = async ({ params }) => {

  const userpresent = await checkuser(params.username)


  if (!userpresent) {
    return notFound()
  }
  else {
    return <>
      <PaymentPage params={params} />
    </>

  }


};

export default Username;


export async function  generateMetadata({params}) {
    return{
        title: `${params.username} - Get Me a Chai`
    }
}
