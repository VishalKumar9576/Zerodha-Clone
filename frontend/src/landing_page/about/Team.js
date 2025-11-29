import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/my photo.jpg"
            style={{ borderRadius: "20%", width: "50%" }}
          />
          <h4 className="mt-5">Vishal kumar</h4>
          <h6>Founder, CEO</h6>
        </div>
        <div className="col-6 p-3">
          <p>I’m Vishal Kumar — a developer and tech enthusiast passionate about transforming the trading experience through innovation.
            I’m currently building this platform with a simple vision:
             to empower traders with a clean UI, transparent systems, strong security, and technology they can trust.
             From order execution to analytics and dashboards, every feature is crafted to deliver a seamless, modern, and reliable trading experience—just like industry leaders such as Zerodha, but with my own unique touch of simplicity and performance.</p>
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on <a style={{ textDecoration: "none" }} href="">Homepage</a> / <a style={{ textDecoration: "none" }} href="">TradingQnA</a> /{" "}
            <a style={{ textDecoration: "none" }} href="">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
