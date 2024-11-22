export interface ContactFormData {
  senderName: string;
  senderEmail: string;
  message: string;
}

export interface ContactIconProps {
  color: string;
}

export interface HeaderIconProps {
  className: string;
}
export interface FooterIconProps {
  color: string;
  height?: string; // Optional prop for height
  width?: string;  // Optional prop for width
}
