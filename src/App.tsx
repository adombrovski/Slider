import * as React from 'react';
import Slider from './components/Slider/Slider';

function App() {
  return (
    <Slider
      slideX={true}
      infinity={true} >
      <iframe title="ello" src="https://www.ss.lv/">Ello</iframe>
      <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
      <img alt='img' src='https://www.wallpapertip.com/wmimgs/3-35494_beautiful-wallpaper-full-hd.jpg' />
    </ Slider>
  );
}

export default App;