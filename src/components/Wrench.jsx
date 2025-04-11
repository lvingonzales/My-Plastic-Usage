import * as image from "../styles/Image.module.css";

function Wrench({ fillAmount, fillColor, size }) {
  return (
    <div style={{ position: `relative` }}>
      <div className={image.imageWrapper}>
        <svg
          className={image.image + " " + image.background}
          id="wrench"
          viewBox="0 0 24 24"
          fill="none"
          stroke={`var(--${fillColor}-color)`}
          strokeLinecap="round"
          width={size}
          style={{
            width: size,
          }}
        >
          <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.75,14.59L16.5,17.84a.54.54,0,0,1-.76,0l-5-4.95A3.54,3.54,0,0,1,6.34,8.06l2.39,2.33,1.63-1.63L8,6.43a3.6,3.6,0,0,1,4,.7,3.49,3.49,0,0,1,.82,3.75l4.94,4.95A.49.49,0,0,1,17.75,16.59Z" />
        </svg>
        <svg
          className={image.image + " " + image.foreground}
          id="wrench"
          viewBox="0 0 24 24"
          fill={`var(--${fillColor}-color)`}
          stroke="none"
          width={size}
          style={{
            clipPath: `rect(${fillAmount}% 100% 100% 0%)`,
            width: size,
          }}
        >
          <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.75,14.59L16.5,17.84a.54.54,0,0,1-.76,0l-5-4.95A3.54,3.54,0,0,1,6.34,8.06l2.39,2.33,1.63-1.63L8,6.43a3.6,3.6,0,0,1,4,.7,3.49,3.49,0,0,1,.82,3.75l4.94,4.95A.49.49,0,0,1,17.75,16.59Z" />
        </svg>
      </div>
    </div>
  );
}

export default Wrench;
