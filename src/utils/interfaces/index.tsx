export interface ContactFormData {
  senderName: string;
  senderEmail: string;
  message: string;
}
export interface IconInterface {
  color?: string;              // Color for the icon (optional)
  className?: string;              // Color for the icon (optional)
  height?: string | number;    // Height of the icon (optional)
  width?: string | number;     // Width of the icon (optional)
}

export interface ProfileFormData {
  firstName: string
  lastName: string
  sex: string
  dateOfBirth: string
  profileImage: File | null
}
