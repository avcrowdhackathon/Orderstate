declare module Order {
  export interface Event {
    source: any;
    timestamp: any;
    type: string;
    createdAt: Date;
    company: Network.Company;
    user: Network.User;
    orderId: string;
  }
}
