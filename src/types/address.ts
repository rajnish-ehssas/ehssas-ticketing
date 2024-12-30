export interface AddressFormData {
  email: string;
  password: string;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof AddressFormData]?: string[];
  };
}

export interface ActionResponseAuth {
  login: boolean;
  message: string;
  errors?: {
    [K in keyof AddressFormData]?: string[];
  };
}