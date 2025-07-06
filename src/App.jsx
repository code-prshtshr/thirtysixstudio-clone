import "./index.css";
import Canvas from "./canvascomponent";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  const [showing, setShowing] = useState(false);
  const scrollRef = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  const defaultBodyStyles = useRef({
    backgroundColor: "",
    color: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const body = document.body;
      defaultBodyStyles.current.backgroundColor =
        body.style.backgroundColor || "";
      defaultBodyStyles.current.color = body.style.color || "";
    }
  }, []);

  const handleThirtysixstudioClick = useCallback(
    (e) => {
      if (!showing) {
        setShowing(true);

        gsap.set(growingSpan.current, {
          top: e.clientY,
          left: e.clientX,
        });

        gsap.set("body", {
          color: "#000",
          duration: 1,
          ease: "power2.inOut",
        });

        gsap.to(growingSpan.current, {
          scale: 1000,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(growingSpan.current, {
              scale: 0,
              clearProps: "all",
            });

            gsap.set("body", {
              backgroundColor: "#fd2c2a",
            });
          },
        });
      } else {
        setShowing(false);

        gsap.to("body", {
          backgroundColor: defaultBodyStyles.current.backgroundColor || "#000",
          color: defaultBodyStyles.current.color || "#fff",
          duration: 1,
          ease: "power2.inOut",
        });

        gsap.set(growingSpan.current, {
          scale: 0,
          clearProps: "all",
        });
      }
    },
    [showing]
  );

  useGSAP(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("click", handleThirtysixstudioClick);
      return () => {
        el.removeEventListener("click", handleThirtysixstudioClick);
      };
    }
  }, [handleThirtysixstudioClick]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between z-50 ">
        <div className="brand text-2xl font-regular">ThritySixStuidio</div>
        <div className="links flex gap-10">
          {["Home", "About", "Projects", "Contact"].map((link, index) => (
            <a
              key={index}
              href={`#${link.toLowerCase()}`}
              className="text-md  hover:text-white-300"
            >
              {link}
            </a>
          ))}
        </div>
      </nav>
      <span
        ref={growingSpan}
        className="growing block rounded-full fixed top-[-20px] left-[-20px] w-5 h-5 "
      ></span>
      <div className="w-full relative  z-[1] min-h-screen s pt-28">
        {showing &&
          data[0].map((canvasdets, index) => (
            <Canvas details={canvasdets} key={index} />
          ))}
        <div className="textcontainer w-full px-[20%] relative z-[1]">
          <div className="text w-[40%]">
            <h3 className="text-4xl">
              At Thirtysixstudio, we build digital assets and immersive
              experiences for purposeful brands.
            </h3>
            <p className="text-md w-[80%] mt-10 font-md z-[1]">
              We're a boutique production studio focused on design, animation,
              and technology, constantly rethinking what digital craft can do
              for present-day ads and campaigns.
            </p>
            <button className="text-md mt-10">Scroll</button>
          </div>
        </div>
      </div>
      <div className="textcontainer w-full h-56 px-[20%] relative">
        <div className="w-full bottom-0 left-0 absolute z-[1] ">
          <h1
            ref={scrollRef}
            className="text-[13rem] font-normal tracking-normal leading-none flex items-center "
            style={{ cursor: "pointer" }}
          >
            Thirtysixstudio
          </h1>
        </div>
      </div>
      <div className="w-full h-screen mt-32 px-10 relative z-[1]">
        {showing &&
          data[1].map((canvasdets, index) => (
            <Canvas details={canvasdets} key={index} />
          ))}
        <h1 className="text-6xl mb-5 relative">The about our Brand</h1>
        <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          rerum est ut ipsa corporis, ea vitae accusantium? Quibusdam corrupti
          eveniet totam, quis aperiam incidunt rerum, est cupiditate rem nihil
          tenetur.
        </p>
        <img
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt=""
          className="w-full h-screen object-cover mt-10"
        />
      </div>
    </>
  );
}

export default App;
