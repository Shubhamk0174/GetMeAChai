import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payments from "@/models/Payments";
import connectDB from "@/db/connectDb";


export const POST = async (req) => {
    await connectDB();
    let body = await req.formData()
    body = Object.fromEntries(body);

    // check if razorpay order id is present in the server
    let p = await Payments.findOne({ oid: body.razorpay_order_id })

    if (!p) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });  
    }


    //verify the payment
    const xx = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature , process.env.RAZORPAY_KEY_SECRET);

    if (xx) {
        // update the payment status in the database
        const updatedPayment = await Payments.findOneAndUpdate(
            { oid: body.razorpay_order_id },
            { done: true },
            { new: true }
        );
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)

    }

    else {
        return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }




}
