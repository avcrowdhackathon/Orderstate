declare module Order {

  export interface Documents {
    resources: Document[];
    permissions: Permission[];
    meta: Meta;
    pages?: any;
  }

  export interface Document {
    attributes: Attributes;
    permissions: Permission[];
  }

  export interface Attributes {
    id: string;
    name: string;
    type: string;
    format: string;
    size: number;
    createdDate: Date;
    createdBy: string;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    url: string;
  }

  export interface Permission {
    action: string;
    status: 'ok';
  }

  export interface Meta {
    ctx: string;
  }
}
