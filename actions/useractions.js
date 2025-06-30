"use server";

import Razorpay from 'razorpay';
import Payment from '@/models/Payments';
import connectDB from '@/db/connectDb';
import User from '@/models/User';

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();

  const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: Number.parseInt(amount) * 100, // in paisa
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  // Optional: Prevent duplicate creation
  const existing = await Payment.findOne({ oid: order.id });
  if (!existing) {
    await Payment.create({
      oid: order.id,
      amount: amount,
      to_user: to_username,
      name: paymentform.name,
      message: paymentform.message,
    });
  }

  return order;
};

export const fetchuser = async (username) => {
  await connectDB();
  const u = await User.findOne({ username });

  if (u) {
    const user = u.toObject({ flattenObjectIds: true }); // no need to await
    return user;
  }

  return { error: "User not found" };
};

export const fetchpayments = async (username) => {
  await connectDB();

  const p = await Payment.find({ to_user: username, done: true })
    .sort({ createdAt: -1 })
    .lean();

  const payments = p.map((item) => ({
    ...item,
    _id: item._id.toString(),
    createdAt: item.createdAt?.toString(),
    updatedAt: item.updatedAt?.toString(),
  }));

  return payments;
};

export const updateprofile = async (data, oldusername) => {
  await connectDB();

  if (oldusername !== data.username) {
    const existing = await User.findOne({ username: data.username });
    if (existing) {
      return { error: "Username already exists" };
    }

    await User.updateOne({ email: data.email }, data);
    await Payment.updateMany({ to_user: oldusername }, { to_user: data.username });
  } else {
    await User.updateOne({ email: data.email }, data);
  }

  return { success: true };
};

export const checkuser = async (paramusername) => {
  await connectDB();
  const u = await User.findOne({ username: paramusername });
  return !!u;
};
