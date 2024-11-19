import {
  ContactIconProps,
  FooterIconProps,
  HeaderIconProps,
  HeartIconProps,
} from "../interfaces/LandingPage";

export const Email = ({ color }: ContactIconProps) => (
  <svg
    width={30}
    height={30}
    viewBox="0 0 3 0 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.81501 8.75L10.1985 13.6191C12.8358 15.2015 14.1544 15.9927 15.6032 15.9582C17.0519 15.9237 18.3315 15.0707 20.8905 13.3647L27.185 8.75M12.5 25H17.5C22.214 25 24.5711 25 26.0355 23.5355C27.5 22.0711 27.5 19.714 27.5 15C27.5 10.286 27.5 7.92893 26.0355 6.46447C24.5711 5 22.214 5 17.5 5H12.5C7.78595 5 5.42893 5 3.96447 6.46447C2.5 7.92893 2.5 10.286 2.5 15C2.5 19.714 2.5 22.0711 3.96447 23.5355C5.42893 25 7.78595 25 12.5 25Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);

export const Call = ({ color }: ContactIconProps) => (
  <svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.3092 18.3098C22.0157 18.198 21.8689 18.1421 21.7145 18.1287C21.56 18.1154 21.4058 18.1453 21.0975 18.205L17.8126 18.8416C17.4392 18.9139 17.2525 18.9501 17.0616 18.9206C16.8707 18.891 16.7141 18.8058 16.4008 18.6353C13.8644 17.2551 12.1853 15.6617 11.1192 13.3695C10.9964 13.1055 10.935 12.9735 10.9133 12.8017C10.8917 12.6298 10.9218 12.4684 10.982 12.1456L11.6196 8.72559C11.6759 8.42342 11.7041 8.27233 11.6908 8.12115C11.6775 7.96998 11.6234 7.82612 11.5153 7.5384L10.6314 5.18758C10.37 4.49217 10.2392 4.14447 9.95437 3.94723C9.6695 3.75 9.29804 3.75 8.5551 3.75H5.85778C4.58478 3.75 3.58264 4.8018 3.77336 6.06012C4.24735 9.20085 5.64674 14.8966 9.73544 18.9853C14.0295 23.2794 20.2151 25.1426 23.6187 25.884C24.9335 26.1696 26.0993 25.1448 26.0993 23.7985V21.2824C26.0993 20.5428 26.0993 20.173 25.9034 19.8888C25.7076 19.6046 25.362 19.4729 24.6708 19.2096L22.3092 18.3098Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MenuIcon = ({ className }: HeaderIconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16m-7 6h7"
    ></path>
  </svg>
);

export const CloseIcon = ({ className }: HeaderIconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
);

export const Facebook = ({
  color,
  height = "25px",
  width = "25px",
}: FooterIconProps) => {
  return (
    <svg
      fill={color}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width} // Set width dynamically
      height={height} // Set height dynamically
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      stroke={color}
      strokeWidth="0.00512"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g id="7935ec95c421cee6d86eb22ecd11b7e3">
          <path
            style={{ display: "inline" }}
            d="M283.122,122.174c0,5.24,0,22.319,0,46.583h83.424l-9.045,74.367h-74.379 c0,114.688,0,268.375,0,268.375h-98.726c0,0,0-151.653,0-268.375h-51.443v-74.367h51.443c0-29.492,0-50.463,0-56.302 c0-27.82-2.096-41.02,9.725-62.578C205.948,28.32,239.308-0.174,297.007,0.512c57.713,0.711,82.04,6.263,82.04,6.263 l-12.501,79.257c0,0-36.853-9.731-54.942-6.263C293.539,83.238,283.122,94.366,283.122,122.174z"
          ></path>
        </g>
      </g>
    </svg>
  );
};
export const Instagram = ({
  color,
  height = "24px",
  width = "24px",
}: FooterIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width} // Set width dynamically
      height={height} // Set height dynamically
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
          fill={color}
        ></path>
        <path
          d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
          fill={color}
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
          fill={color}
        ></path>
      </g>
    </svg>
  );
};

