export interface IUserPost {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface IUserGet {
  _id: string;
  username: string;
  password: string;
  role: string;
}
