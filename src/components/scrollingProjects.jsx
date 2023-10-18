import gsap from "gsap";

/* eslint-disable react/prop-types */
const Banner = ({ images, projectRef, speed = 50000 }) => {

    const projectPage =()=>{
      projectRef.current.style.visibility = 'visible'
      gsap.to(projectRef.current, {
        opacity: 1,
        duration: 0.2
      })
    }
    return (
      <div className="inner">
        <div className="wrapper">
          <section style={{ "--speed": `${speed}ms` }}>
            {images.map(({ id, image }) => (
              <div className="image" key={id}>
                <img onClick={()=>projectPage()} src={image} alt={id} />
              </div>
            ))}
          </section>
          <section style={{ "--speed": `${speed}ms` }}>
            {images.map(({ id, image }) => (
              <div className="image" key={id}>
                <img onClick={()=>projectPage()} src={image} alt={id} />
              </div>
            ))}
          </section>
          <section style={{ "--speed": `${speed}ms` }}>
            {images.map(({ id, image }) => (
              <div className="image" key={id}>
                <img onClick={()=>projectPage()} src={image} alt={id} />
              </div>
            ))}
          </section>
        </div>
      </div>
    );
  };
  
  export { Banner };