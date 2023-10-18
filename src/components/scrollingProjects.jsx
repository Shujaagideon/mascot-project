import gsap from "gsap";
import React from "react";

/* eslint-disable react/prop-types */
const Banner = ({ images, speed = 5000 }) => {
  const [speedCustom, setSpeed] = React.useState(speed)
  // const customSpeed = {speed:speed};
  const hovered = ()=>{
    setSpeed(0)
    
    // gsap.to(customSpeed,{
    //   speed: 0,
    //   duration: 0.3,
    //   ease: 'easeIn'
    // })
  }
  const unhovered = ()=>{
    setSpeed(speed)
    // console.log('Left')
    // gsap.to(customSpeed,{
    //   speed: speed,
    //   duration: 0.3,
    //   ease: 'easeIn'
    // })
  }
    return (
      <div className="inner">
        <div className="wrapper">
          <section style={{ "--speed": `${speedCustom}ms` }}>
            {images.map(({ id, image }) => (
              <div className="image" key={id}>
                <img onPointerEnter={()=>hovered()} onPointerLeave={()=>unhovered()} src={image} alt={id} />
              </div>
            ))}
          </section>
          <section style={{ "--speed": `${speedCustom}ms` }}>
            {images.map(({ id, image }) => (
              <div className="image" key={id}>
                <img onPointerEnter={()=>hovered()} onPointerLeave={()=>unhovered()} src={image} alt={id} />
              </div>
            ))}
          </section>
          <section style={{ "--speed": `${speedCustom}ms` }}>
            {images.map(({ id, image }) => (
              <div className="image" key={id}>
                <img onPointerEnter={()=>hovered()} onPointerLeave={()=>unhovered()} src={image} alt={id} />
              </div>
            ))}
          </section>
        </div>
      </div>
    );
  };
  
  export { Banner };