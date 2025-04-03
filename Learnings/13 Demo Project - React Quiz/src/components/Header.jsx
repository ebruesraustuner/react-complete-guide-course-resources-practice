import logoImage from '../assets/quiz-logo.png'

const logoImg = logoImage;

export default function Header(){
    return (
       <>
        <header>
            <img src={logoImg} alt='quiz logo'/>
            <h1>React Quiz</h1>
        </header>
       </> 
    )
}