import * as image from "../styles/Image.module.css";

function Case({ fillAmount, fillColor, size }) {
  return (
    <div style={{ position: `relative` }}>
      <div className={image.imageWrapper}>
        <svg
          className={image.image + " " + image.background}
          viewBox="0 0 512 512"
          id="case"
          fill="none"
          stroke={`var(--${fillColor}-color)`}
          strokeWidth={"10px"}
          style={{
          }}
        >
          <path style={{transformOrigin: "center", transform: "translate(50%, 50%)"}}
            d="M1.20792265e-13,197.76 C54.5835501,218.995667 112.186031,231.452204 170.666667,234.666667 L170.666667,277.333333 L256,277.333333 L256,234.666667 C314.339546,231.013 371.833936,218.86731 426.666667,198.613333 L426.666667,362.666667 L1.20792265e-13,362.666667 L1.20792265e-13,197.76 Z M277.333333,-1.42108547e-14 L298.666667,21.3333333 L298.666667,64 L426.666667,64 L426.666667,175.146667 C361.254942,199.569074 292.110481,212.488551 222.293333,213.333333 L222.293333,213.333333 L206.933333,213.333333 C136.179047,212.568604 66.119345,199.278929 7.10542736e-15,174.08 L7.10542736e-15,174.08 L7.10542736e-15,64 L128,64 L128,21.3333333 L149.333333,-1.42108547e-14 L277.333333,-1.42108547e-14 Z M256,42.6666667 L170.666667,42.6666667 L170.666667,64 L256,64 L256,42.6666667 Z"
            id="Combined-Shape-Copy"
          ></path>
        </svg>
        <svg
          className={image.image + " " + image.foreground}
          id="case"
          viewBox="0 0 512 512"
          fill={`var(--${fillColor}-color)`}
          stroke="none"
          
          style={{
            clipPath: `rect(${fillAmount}% 100% 100% 0%)`,
          }}
        >
          <path transform="translate(50%, 50%)"
            d="M1.20792265e-13,197.76 C54.5835501,218.995667 112.186031,231.452204 170.666667,234.666667 L170.666667,277.333333 L256,277.333333 L256,234.666667 C314.339546,231.013 371.833936,218.86731 426.666667,198.613333 L426.666667,362.666667 L1.20792265e-13,362.666667 L1.20792265e-13,197.76 Z M277.333333,-1.42108547e-14 L298.666667,21.3333333 L298.666667,64 L426.666667,64 L426.666667,175.146667 C361.254942,199.569074 292.110481,212.488551 222.293333,213.333333 L222.293333,213.333333 L206.933333,213.333333 C136.179047,212.568604 66.119345,199.278929 7.10542736e-15,174.08 L7.10542736e-15,174.08 L7.10542736e-15,64 L128,64 L128,21.3333333 L149.333333,-1.42108547e-14 L277.333333,-1.42108547e-14 Z M256,42.6666667 L170.666667,42.6666667 L170.666667,64 L256,64 L256,42.6666667 Z"
            id="Combined-Shape-Copy"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Case;
