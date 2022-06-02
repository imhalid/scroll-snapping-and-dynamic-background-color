import "./App.css";
import Links from "./Links";
import { data } from "./data";
import About from "./About";
import Logo from "./Logo";
import { useRef, useEffect } from "react";

function App() {
  const PageRef = useRef([]);

  const onScroll = (el) => {
    console.log("test");

    const style = PageRef.current
      .map((item, i) => {
        const rect = item.getBoundingClientRect();

        return { item, rect };
      })
      .find((item) => item.rect.bottom >= window.innerHeight * 0.5);

    const app = document.querySelector("#item");

    app.style.backgroundColor = style.item.dataset.bgcolor;

    // document.body.style.backgroundColor = style.item.dataset.bgcolor;
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  }, []);

  // https://stackoverflow.com/questions/44205000/how-to-add-class-in-element-on-scroll-react-js
  // https://stackoverflow.com/questions/63895535/javascript-change-background-color-on-scroll
  // https://stackoverflow.com/questions/43482983/how-to-add-class-on-scroll-in-react-js

  return (
    <div id="app" className="app">
      <div
        className="stick"
        style={{
          height: "100vh",
          position: "fixed",
        }}
      >
        <Links />
        <About />
        <Logo />
      </div>

      <div id="item" className="items">
        {data.map((items, i) => (
          <div
            ref={(el) => (PageRef.current[i] = el)}
            data-bgcolor={items.theme.background}
            key={items.id}
            className="panel"
            id={"item" + items.id}
          >
            <img className={"image" + items.id} src={items.image} alt="a1" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
