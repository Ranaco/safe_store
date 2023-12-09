export type User = {
  name: string;
  address?: string;
  nameOfBusines: string;
  address: string;
  type: "Customer" | "Owner";
  orders: number;
};
