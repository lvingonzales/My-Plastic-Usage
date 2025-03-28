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

  const [card, cardVisible] = useElementOnScreen(options);

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

  useEffect(() => {
    if (!cardVisible) {
      resetValues();
    }
  }, [cardVisible]);

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
            <em style={{ color: `var(--blue-color)` }}>Highlighted</em> words
            which you can hover over for special effects as well as{" "}
            <button
              className="interactable"
              onClick={() =>
                setTutorialValues((prev) => ({ ...prev, show: true }))
              }
            >
              buttons
            </button>
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
        ref={card}
      >
        <AnimatePresence>
          {cardVisible ? (
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
            Firstly lets look at The purpose for my plastic usage. These are
            separated into{" "}
            <em
              style={{ color: `var(--red-color)` }}
              onMouseOver={() => highlight("bottle")}
              onMouseLeave={() => clearEffect()}
            >
              Food Consumption
            </em>
            ,{" "}
            <em
              style={{ color: `var(--blue-color)` }}
              onMouseOver={() => highlight("hammer")}
              onMouseLeave={() => clearEffect()}
            >
              Work
            </em>
            ,{" "}
            <em
              style={{ color: `var(--purple-color)` }}
              onMouseOver={() => highlight("face")}
              onMouseLeave={() => clearEffect()}
            >
              Personal Comfort
            </em>
            ,{" "}
            <em
              style={{ color: `var(--green-color)` }}
              onMouseOver={() => highlight("wrench")}
              onMouseLeave={() => clearEffect()}
            >
              Maintenance
            </em>
            , and{" "}
            <em
              style={{ color: `var(--yellow-color)` }}
              onMouseOver={() => highlight("screen")}
              onMouseLeave={() => clearEffect()}
            >
              Entertainment
            </em>
            .{" "}
          </p>
        </Card>
        <Card>
          <p>
            To start with lets look at Each purpose's{" "}
            <button className="interactable" onClick={itemsByPurpose}>
              share
            </button>{" "}
            of the total item count.{" "}
          </p>
        </Card>
        <Card>
          <p>
            <em
              style={{ color: `var(--blue-color)` }}
              onMouseOver={() => highlight("hammer")}
              onMouseLeave={() => clearEffect()}
            >
              Work
            </em>{" "}
            had the highest number of individual plastic items at{" "}
            <em>19 out of 57</em> totalling some 34% of the total. These
            plastics mainly included <em>High Density Polyethylene</em> or HDPE,
            a common food safe recyclable plastic (more on this later).
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
      viewBox="0 0 307.09 307.09"
      fill={`var(--${fillColor}-color)`}
      style={{
        clipPath: `rect(${fillAmount}% 100% 100% 0%)`,
        width: width,
      }}
    >
      <path
        d="M213.746,93.01l-33.494-51.965c1.3-1.101,2.128-2.742,2.128-4.579V6c0-3.313-2.687-6-6-6h-45.671c-3.314,0-6,2.687-6,6
	v30.466c0,1.837,0.828,3.479,2.129,4.58L93.344,93.01c-0.624,0.97-0.956,2.098-0.956,3.251v45.536v70.228v70.679
	c0,13.447,10.938,24.387,24.384,24.387c7.328,0,13.913-3.25,18.387-8.383c4.474,5.133,11.059,8.383,18.387,8.383
	c7.328,0,13.913-3.25,18.387-8.383c4.474,5.133,11.059,8.383,18.387,8.383c13.445,0,24.384-10.94,24.384-24.387v-70.679v-70.228
	V96.261C214.702,95.107,214.37,93.979,213.746,93.01z M136.708,12h33.671v18.466h-0.217h-33.234h-0.22V12z M140.199,42.466h26.692
	l35.811,55.56v37.771h-98.314V98.026L140.199,42.466z M202.702,206.024h-98.314v-58.228h98.314V206.024z M190.318,295.09
	c-6.83,0-12.387-5.557-12.387-12.387c0-3.314-2.686-6-6-6c-3.313,0-6,2.686-6,6c0,6.83-5.557,12.387-12.387,12.387
	c-6.83,0-12.387-5.557-12.387-12.387c0-3.314-2.687-6-6-6c-3.314,0-6,2.686-6,6c0,6.83-5.557,12.387-12.387,12.387
	c-6.829,0-12.384-5.557-12.384-12.387v-64.679h98.314v64.679C202.702,289.533,197.147,295.09,190.318,295.09z"
      />
    </svg>
  );
}

function HammerImage({ classname, fillAmount = 0, fillColor }) {
  return (
    <svg
      className={classname}
      viewBox="0 0 60.705 60.705"
      id="hammer"
      fill={`var(--${fillColor}-color)`}
      style={{
        clipPath: `rect(${fillAmount}% 100% 100% 0%)`,
      }}
    >
      <path
        d="M41.621,5.882c-2.965-1.306-6.748-1.941-11.565-1.941h-6.87v-1.58C23.185,1.056,22.127,0,20.824,0h-9.571
		C9.949,0,8.892,1.058,8.892,2.361v20.622c0,1.304,1.058,2.36,2.361,2.36h9.571c1.304,0,2.361-1.057,2.361-2.36v-1.279h0.914V29.7
		h-1.935c-1.304,0-2.361,1.057-2.361,2.36v26.283c0,1.305,1.058,2.361,2.361,2.361h16.376c1.306,0,2.361-1.059,2.361-2.361V32.061
		c0-1.304-1.059-2.357-2.361-2.357h-1.936v-7.931c3.195,0.188,6.365,0.998,11.229,5.563c0.447,0.419,1.027,0.64,1.617,0.64
		c0.315,0,0.637-0.064,0.938-0.194c0.862-0.374,1.424-1.228,1.424-2.168v-4.311C51.814,14.858,46.441,8.005,41.621,5.882z
		 M36.18,55.984H24.527V34.423h1.934h7.785h1.935V55.984z M28.822,29.7v-7.208h3.061V29.7H28.822z M34.705,16.98h-13.88
		c-1.305,0-2.362,1.058-2.362,2.362v1.277h-4.847V4.721h4.847v1.581c0,1.306,1.058,2.362,2.362,2.362h9.23
		c4.146,0,7.311,0.504,9.662,1.54c3.162,1.394,6.949,6.201,7.342,10.399C42.462,17.432,38.81,17.061,34.705,16.98z"
      />
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
        fill-rule="evenodd"
        clip-rule="evenodd"
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
