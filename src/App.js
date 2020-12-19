import './App.css';
import QuizMain from './components/QuizMain';
//      <video src='/videos/video.mp4' autoPlay loop muted />
function App() {
  return (
    <div className="App">
      <video src='/videos/video.mp4' autoPlay loop muted />
      <QuizMain/>
    </div>
  );
}

export default App;
