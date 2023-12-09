export enum UserTypeEnum {
  OWNER,
  CUSTOMER,
}

export type UserType = {
  name: string;
  address?: string;
  shopName: string;
  shopAddress: string;
  type: UserTypeEnum;
  orders: string[];
};
