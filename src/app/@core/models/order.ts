declare namespace Order {

  export interface OrderUi {
    id?: string;
    counterParty?: string;
    description?: string;
    currentMilestone?: string;
    updateAt?: number;
    dueAt?: number;
    unread?: boolean;
    favorite?: boolean;
    status?: 'ACTIVE' | 'DELIVERED';
    dueStatus?: 'CLOSE' | 'OVERDUE';
  }

  export interface Template {
    createdBy: string;
    createdDate: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
    id: string;
    name: string;
    template: Order;
  }

  export interface Order {
    id?: string;
    createdBy?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    type?: string;
    description?: string;
    status?: string;
    participants?: Participant[];
    me?: Participant;
    read?: boolean;
    expectedAt?: string;
    draft?: boolean;
    isPublic?: boolean;
    supplierParticipant?: any;
    customerParticipant?: any;
    unread?: boolean;
    mileStones?: Milestone[];
    attachments?: string[];
  }

  export interface Milestone {
    id?: string;
    name?: string;
    startedAt?: string;
    started?: boolean;
    expectedAt?: string;
    finishedAt?: string;
    finished?: boolean;
    assignee?: {
      id?: string,
      name?: string,
      user?: {
        id?: string,
        login?: string,
        firstName?: string,
        lastName?: string,
        imageUrl?: string,
        email?: string,
      },
    };
    location?: {
      name?: string,
      address?: {
        street?: string,
        city?: string,
        region?: string,
        country?: string,
        postalCode?: string,
      },
      point?: {
        latitude?: string,
        longitude?: string,
      },
    };
    overdue?: boolean;
    milestoneAssignments?: {
      [key: string]: {
        canView?: boolean,
        canEdit?: boolean,
      },
    };
    isPublic?: boolean;
  }

  export interface Participant {
    role?: string;
    company?: {
      id?: string,
      name?: string,
    };
    orderId?: string;
  }

  export interface SearchParams {
    term?: string;
    status?: 'Draft' | 'Active' | 'Delivered';
    createdFrom?: string;
    createdTo?: string;
    page?: string;
    size?: string;
    sort?: string;
  }
}
