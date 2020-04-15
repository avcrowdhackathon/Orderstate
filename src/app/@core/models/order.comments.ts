// tslint:disable-next-line: no-namespace
declare namespace Order {
  export interface Comment {
    id?: string;
    createdBy?: any;
    createdDate?: Date;
    lastModifiedBy?: any;
    lastModifiedDate?: Date;
    orderId?: string;
    user?: Network.User;
    company?: Network.Company;
    text?: string;
    read?: boolean;
  }
}

