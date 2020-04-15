// tslint:disable-next-line: no-namespace
declare namespace Network {

  export interface Account {
    id: string;
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    imageId: string;
    imageUrl: string;
    activated: boolean;
    langKey: string;
    company: {
      id: string
      name: string,
    };
    createdBy: string;
    createdDate: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
    authorities: string[];
    members: { company: { id: string, name: string }, role: string };
  }

  export interface NetworkResp {
    entries: Entry[];
  }

  export interface Company {
    id?: string;
    name?: string;
    members?: any[];
    locations?: any[];
  }

  export interface User {
    id?: string;
    login?: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    email?: string;
  }

  export interface Invitee {
    company: Company;
    user: User;
    role: string;
  }

  export interface Inviter {
    company: Company;
    user: User;
    role: string;
  }

  export interface Invitation {
    createdBy: string;
    createdDate: Date;
    lastModifiedBy?: any;
    lastModifiedDate: Date;
    id: string;
    token: string;
    active: boolean;
    invitee: Invitee;
    inviter: Inviter;
    acceptedDate?: any;
  }

  export interface Entry {
    company: Company;
    invitation: Invitation;
  }
}