export const Twitter = ({
  color,
  height = "24px",
  width = "24px",
}: FooterIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={width}
      height={height}
    >
      <path
        d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"
        fill={color}
      ></path>
    </svg>
  );
};
export const Quotes = ({
  height = "64px",
  width = "64px",
  color,
}: FooterIconProps) => {
  return (
    <svg
      fill={color}
      width={width}
      height={height}
      viewBox="0 0 32.00 32.00"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title>quote</title>
        <path d="M9.563 8.469l-0.813-1.25c-5.625 3.781-8.75 8.375-8.75 12.156 0 3.656 2.688 5.375 4.969 5.375 2.875 0 4.906-2.438 4.906-5 0-2.156-1.375-4-3.219-4.688-0.531-0.188-1.031-0.344-1.031-1.25 0-1.156 0.844-2.875 3.938-5.344zM21.969 8.469l-0.813-1.25c-5.563 3.781-8.75 8.375-8.75 12.156 0 3.656 2.75 5.375 5.031 5.375 2.906 0 4.969-2.438 4.969-5 0-2.156-1.406-4-3.313-4.688-0.531-0.188-1-0.344-1-1.25 0-1.156 0.875-2.875 3.875-5.344z"></path>
      </g>
    </svg>
  );
};

export const Google = ({ width = 50, height = 50 }) => (
  <svg
    id="Capa_1"
    style={{}}
    version="1.1"
    viewBox="0 0 150 150"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={width} // Dynamic width based on props
    height={height} // Dynamic height based on props
  >
    <style type="text/css">
      {`
          .st0{fill:#1A73E8;}
          .st1{fill:#EA4335;}
          .st2{fill:#4285F4;}
          .st3{fill:#FBBC04;}
          .st4{fill:#34A853;}
          .st5{fill:#4CAF50;}
          .st6{fill:#1E88E5;}
          .st7{fill:#E53935;}
          .st8{fill:#C62828;}
          .st9{fill:#FBC02D;}
          .st10{fill:#1565C0;}
          .st11{fill:#2E7D32;}
          .st12{fill:#F6B704;}
          .st13{fill:#E54335;}
          .st14{fill:#4280EF;}
          .st15{fill:#34A353;}
          .st16{clip-path:url(#SVGID_2_);}
          .st17{fill:#188038;}
          .st18{opacity:0.2;fill:#FFFFFF;enable-background:new ;}
          .st19{opacity:0.3;fill:#0D652D;enable-background:new ;}
          .st20{clip-path:url(#SVGID_4_);}
          .st21{opacity:0.3;fill:url(#_45_shadow_1_);enable-background:new ;}
          .st22{clip-path:url(#SVGID_6_);}
          .st23{fill:#FA7B17;}
          .st24{opacity:0.3;fill:#174EA6;enable-background:new ;}
          .st25{opacity:0.3;fill:#A50E0E;enable-background:new ;}
          .st26{opacity:0.3;fill:#E37400;enable-background:new ;}
          .st27{fill:url(#Finish_mask_1_);}
          .st28{fill:#FFFFFF;}
          .st29{fill:#0C9D58;}
          .st30{opacity:0.2;fill:#004D40;enable-background:new ;}
          .st31{opacity:0.2;fill:#3E2723;enable-background:new ;}
          .st32{fill:#FFC107;}
          .st33{opacity:0.2;fill:#1A237E;enable-background:new ;}
          .st34{opacity:0.2;}
          .st35{fill:#1A237E;}
          .st36{fill:url(#SVGID_7_);}
          .st37{fill:#FBBC05;}
          .st38{clip-path:url(#SVGID_9_);fill:#E53935;}
          .st39{clip-path:url(#SVGID_11_);fill:#FBC02D;}
          .st40{clip-path:url(#SVGID_13_);fill:#E53935;}
          .st41{clip-path:url(#SVGID_15_);fill:#FBC02D;}
        `}
    </style>
    <g>
      <path
        className="st14"
        d="M120,76.1c0-3.1-0.3-6.3-0.8-9.3H75.9v17.7h24.8c-1,5.7-4.3,10.7-9.2,13.9l14.8,11.5 C115,101.8,120,90,120,76.1L120,76.1z"
      />
      <path
        className="st15"
        d="M75.9,120.9c12.4,0,22.8-4.1,30.4-11.1L91.5,98.4c-4.1,2.8-9.4,4.4-15.6,4.4c-12,0-22.1-8.1-25.8-18.9 L34.9,95.6C42.7,111.1,58.5,120.9,75.9,120.9z"
      />
      <path
        className="st12"
        d="M50.1,83.8c-1.9-5.7-1.9-11.9,0-17.6L34.9,54.4c-6.5,13-6.5,28.3,0,41.2L50.1,83.8z"
      />
      <path
        className="st13"
        d="M75.9,47.3c6.5-0.1,12.9,2.4,17.6,6.9L106.6,41C98.3,33.2,87.3,29,75.9,29.1c-17.4,0-33.2,9.8-41,25.3 l15.2,11.8C53.8,55.3,63.9,47.3,75.9,47.3z"
      />
    </g>
  </svg>
);

