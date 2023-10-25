import gsap from "gsap";

/* eslint-disable react/prop-types */
const Banner = ({ images, projectRef, speed = 50000 }) => {
  const projectPage = () => {
    projectRef.current.style.visibility = "visible";
    gsap.to(projectRef.current, {
      opacity: 1,
      duration: 0.2
    });
  };

  const stopScrolling = () => {
    // Pause the scrolling animation
    gsap.set(".sect", { animationPlayState: "paused" });
    gsap.to('.image',{
      scale: 0.8,
      duration: 0.3,
      ease: 'ease'
    })
  };

  const resumeScrolling = () => {
    // Resume the scrolling animation
    gsap.set(".sect", { animationPlayState: "running" });
    gsap.to('.image',{
      scale: 1,
      duration: 0.3,
      ease: 'ease'
    })
  };

  return (
    <div className="inner" onMouseEnter={stopScrolling} onMouseLeave={resumeScrolling}>
      <div className="wrapper">
        <section className="sect" style={{ "--speed": `${speed}ms` }}>
          {images.map(({ id, image }) => (
            <div className="image" key={id}>
              <img onClick={() => projectPage()} src={image} alt={id} />
            </div>
          ))}
        </section>
        <section className="sect" style={{ "--speed": `${speed}ms` }}>
          {images.map(({ id, image }) => (
            <div className="image" key={id}>
              <img onClick={() => projectPage()} src={image} alt={id} />
            </div>
          ))}
        </section>
        <section className="sect" style={{ "--speed": `${speed}ms` }}>
          {images.map(({ id, image }) => (
            <div className="image" key={id}>
              <img onClick={() => projectPage()} src={image} alt={id} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export { Banner };
