export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      Plazo: {
        Row: {
          createdAt: string;
          endDate: string;
          id: string;
          startDate: string;
          title: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          endDate: string;
          id?: string;
          startDate: string;
          title: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          endDate?: string;
          id?: string;
          startDate?: string;
          title?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Plazo_userId_fkey';
            columns: ['userId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
