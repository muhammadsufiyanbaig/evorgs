import { IconInterface } from "../interfaces";

export const Email = ({ color }: IconInterface) => (
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

export const Call = ({ color }: IconInterface) => (
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

export const Facebook = ({
  color,
  height = "25px",
  width = "25px",
}: IconInterface) => {
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
}: IconInterface) => {
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
}: IconInterface) => {
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
}: IconInterface) => {
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

export const ProfileIcon = ({
  color = "#000000",
  width = 24,
  height = 24,
}: IconInterface) => {
  return (
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
        d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
        fill={color}
      />
    </svg>
  );
};

export const PhoneIcon = ({
  width = "256px",
  height = "256px",
  color = "black",
}: IconInterface) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.6038 12.7268L15.5652 9.08666C15.2572 8.69067 15.1032 8.49267 15.0225 8.27061C14.9511 8.07411 14.9215 7.86486 14.9357 7.65628C14.9518 7.42055 15.045 7.18766 15.2313 6.72187L15.942 4.94513C16.2177 4.25581 16.3556 3.91116 16.5934 3.68525C16.8029 3.48618 17.0656 3.3519 17.3496 3.29856C17.672 3.23803 18.0321 3.32806 18.7524 3.50812L20.7197 4.00002C20.7197 14 13.72 21 3.71973 21L3.2281 19.0324C3.04804 18.3122 2.95801 17.952 3.01854 17.6297C3.07188 17.3456 3.20616 17.083 3.40522 16.8734C3.63113 16.6356 3.97579 16.4977 4.66511 16.222L6.25064 15.5878C6.78204 15.3752 7.04773 15.2689 7.31264 15.2608C7.54678 15.2536 7.77934 15.3013 7.99171 15.4002C8.23199 15.512 8.43434 15.7144 8.83904 16.1191L11.9254 19.1569"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LocationIcon = ({
  width = "256px",
  height = "256px",
  color = "black",
}: IconInterface) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
    >
      <path
        d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const RightArrow = ({
  width = "256px",
  height = "256px",
  color = "black",
}: IconInterface) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12H19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 5L19 12L12 19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const CirclesIcon = ({
  color = "#F97316",
  height = 100,
  width = 100,
}: IconInterface) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1080 1080"
      height={height}
      width={width}
      fill="none"
    >
      <g>
        <g>
          <circle cx="455.34" cy="448.61" r="3.58" fill={color} />
          <circle cx="455.34" cy="471.33" r="3.58" fill={color} />
          <circle cx="455.34" cy="493.46" r="3.58" fill={color} />
          <circle cx="455.34" cy="516.25" r="3.58" fill={color} />
          <circle cx="455.34" cy="538.97" r="3.58" fill={color} />
          <circle cx="455.34" cy="561.09" r="3.58" fill={color} />
          <circle cx="455.34" cy="586.91" r="3.58" fill={color} />
        </g>
        {/* Repeat other circle groups here with `fill={color}` */}
      </g>
    </svg>
  );
};

export const TrianglesIcon = ({
  color = "#F97316",
  height = 100,
  width = 100,
}: IconInterface) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1080 1080"
      height={height}
      width={width}
      fill="none"
    >
      <g>
        <path
          d="M302.19,378.2V509.9h126.83C429.02,509.9,300.37,380.02,302.19,378.2z"
          fill={color}
        />
        <path
          d="M302.19,509.9v131.71h126.83C429.02,641.61,300.37,511.73,302.19,509.9z"
          fill={color}
        />
        <path
          d="M430.8,378.2V509.9h126.83C557.63,509.9,428.97,380.02,430.8,378.2z"
          fill={color}
        />
        <path
          d="M430.8,509.9v131.71h126.83C557.63,641.61,428.97,511.73,430.8,509.9z"
          fill={color}
        />
        {/* Repeat other paths here with `fill={color}` */}
      </g>
    </svg>
  );
};
