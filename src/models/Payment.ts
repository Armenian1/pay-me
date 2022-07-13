/* Represents a payment item */
export default interface Payment {
  // Figure out what's going on with Payment ID.
  // paymentId: number;
  name: string;
  amount: number;
  description: string;
  notes: string;
  date: string;
}
