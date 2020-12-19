import React, { Component } from 'react'
import { Answer } from './answer/Answer';
import Question from './quesion/Question';
import './QuizMain.css';
import mp3File from './correct1.mp3';
import mp3File2 from './incorrect.mp3'
import mp3File3 from './end.mp3'

export class QuizMain extends Component {

    state = {
        questions:{
            1:'Who was the first man to walk on the moon?', 
            2:'Which is the tallest mountain in the world?', 
            3:'Which team won IPL 2020?', 
            4:'What is the capital of India?',
            5:'Where is Taj Mahal?', 
            6:'What color is Apple?', 
            7:'National animal of India?', 
            8:'Where is niagara falls?',
            9:'Which animal is known as the Ship of the Desert?', 
            10:'How many bones does an adult human have?'
        }, 
        answers:{
            1:{
                1:'William Anders',
                2:'Sunita Williams',
                3:'Neil Armstrong',
                4:'Elon Musk'
            },
            2:{
                1:'Mount Fuji',
                2:'Mount Everest',
                3:'Mount Olympus',
                4:'K2'
            },
            3:{
                1:'CSK',
                2:'DC',
                3:'MI',
                4:'RCB'
            },
            4:{
                1:'Mumbai',
                2:'Delhi',
                3:'Kolkata',
                4:'Nagpur'
            },
            5:{
                1:'Mumbai',
                2:'Agra',
                3:'Gujarat',
                4:'Aurangabad'
            },
            6:{
                1:'Purple',
                2:'Silver',
                3:'Red',
                4:'Blue'
            },
            7:{
                1:'Lion',
                2:'Tiger',
                3:'Camel',
                4:'Rhino'
            },
            8:{
                1:'Canada',
                2:'Russia',
                3:'USA',
                4:'England'
            },
            9:{
                1:'Horse',
                2:'Elephant',
                3:'Camel',
                4:'Yalk'
            },
            10:{
                1:'206',
                2:'210',
                3:'200',
                4:'202'
            }
        },
        correctAnswers:{
            1:'3',
            2:'2',
            3:'3',
            4:'2',
            5:'2',
            6:'3',
            7:'2',
            8:'1',
            9:'3',
            10:'1'
        },
        correctAnswer:0, 
        clickedAnswer:0, 
        step:Math.floor(Math.random() * 10)+1,
        count:0,
        score:0
    }

    audio = new Audio(mp3File)
    aud = new Audio(mp3File2)
    au = new Audio(mp3File3)

    checkAnswer = answer =>{                               //we get that option num
        const {correctAnswers,step,score,count} = this.state;
        if(answer === correctAnswers[step]){
            this.setState({
                score:score+1,
                correctAnswer: correctAnswers[step], 
                clickedAnswer:answer
            });
            this.audio.volume=0.2;
            this.audio.currentTime=1;
            this.audio.play();
        }
        else{
            this.setState({
                correctAnswer:0, 
                clickedAnswer:answer
            });
            this.aud.volume=0.1;
            this.aud.play();
        }
        console.log(' From checkAnswer Step = ',step,' with count = ',count,'\n');
    }
 
    nextStep = step =>{
        const {count,score} = this.state; 
        this.setState({
            count:count+1
        })
        if(count===4 && score>=4){
            this.au.play();
        }
        this.aud.pause();
        this.audio.pause();
        this.setState({
            step:(step+1)%Object.keys(this.state.questions).length+1, 
            correctAnswer:0,
            clickedAnswer:0, 
        });
        console.log('Step = ',step,' with count = ',count);
    }

    refreshQuiz = () => {
        this.setState({
            score:0,
            step:Math.floor(Math.random() * 10)+1,
            correctAnswer:0,
            clickedAnswer:0, 
            count:0
        });
        this.render();
    }

    render() {
        let {questions,step,answers,correctAnswer,score,clickedAnswer,count } = this.state;
        return (
            <div className="Content">
                {count <= 4 ?
                    (
                    <>
                    <p className="mrq">*Please answer each question inorder to move ahead</p>
                    <Question 
                        question={questions[step]}
                    />
                    <Answer
                        answer={answers[step]}
                        checkAnswer={this.checkAnswer}
                        correctAnswer={correctAnswer}
                        clickedAnswer={clickedAnswer}
                    />
                    <button className="NextStep"   disabled={
                            clickedAnswer && count<=4 
                            ?false:true
                        }
                        onClick={()=>this.nextStep(step)}    
                    >
                    Next
                    </button>
                    </>
                    ) : (
                        <div className="finalpage">
                            <h1>You have completed the quiz!</h1> 
                            {score ===0 ? (<p>Poor score</p>):''}    
                            {score ===5 ? (<p>Awesome!Nailed it</p>):('')}                        
                            {score>=4 ? (<p>Well Done!!!</p>):(<p>Try Harder...</p>)}
                            <p>Your score is: {score} of 5</p>
                            <button onClick={this.refreshQuiz}  className="Reset">Reset Quiz</button>
                            <p>Thank you!</p>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default QuizMain
