
export interface SearchModel {
    email?: string;
    orderBy?: string;
    direction?: Direction;
    page?: number;
    pageSize?: number;
  }

  export type Direction = 'asc' | 'desc' | null | undefined;
