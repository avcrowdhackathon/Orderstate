declare module Order {
  export interface Comment {
      createdBy?: any;
      createdDate: Date;
      lastModifiedBy?: any;
      lastModifiedDate: Date;
      id: string;
      orderId: string;
      user: Network.User;
      company: Network.Company;
      text: string;
      read: boolean;
  }
}

