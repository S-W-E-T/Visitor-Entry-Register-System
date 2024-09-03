export interface User {
  _id: string;
  photoUrl?: string;
  name: string;
  phoneNumber: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface Access {
  _id: string;
  userId: string;
  role: Role;
  accessApproved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
