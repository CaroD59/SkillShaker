export default interface UserInterface {
  id: number;
  email: string;
  phoneNumber: string;
  useridentifier: string;
  roles: Array<string>;
  community: string;
  image: string;
  firstname: string;
  isVerified: boolean;
  description: string;
  count: number;
}
