export interface AllData {
  total: string;
  data: [
    {
      id: string;
      // name?: string;
      // categoryName?: string;
      // latitude?: number;
      // longitude?: number;
      // description?: string;
    }
  ];
}
export interface AllArray {
  id: string;
  name?: string;
  categoryName?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  actionType?: string;
  type?: string;
  apiAddress?: string;
  seq?: string;
  enableStatus?: string;
  baseUrl?: string;
  version?: string;
  contributorType?: string;
  diagnosticType?: string;
  createdAt?: string;
  updatedAt?: string;
}
