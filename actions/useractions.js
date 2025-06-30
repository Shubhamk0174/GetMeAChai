"use server"

import Razorpay from 'razorpay';
import Payment from '@/models/Payments';
import connectDB from '@/db/connectDb';
import User from '@/models/User';
import payments from '@/models/Payments';

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB();
    var instanece = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })



    let options = {
        amount: Number.parseInt(amount) * 100, // amount in the smallest currency unit
        currency: "INR",
    }

    let x = await instanece.orders.create(options);


    // create a new payment object which shows a pending payment in the database
    await payments.create({ oid: x.id, amount: amount, to_user: to_username, name: paymentform.name, message: paymentform.message });

    return x;

}


export const fetchuser = async (username) => {
    await connectDB();
    const u = await User.findOne({ username: username })

    if (u) {

        let user = await u.toObject({ flattenObjectIds: true });
        return user;
    }
    return { error: "User not found" }
}

export const fetchpayments = async (username) => {
    await connectDB();
    // find all payments sorted by decreaseing amount
    const p = await Payment.find({ to_user: username, done: true }).sort({ createdAt: -1 }).lean()
    const payments = p.map(item => ({
        ...item,
        _id: item._id.toString(),
        createdAt: item.createdAt?.toString(),
        updatedAt: item.updatedAt?.toString(),
    }));

    return payments;
}


export const updateprofile = async (data, oldusername) => {
    await connectDB();
    let ndata = data;
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }
        await User.updateOne({ email: ndata.email }, ndata);
        await payments.updateMany({ to_user: oldusername }, { to_user: ndata.username })
    }
    else {
        await User.updateOne({ email: ndata.email }, ndata);

    }

}

export const checkuser = async (paramusername) => {
    await connectDB();
    
    
    let u = await User.findOne({ username: paramusername });

    return !!u;  // returns true or false
};