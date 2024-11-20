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

export interface HeartIconProps {
  color?: string;
  height?: number; // Optional prop for height
  width?: number;  // Optional prop for width
}


