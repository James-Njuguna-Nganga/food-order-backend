import mongoose, { Schema, Document, Model } from "mongoose";

export interface OrderDoc extends Document {
  orderID: string;
  vandorId: string;
  items: [any];
  totalAmount: number;
  paidThrough: string;
  paymentResponse: string;
  orderDate: Date; //date
 orderStatus: string;// ACCEPT // REJECT // UNDER-PROCESS // READY //waiting //failed

  remarks: string;
  deliveryId: string;
  readyTime: number;
  appliedOffers: boolean;
  offerId: string; //max 60 mins
}

const OrderSchema = new Schema(
  {
    orderID: { type: String, require: true },
    vandorId: { type: String, require: true },
    items: [
      {
        food: { type: Schema.Types.ObjectId, ref: "food", require: true },
        unit: { type: Number, require: true },
      },
    ],
    totalAmount: { type: Number, require: true },
    paidAmount: { type: Number, require: true },
    orderDate: { type: Date },
    orderStatus: { type: String },
    remarks: { type: String },
    deliveryId: { type: String },
    readyTime: { type: Number },
    appliedOffers: { type: Boolean },
    offerId: { type: String }
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Order = mongoose.model<OrderDoc>("order", OrderSchema);

export { Order };