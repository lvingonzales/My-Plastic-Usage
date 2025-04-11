import { useCallback, useEffect, useState } from "react";
import "./App.css";
import ColorToggle from "./components/ColorToggle";
import ClipPath from "./components/ClipPath";
import VizImage from "./components/VizImage";
import * as image from "./styles/Image.module.css";
import { motion, AnimatePresence } from "motion/react";
import { useElementOnScreen } from "./components/Hooks";
import Card from "./components/Cards";
import Bottle from "./components/Bottle";
import Wrench from "./components/Wrench";
import Case from "./components/Case";
import Pie from "./components/Pie";
import { option } from "motion/react-client";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

function App() {
  const myData = [
    { name: "recyclable", value: 47 },
    { name: "non-recyclable", value: 10 },
  ];

  const worldData = [
    { name: "recycled", value: 9 },
    { name: "other disposal methods", value: 90 },
  ];
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

  const itemsByRecy = () => {
    setFillValues({ bottle: 50, hammer: 11, face: 27, screen: 0, wrench: 50 });
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
    if (!iconsVisible) {
      return;
    }
    const icons = document.querySelectorAll("svg");
    icons.forEach((icon) => {
      icon.style.removeProperty("fill");
    });
  };

  const [card, cardVisible] = useElementOnScreen({
    ...options,
    threshold: 1,
  });

  const [enter, entVisible] = useElementOnScreen({
    ...options,
    threshold: 1,
  });

  const [enter2, ent2Visible] = useElementOnScreen({
    ...options,
    threshold: 1,
  });

  const [fnm, fnmVisible] = useElementOnScreen({
    ...options,
    threshold: 1,
  });

  const [recy, recyVisible] = useElementOnScreen({
    ...options,
    threshold: 1,
  })

  useEffect(() => {
    if (fnmVisible) {
      const icons = document.querySelector(".iconList").querySelectorAll("svg");

      icons.forEach((icon) => {
        if (icon.id !== "wrench" && icon.id !== "bottle") {
          icon.style.fill = "var(--font-color)";
        }
      });
    } else if (isLoaded && !fnmVisible) {
      clearEffect();
    }
  }, [fnmVisible]);

  useEffect(() => {
    const charts = document.querySelectorAll(".pieChart");
    if(recyVisible) {
      charts.forEach(chart => {
        const paths = chart.querySelectorAll("path");
        paths.forEach(path => {
          if(path.id !== "recyclable" && path.id !== "recycled") {
            path.style.fill = "var(--font-color)"
            path.style.opacity = 0.1;
          }
        })
      })
    } else if (isLoaded && !recyVisible) {
      charts.forEach(chart => {
        const paths = chart.querySelectorAll("path");
        paths.forEach(path => {
          path.style.removeProperty("fill");
          path.style.removeProperty("opacity");
        })
      })
    }
  }, [recyVisible])

  useEffect(() => {
    if (cardVisible) {
      highlight(card.current.dataset.focus);
    } else if (isLoaded && !cardVisible) {
      clearEffect();
    }
  }, [cardVisible]);

  useEffect(() => {
    if (entVisible) {
      highlight(enter.current.dataset.focus);
    } else if (isLoaded && !entVisible) {
      clearEffect();
    }
  }, [entVisible]);

  useEffect(() => {
    if (ent2Visible) {
      highlight(enter2.current.dataset.focus);
    } else if (isLoaded && !ent2Visible) {
      clearEffect();
    }
  }, [ent2Visible]);

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
            <em style={{ color: `var(--${tutorialValues.color}-color)` }}>
              Highlighted
            </em>{" "}
            words which you can hover over for special effects as well as{" "}
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
      <div className="section">
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
              <em style={{ color: `var(--red-color)` }}>Food Consumption</em>,{" "}
              <em style={{ color: `var(--blue-color)` }}>Work</em>,{" "}
              <em style={{ color: `var(--purple-color)` }}>Personal Comfort</em>
              , <em style={{ color: `var(--green-color)` }}>Maintenance</em>,
              and{" "}
              <em style={{ color: `var(--yellow-color)` }}>Entertainment</em>.{" "}
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
              <em style={{ color: `var(--blue-color)` }}>Work</em> had the
              highest number of individual plastic items at{" "}
              <em style={{ color: `var(--blue-color)` }}>19 out of 57</em>{" "}
              accounting for some{" "}
              <em style={{ color: `var(--blue-color)` }}>34%</em> of the total.
              These plastics mainly included{" "}
              <em style={{ fontSize: "1.5rem" }}>
                Acrylonitrile Butadiene Styrene
              </em>{" "}
              or ABS, a common recyclable plastic used in electronics.
            </p>
          </Card>
          <Card reference={enter} focus={"screen"}>
            <p>
              The{" "}
              <em style={{ color: `var(--yellow-color)` }}>entertainment</em>{" "}
              field was also dominated by{" "}
              <em style={{ color: `var(--yellow-color)` }}>ABS</em> plastics
              with <em style={{ color: `var(--yellow-color)` }}>8 of its 15</em>{" "}
              items being made of the material.
            </p>
          </Card>
          <Card>
            <p>
              But what about its{" "}
              <button className="interactable" onClick={itemsByRecy}>
                recyclability
              </button>
              ? Each item was deemed recyclable or not based on the type of{" "}
              plastic used.
            </p>
          </Card>
          <Card reference={enter2} focus={"screen"}>
            <p>
              The plastics I used for{" "}
              <em style={{ color: `var(--yellow-color)` }}>entertainment</em>{" "}
              were{" "}
              <em style={{ color: `var(--yellow-color)` }}>all recyclable</em>,
              of the 5 categories only{" "}
              <em style={{ color: `var(--yellow-color)` }}>entertainment</em>{" "}
              was able to achieve this.
            </p>
          </Card>
          <Card reference={fnm}>
            <p>
              Don't be fooled by{" "}
              <em style={{ color: `var(--green-color)` }}>Maintenance</em> and{" "}
              <em style={{ color: `var(--red-color)` }}>Food Consumption's</em>{" "}
              50% ratios, these were the categories with the least items,{" "}
              <em style={{ color: `var(--green-color)` }}>6</em> and{" "}
              <em style={{ color: `var(--red-color)` }}>2</em> respectively.
            </p>
          </Card>
        </div>
      </div>

      <div className="section">
        <div className="background-wrapper" style={{ position: "sticky" }}>
          <Pie data={myData} title={"Personal Data"} titleColor={"green"} />
          <Pie data={worldData} title={"Global Data"} titleColor={"purple"} />
        </div>
        <div className="foreground-wrapper">
          <Card>
            <p>
              Lets see how <em style={{ color: `var(--green-color)` }}>my</em>{" "}
              <em style={{ color: `var(--red-color)` }}>recyclable</em> vs{" "}
              <em style={{ color: `var(--blue-color)` }}>non-recyclable</em>{" "}
              plastic use measured up against the rest of the{" "}
              <em style={{ color: `var(--purple-color)` }}>world</em>.
            </p>
          </Card>
          <Card reference={recy}>
            <em style={{ color: `var(--red-color)` }}>82%</em> of{" "}
            <em style={{ color: `var(--green-color)` }}>my</em> plastic usage is{" "}
            recyclable however in stark contrast, on a{" "}
            <em style={{ color: `var(--purple-color)` }}>global</em> scale, only{" "}
            <em style={{ color: `var(--red-color)` }}>9%</em> of plastic waste{" "}
            is recycled. The rest is both intentionally and unintentionally{" "}
            disposed of in various ways such as incineration and landfill as{" "}
            well as through mismanagement.
          </Card>
        </div>
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
      viewBox="0 0 50 50"
      fill={`var(--${fillColor}-color)`}
    >
      <path
        style={{
          clipPath: `rect(${fillAmount}% 100% 100% 0%)`,
        }}
        d="M22 0C20.347656 0 19 1.347656 19 3L19 5C19 6.160156 19.839844 7 21 7C21 7.640625 20.640625 8.101563 20 8.21875C15.296875 9.25 12 13.3125 12 18.09375L12 20.125C12 21.429688 12.835938 22.554688 14 22.96875L14 37.0625C12.835938 37.476563 12 38.601563 12 39.90625L12 45C12 47.757813 14.242188 50 17 50L33 50C35.757813 50 38 47.757813 38 45L38 39.90625C38 38.601563 37.164063 37.476563 36 37.0625L36 37L16 37L16 35L36 35L36 25L16 25L16 23L36 23L36 22.96875C37.164063 22.554688 38 21.429688 38 20.125L38 18.09375C38 13.3125 34.707031 9.257813 29.96875 8.21875C29.363281 8.109375 29 7.640625 29 7C30.160156 7 31 6.160156 31 5L31 3C31 1.347656 29.652344 0 28 0Z"
      />
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
    >
      <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
        <g id="work-case" transform="translate(42.666667, 64.000000)">
          <path
            style={{
              clipPath: `rect(${fillAmount}% 100% 100% 0%)`,
            }}
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
    >
      <path
        style={{
          clipPath: `rect(${fillAmount}% 100% 100% 0%)`,
        }}
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
      viewBox="0 0 24 24"
      id="wrench"
      fill={`var(--${fillColor}-color)`}
    >
      <path
        style={{
          clipPath: `rect(${fillAmount}% 100% 100% 0%)`,
        }}
        d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.75,14.59L16.5,17.84a.54.54,0,0,1-.76,0l-5-4.95A3.54,3.54,0,0,1,6.34,8.06l2.39,2.33,1.63-1.63L8,6.43a3.6,3.6,0,0,1,4,.7,3.49,3.49,0,0,1,.82,3.75l4.94,4.95A.49.49,0,0,1,17.75,16.59Z"
      />
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
