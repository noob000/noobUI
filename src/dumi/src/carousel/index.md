# Carousel

建议设定外层容器宽高，以及轮播内容的宽高

## Top

```tsx
import React,{CSSProperties} from "react";
import Carousel from "./carousel";
export default ()=>{
     const style: CSSProperties = {
    width: "400px",
    height: "200px",
    lineHeight: "200px",
    textAlign: "center",
    background: "#364D79"
  }
   return (
       <div style={{width:"400px",height:"200px"}}>
          <Carousel dotPosition='top' >
        <div style={style}>1</div>
        <div style={style}>2</div>
        <div style={style}>3</div>
        <div style={style}>4</div>
        </Carousel>
       </div>
   )
  
}

```

## Bottom

```tsx
import React,{CSSProperties} from "react";
import Carousel from "./carousel";
export default ()=>{
     const style: CSSProperties = {
    width: "400px",
    height: "200px",
    lineHeight: "200px",
    textAlign: "center",
    background: "#364D79"
  }
   return (
       <div style={{width:"400px",height:"200px"}}>
          <Carousel dotPosition='bottom' >
        <div style={style}>1</div>
        <div style={style}>2</div>
        <div style={style}>3</div>
        <div style={style}>4</div>
        </Carousel>
       </div>
   )
  
}

```

## Left

```tsx
import React,{CSSProperties} from "react";
import Carousel from "./carousel";
export default ()=>{
     const style: CSSProperties = {
    width: "400px",
    height: "200px",
    lineHeight: "200px",
    textAlign: "center",
    background: "#364D79"
  }
   return (
       <div style={{width:"400px",height:"200px"}}>
          <Carousel dotPosition='left' >
        <div style={style}>1</div>
        <div style={style}>2</div>
        <div style={style}>3</div>
        <div style={style}>4</div>
        </Carousel>
       </div>
   )
  
}

```

## Right

```tsx
import React,{CSSProperties} from "react";
import Carousel from "./carousel";
export default ()=>{
     const style: CSSProperties = {
    width: "400px",
    height: "200px",
    lineHeight: "200px",
    textAlign: "center",
    background: "#364D79"
  }
   return (
       <div style={{width:"400px",height:"200px"}}>
          <Carousel dotPosition='right' >
        <div style={style}>1</div>
        <div style={style}>2</div>
        <div style={style}>3</div>
        <div style={style}>4</div>
        </Carousel>
       </div>
   )
  
}

```

## Auto

通过设置autoplay属性决定是否自动播放，通过设置当autoplay属性为true时，通过interval属性调整自动切换的时间间隔

```tsx
import React,{CSSProperties} from "react";
import Carousel from "./carousel";
export default ()=>{
     const style: CSSProperties = {
    width: "400px",
    height: "200px",
    lineHeight: "200px",
    textAlign: "center",
    background: "#364D79"
  }
   return (
       <div style={{width:"400px",height:"200px"}}>
          <Carousel dotPosition='top' autoplay>
        <div style={style}>1</div>
        <div style={style}>2</div>
        <div style={style}>3</div>
        <div style={style}>4</div>
        </Carousel>
       </div>
   )
  
}

```

## 可以通过ref，来调用组件暴露出来的方法

```tsx
import React,{CSSProperties,useRef} from "react";
import Carousel,{CarouselRef} from "./carousel";
export default ()=>{
     const style: CSSProperties = {
    width: "400px",
    height: "200px",
    lineHeight: "200px",
    textAlign: "center",
    background: "#364D79"
  }
  const ref= useRef<CarouselRef>(null);
    
    const goPrev=()=>{
        if(ref.current)ref.current.prev()
    }
    const goNext=()=>{
        if(ref.current)ref.current.next()
    }
   return (
    <div>
       <div style={{width:"400px",height:"200px"}}>
          <Carousel dotPosition='top' ref={ref}>
        <div style={style}>1</div>
        <div style={style}>2</div>
        <div style={style}>3</div>
        <div style={style}>4</div>
        </Carousel>
       </div>
       <div style={{marginTop:"20px"}}>
       <button onClick={goPrev}>go prev</button>
       <button onClick={goNext}>go next</button>
       </div>
       </div>
   )
  
}

```

<API src="./carousel.tsx"/>
