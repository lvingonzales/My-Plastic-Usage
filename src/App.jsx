import { useCallback, useEffect, useState } from "react";
import "./App.css";
import ColorToggle from "./components/ColorToggle";
import ClipPath from "./components/ClipPath";
import VizImage from "./components/VizImage";
import * as image from "./styles/Image.module.css";
import { motion, AnimatePresence } from "motion/react";
import { useElementOnScreen } from "./components/Hooks";
import Card from "./components/Cards";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.75,
};

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  }, []);

  const [tutorialValues, setTutorialValues] = useState({
    fill: 100,
    color: "purple",
    width: `400px`,
    show: false,
  });

  const [fillValues, setFillValues] = useState({
    bottle: 100,
    hammer: 100,
    face: 100,
    wrench: 100,
    screen: 100,
  });

  const resetValues = () => {
    setFillValues({
      bottle: 100,
      hammer: 100,
      face: 100,
      wrench: 100,
      screen: 100,
    });
  };

  const paragraphs = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.25,
        duration: 0.4,
        type: "spring",
      },
    },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.25,
        type: "spring",
      },
    },
  };

  const itemsByPurpose = () => {
    setFillValues({ bottle: 90, hammer: 66, face: 74, screen: 74, wrench: 96 });
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    show: { opacity: 1, y: 0 },
  };

  const [iconSection, iconsVisible] = useElementOnScreen(options);

  const highlight = (id) => {
    const icons = document.querySelector(".iconList").querySelectorAll("svg");

    icons.forEach((icon) => {
      if (icon.id !== id) {
        icon.style.fill = "var(--font-color)";
      }
    });
  };

  const clearEffect = () => {
    const icons = document.querySelector(".iconList").querySelectorAll("svg");

    icons.forEach((icon) => {
      icon.style.removeProperty("fill");
    });
  };

  const [card, cardVisible] = useElementOnScreen({
    ...options,
    threshold: 0.25,
  });

  useEffect(() => {
    if (cardVisible) {  
      highlight(card.current.dataset.focus);
      console.log("Showing:", card.current)
    } else if (isLoaded && !cardVisible) {
      clearEffect();
    }
  }, [cardVisible]);

  useEffect(() => {
    if (!iconsVisible) {
      resetValues();
    }
  }, [iconsVisible]);

  return (
    <div style={{ position: "relative" }}>
      <ColorToggle />
      <div id="info">
        <div style={{ position: `relative` }}>
          <BottleImage
            classname={`${image.image} ${image.background}`}
            fillColor={tutorialValues.color}
            width={tutorialValues.width}
          />
          <BottleImage
            classname={`${image.image} ${image.foreground}`}
            fillColor={tutorialValues.color}
            fillAmount={tutorialValues.fill}
            width={tutorialValues.width}
          />
        </div>
        <div className="tut-card">
          <motion.p variants={paragraphs} initial="hidden" animate="show">
            This is a mockup for the Fourth Assignment. Similar to my last
            assignment you navigate primarily by scrolling up and down through
            the page. As you scroll messages such as this will appear and some
            of them will contain{" "}
            <em style={{ color: `var(--${tutorialValues.color}-color)` }}>Highlighted</em> words
            which you can hover over for special effects as well as{" "}
            <button
              className="interactable"
              onClick={() =>
                setTutorialValues((prev) => ({ ...prev, show: true }))
              }
            >
              buttons
            </button>{" "}
            that you can click on.
          </motion.p>
          {tutorialValues.show ? (
            <motion.p variants={paragraphs} initial="hidden" animate="show">
              Clicking on Buttons will alter the appearance of messages and or
              visualizations in various ways such as their{" "}
              <button
                className="interactable"
                onClick={() =>
                  setTutorialValues({
                    ...tutorialValues,
                    color: tutorialValues.color === "red" ? "purple" : "red",
                  })
                }
              >
                Color
              </button>
              , their{" "}
              <button
                className="interactable"
                onClick={() =>
                  setTutorialValues({
                    ...tutorialValues,
                    width: tutorialValues.width === "200px" ? "400px" : "200px",
                  })
                }
              >
                Size
              </button>
              , and even the{" "}
              <button
                className="interactable"
                onClick={() =>
                  setTutorialValues({
                    ...tutorialValues,
                    fill: Math.floor(Math.random() * 100),
                  })
                }
              >
                Data
              </button>{" "}
              they show!
            </motion.p>
          ) : null}
        </div>
      </div>
      <div
        className="background-wrapper"
        style={{ position: "sticky" }}
        ref={iconSection}
      >
        <AnimatePresence>
          {iconsVisible ? (
            <motion.ul
              key={"list"}
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="iconList"
              style={{
                display: `flex`,
                gap: `70px`,
                justifyContent: `center`,
                listStyle: `none`,
              }}
            >
              <motion.li variants={item}>
                <VizImage>
                  <BottleImage
                    id={`bottle`}
                    classname={`${image.image} ${image.background}`}
                    fillColor={"red"}
                  />
                  <BottleImage
                    id={`bottle`}
                    classname={`${image.image} ${image.foreground}`}
                    fillColor={"red"}
                    fillAmount={fillValues.bottle}
                  />
                </VizImage>
              </motion.li>
              <motion.li variants={item}>
                <VizImage>
                  <HammerImage
                    id={`hammer`}
                    classname={`${image.image} ${image.background}`}
                    fillColor={"blue"}
                  />
                  <HammerImage
                    id={`hammer`}
                    classname={`${image.image} ${image.foreground}`}
                    fillColor={"blue"}
                    fillAmount={fillValues.hammer}
                  />
                </VizImage>
              </motion.li>
              <motion.li variants={item}>
                <VizImage>
                  <SmileImage
                    id={`face`}
                    classname={`${image.image} ${image.background}`}
                    fillColor={"purple"}
                  />
                  <SmileImage
                    id={`face`}
                    classname={`${image.image} ${image.foreground}`}
                    fillColor={"purple"}
                    fillAmount={fillValues.face}
                  />
                </VizImage>
              </motion.li>
              <motion.li variants={item}>
                <VizImage>
                  <WrenchImage
                    id={`wrench`}
                    classname={`${image.image} ${image.background}`}
                    fillColor={"green"}
                  />
                  <WrenchImage
                    id={`wrench`}
                    classname={`${image.image} ${image.foreground}`}
                    fillColor={"green"}
                    fillAmount={fillValues.wrench}
                  />
                </VizImage>
              </motion.li>
              <motion.li variants={item}>
                <VizImage>
                  <ScreenImage
                    id={`screen`}
                    classname={`${image.image} ${image.background}`}
                    fillColor={"yellow"}
                  />
                  <ScreenImage
                    id={`screen`}
                    classname={`${image.image} ${image.foreground}`}
                    fillColor={"yellow"}
                    fillAmount={fillValues.screen}
                  />
                </VizImage>
              </motion.li>
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </div>
      <div className="foreground-wrapper">
        <Card>
          <p>
            Firstly lets look at the purposes for my plastic usage. These are
            separated into{" "}
            <em
              style={{ color: `var(--red-color)` }}
            >
              Food Consumption
            </em>
            ,{" "}
            <em
              style={{ color: `var(--blue-color)` }}
            >
              Work
            </em>
            ,{" "}
            <em
              style={{ color: `var(--purple-color)` }}
            >
              Personal Comfort
            </em>
            ,{" "}
            <em
              style={{ color: `var(--green-color)` }}
            >
              Maintenance
            </em>
            , and{" "}
            <em
              style={{ color: `var(--yellow-color)` }}
            >
              Entertainment
            </em>
            .{" "}
          </p>
        </Card>
        <Card>
          <p>
            To start with lets look at each purpose's{" "}
            <button className="interactable" onClick={itemsByPurpose}>
              share
            </button>{" "}
            of the total item count.{" "}
          </p>
        </Card>
        <Card reference={card} focus={"hammer"}>
          <p>
            <em style={{ color: `var(--blue-color)` }}>
              Work
            </em>{" "}
            had the highest number of individual plastic items at{" "}
            <em style={{ color: `var(--blue-color)`}}>
              19 out of 57
            </em>{" "}
            accounting for some{" "}
            <em style={{ color: `var(--blue-color)` }}>
              34%
            </em>{" "}
            of the total. These plastics mainly included{" "}
            <em style={{fontSize: "1.5rem"}}>Acrylonitrile Butadiene Styrene</em> or ABS, a common
            recyclable plastic used in electronics.
          </p>
        </Card>
      </div>
    </div>
  );
}

function BottleImage({
  classname,
  fillAmount = 0,
  fillColor,
  width = `200px`,
}) {
  return (
    <svg
      className={classname}
      id="bottle"
      viewBox="0 0 24 24"
      fill={`var(--${fillColor}-color)`}
      style={{
        clipPath: `rect(${fillAmount}% 100% 100% 0%)`,
        width: width,
      }}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        <path
          opacity="0.5"
          d="M16.1557 3.31738L18.3344 4.62987L18.617 8.15786C18.6247 8.25408 18.6286 8.3022 18.6315 8.34785C18.737 10.0069 18.0957 11.6201 16.8963 12.7129C16.8633 12.743 16.8279 12.7741 16.7572 12.8363C16.6885 12.8968 16.6541 12.9271 16.6208 12.9571C15.4234 14.0356 14.576 15.4739 14.1945 17.0755C14.1839 17.12 14.1735 17.1656 14.1528 17.257L13.9018 18.365C13.5684 19.8367 13.4016 20.5725 13.0506 21.0359C12.5153 21.7423 11.6734 22.1191 10.8113 22.0382C10.2458 21.9851 9.6161 21.6057 8.35666 20.847L7.68411 20.4419C6.42467 19.6832 5.79495 19.3039 5.46815 18.8195C4.96988 18.0809 4.86171 17.1317 5.18044 16.2949C5.38948 15.746 5.91688 15.2274 6.97166 14.1903L7.7658 13.4094C7.83127 13.345 7.86401 13.3129 7.89565 13.281C9.03421 12.1355 9.80432 10.6507 10.1008 9.02942C10.109 8.98436 10.117 8.93816 10.1328 8.84574C10.1491 8.75076 10.1572 8.70327 10.1657 8.65842C10.473 7.02824 11.4914 5.64211 12.9212 4.90793C12.9605 4.88772 13.0024 4.86715 13.0861 4.826L16.1557 3.31738Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.8963 12.7126C17.9626 11.741 18.5878 10.3581 18.6393 8.89733L17.0427 9.42951C16.1617 9.72318 15.1919 9.55021 14.4667 8.97007C13.6329 8.30298 12.4872 8.18161 11.5321 8.65917L10.0618 9.39432L10.0207 9.41484C9.67894 10.8853 8.94327 12.2266 7.89565 13.2807C7.86401 13.3125 7.83127 13.3447 7.7658 13.4091L6.97166 14.1899C5.91688 15.227 5.38948 15.7456 5.18044 16.2945C4.86171 17.1314 4.96988 18.0805 5.46815 18.8191C5.79495 19.3035 6.42467 19.6828 7.68411 20.4415L8.35666 20.8467C9.6161 21.6054 10.2458 21.9847 10.8113 22.0378C11.6734 22.1188 12.5153 21.7419 13.0506 21.0355C13.4016 20.5722 13.5684 19.8363 13.9018 18.3646L14.1528 17.2566C14.1735 17.1653 14.1839 17.1196 14.1945 17.0751C14.576 15.4735 15.4234 14.0352 16.6208 12.9567C16.6541 12.9267 16.6885 12.8965 16.7572 12.836C16.8279 12.7737 16.8633 12.7426 16.8963 12.7126Z"
        />
        <path d="M16.1553 3.31715L18.334 4.62964L18.7947 3.79714C18.9274 3.55722 18.9938 3.43725 18.9992 3.3188C19.0039 3.21456 18.9763 3.1114 18.9201 3.02346C18.8563 2.92353 18.7388 2.85278 18.504 2.71129L17.7136 2.23518C17.4626 2.08397 17.3371 2.00836 17.2128 2.00091C17.1036 1.99436 16.9952 2.02339 16.9038 2.08365C16.7999 2.15219 16.7289 2.28039 16.5871 2.5368L16.1553 3.31715Z" />
      </g>
    </svg>
  );
}

function HammerImage({ classname, fillAmount = 0, fillColor }) {
  return (
    <svg
      className={classname}
      viewBox="0 0 512 512"
      id="hammer"
      fill={`var(--${fillColor}-color)`}
      style={{
        clipPath: `rect(${fillAmount}% 100% 100% 0%)`,
      }}
    >
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fillRule="evenodd"
      >
        <g
          id="work-case"
          transform="translate(42.666667, 64.000000)"
        >
          <path
            d="M1.20792265e-13,197.76 C54.5835501,218.995667 112.186031,231.452204 170.666667,234.666667 L170.666667,277.333333 L256,277.333333 L256,234.666667 C314.339546,231.013 371.833936,218.86731 426.666667,198.613333 L426.666667,362.666667 L1.20792265e-13,362.666667 L1.20792265e-13,197.76 Z M277.333333,-1.42108547e-14 L298.666667,21.3333333 L298.666667,64 L426.666667,64 L426.666667,175.146667 C361.254942,199.569074 292.110481,212.488551 222.293333,213.333333 L222.293333,213.333333 L206.933333,213.333333 C136.179047,212.568604 66.119345,199.278929 7.10542736e-15,174.08 L7.10542736e-15,174.08 L7.10542736e-15,64 L128,64 L128,21.3333333 L149.333333,-1.42108547e-14 L277.333333,-1.42108547e-14 Z M256,42.6666667 L170.666667,42.6666667 L170.666667,64 L256,64 L256,42.6666667 Z"
            id="Combined-Shape-Copy"
          ></path>
        </g>
      </g>
    </svg>
  );
}

function SmileImage({ classname, fillAmount = 0, fillColor }) {
  return (
    <svg
      className={classname}
      viewBox="0 0 24 24"
      id="face"
      fill={`var(--${fillColor}-color)`}
      style={{
        clipPath: `rect(${fillAmount}% 100% 100% 0%)`,
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.39747 15.5534C8.64413 15.2206 9.11385 15.1508 9.44661 15.3975C10.175 15.9373 11.0541 16.25 12 16.25C12.9459 16.25 13.825 15.9373 14.5534 15.3975C14.8862 15.1508 15.3559 15.2206 15.6025 15.5534C15.8492 15.8862 15.7794 16.3559 15.4466 16.6025C14.4742 17.3233 13.285 17.75 12 17.75C10.715 17.75 9.5258 17.3233 8.55339 16.6025C8.22062 16.3559 8.15082 15.8862 8.39747 15.5534ZM16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5ZM9 12C9.55228 12 10 11.3284 10 10.5C10 9.67157 9.55228 9 9 9C8.44772 9 8 9.67157 8 10.5C8 11.3284 8.44772 12 9 12Z"
      />
    </svg>
  );
}

function WrenchImage({ classname, fillAmount = 0, fillColor }) {
  return (
    <svg
      className={classname}
      viewBox="0 0 512 512"
      id="wrench"
      fill={`var(--${fillColor}-color)`}
      style={{
        clipPath: `rect(${fillAmount}% 100% 100% 0%)`,
      }}
    >
      <g>
        <path
          d="M104.426,139.813l83.563,83.781c14.344-13.766,26.781-25.703,36.109-34.672l-84.297-84.5l-10.313-45.719
		L54.27,12.985L33.629,33.642L12.988,54.282l45.719,75.219L104.426,139.813z"
        />
        <path
          d="M358.363,276.298L481.926,399.47c22.781,22.766,22.781,59.688,0,82.469c-22.781,22.766-59.688,22.766-82.469,0
		L275.895,358.767L358.363,276.298z"
        />
        <path
          d="M459.957,203.407c42.547-38.609,49.656-82.484,40.141-119.484c-0.281-2.938-0.984-5.406-3.547-7.25
		l-8.563-7.016c-1.484-1.391-3.484-2.063-5.484-1.875c-2.016,0.203-3.844,1.234-5.031,2.875l-49.25,64.031
		c-1.375,1.891-3.594,2.969-5.922,2.891l-17.875,1.313c-1.531-0.047-3.016-0.594-4.219-1.563l-34.531-29.266
		c-1.406-1.141-2.328-2.766-2.563-4.563l-2.141-16.188c-0.25-1.781,0.203-3.594,1.266-5.063l46.109-62.641
		c2.094-2.875,1.688-6.859-0.906-9.281l-11.188-8.75c-2.188-2.031-4.672-1.75-8.063-1.094
		c-31.844,6.281-86.219,37.125-100.016,79.75c-12.156,37.516-7.922,63.969-7.922,63.969c0,21.141-6.953,41.516-15.5,50.063
		L24.504,424.923c-0.469,0.422-0.922,0.859-1.375,1.313c-19.844,19.844-19.813,52.047-0.641,71.219s51.859,19.672,71.703-0.172
		c0.922-0.922,1.813-1.875,2.641-2.859l231.672-250.438C357.004,218.61,413.426,245.642,459.957,203.407z"
        />
      </g>
    </svg>
  );
}

function ScreenImage({ classname, fillAmount = 0, fillColor }) {
  return (
    <svg
      className={classname}
      viewBox="0 0 24 24"
      id="screen"
      fill={`var(--${fillColor}-color)`}
      style={{
        clipPath: `rect(${fillAmount}% 100% 100% 0%)`,
      }}
    >
      <path d="M22 16.0001V12.0001C22 9.17169 22 7.75747 21.1213 6.87879C20.296 6.05349 18.9983 6.00336 16.5 6.00031V21.9999C18.9983 21.9969 20.296 21.9467 21.1213 21.1214C22 20.2428 22 18.8285 22 16.0001ZM19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11ZM19 15C19.5523 15 20 15.4477 20 16C20 16.5523 19.5523 17 19 17C18.4477 17 18 16.5523 18 16C18 15.4477 18.4477 15 19 15Z" />
      <path d="M15.5694 3.48811L13.4163 6.00011H15V22.0001L8 22.0001C5.17157 22.0001 3.75736 22.0001 2.87868 21.1214C2 20.2428 2 18.8285 2 16.0001V12.0001C2 9.17169 2 7.75747 2.87868 6.87879C3.75736 6.00011 5.17157 6.00011 8 6.00011H10.5837L8.43054 3.48811C8.16098 3.17361 8.1974 2.70014 8.51189 2.43057C8.82639 2.16101 9.29986 2.19743 9.56943 2.51192L12 5.34757L14.4305 2.51192C14.7001 2.19743 15.1736 2.161 15.4881 2.43057C15.8026 2.70014 15.839 3.17361 15.5694 3.48811Z" />
    </svg>
  );
}

export default App;