export const Heart = ({
  width = 50,
  height = 50,
  color = "#000000",
}: HeartIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HeartFill = ({
  width = 50,
  height = 50,
  color = "#000000",
}: HeartIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const LocationIcon = ({
  width = 50,
  height = 50,
  color = "#000000",
}: HeartIconProps) => (
  <svg
    version="1.0"
    id="Layer_1"
    width={width}
    height={height}
    viewBox="0 0 64 64"
    enable-background="new 0 0 64 64"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24
	C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24
	C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FilterIcon = ({
  width = 50,
  height = 50,
  color = "#000000",
}: HeartIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 3H16V1H0V3Z" fill="#000000" />
    <path d="M2 7H14V5H2V7Z" fill="#000000" />
    <path d="M4 11H12V9H4V11Z" fill="#000000" />
    <path d="M10 15H6V13H10V15Z" fill="#000000" />
  </svg>
);

export const StarFill = ({
  width = 50,
  height = 50,
  color = "#FFFF00",
}: HeartIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      id="Page-1"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g
        id="Icon-Set-Filled"
        transform="translate(-154.000000, -881.000000)"
        fill={color}
      >
        <path
          d="M186,893.244 L174.962,891.56 L170,881 L165.038,891.56 L154,893.244 L161.985,901.42 L160.095,913 L170,907.53 L179.905,913 L178.015,901.42 L186,893.244"
          id="start-favorite"
        ></path>
      </g>
    </g>
  </svg>
);

export const HalfStarFill = ({
  width = 50,
  height = 50,
  color = "#FFFF00",
}: HeartIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 36 36"
    version="1.1"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
  >
    <path d="M34,16.78a2.22,2.22,0,0,0-1.29-4l-9-.34a.23.23,0,0,1-.2-.15L20.4,3.89a2.22,2.22,0,0,0-4.17,0l-3.1,8.43a.23.23,0,0,1-.2.15l-9,.34a2.22,2.22,0,0,0-1.29,4l7.06,5.55a.23.23,0,0,1,.08.24L7.35,31.21a2.22,2.22,0,0,0,3.38,2.45l7.46-5a.22.22,0,0,1,.25,0l7.46,5a2.2,2.2,0,0,0,2.55,0,2.2,2.2,0,0,0,.83-2.4l-2.45-8.64a.22.22,0,0,1,.08-.24ZM24.9,23.11l2.45,8.64A.22.22,0,0,1,27,32l-7.46-5a2.21,2.21,0,0,0-1.24-.38h0V4.44h0a.2.2,0,0,1,.21.15L21.62,13a2.22,2.22,0,0,0,2,1.46l9,.34a.22.22,0,0,1,.13.4l-7.06,5.55A2.21,2.21,0,0,0,24.9,23.11Z"></path>
    <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
  </svg>
);

export const Star = ({
  width = 50,
  height = 50,
  color = "#FFFF00",
}: HeartIconProps) => (
  <svg
  width={width}
  height={height}
    viewBox="0 0 32 32"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      id="Page-1"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g
        id="Icon-Set"
        transform="translate(-152.000000, -879.000000)"
        fill={color}
      >
        <path
          d="M168,903.21 L160.571,907.375 L161.989,898.971 L155.594,892.442 L164.245,891.317 L168,883.313 L171.722,891.317 L180.344,892.54 L174.011,899.002 L175.335,907.406 L168,903.21 L168,903.21 Z M184,891.244 L172.962,889.56 L168,879 L163.038,889.56 L152,891.244 L159.985,899.42 L158.095,911 L168,905.53 L177.905,911 L176.015,899.42 L184,891.244 L184,891.244 Z"
          id="start-favorite"
        ></path>
      </g>
    </g>
  </svg>
);
