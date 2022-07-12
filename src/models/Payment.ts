/* Represents a payment item */
export default interface Payment {
  paymentId: number;
  name: string;
  amount: number;
  description: string;
  notes: string;
  date: string;
}
