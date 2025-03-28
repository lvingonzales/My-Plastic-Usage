import * as image from "../styles/Image.module.css";

function VizImage({children}) {
  const {fillColor: color, fillAmount: amount} = children[1].props
  return (
    <div style={{position: `relative`}}>
      <div className={image.imageWrapper}>
        {children}
      </div>
      <div className="amount" style={{backgroundColor: `var(--font-color)`, opacity: 0.5}}>
        <p style={{color: `var(--bg-color)`}}>{100 - amount}%</p>
      </div>
    </div>
  );
}



export default VizImage;
