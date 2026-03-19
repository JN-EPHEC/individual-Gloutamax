// Interfaces pour regroupe les données (DTOs)
export interface UserDTO {
  firstName: string; 
  lastName: string; 
  email: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  country: string;
}

export interface ProductDTO {
  id: number;
  name: string; 
  price: number; 
  stock: number;
}

export interface OrderRequestDTO {
  user: UserDTO;
  product: ProductDTO;
  quantity: number;
  discountCode: string;
}