export interface SessionPayload {
    userId: string;
    // email: string;
    roles: string[];
    expiresAt: Date; // Might be a string for JWT compatibility
  }
  
  export interface UserData {
    isAuthenticated: boolean;
    isAdmin?: boolean;
    isClient?: boolean;
    email?: string;  // Optional, as `resData?.user?.email` might be undefined
    userId?: string; // Optional, as `resData?.user?._id` might be undefined
  }