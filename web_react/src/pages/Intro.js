import { Link } from 'react-router-dom';
import { thirdTitle, title } from '../utils/constants';

const Intro = () => {
    return (
        <div>
            <div className='root'>
                <img src="/assets/calculator.jpg" alt='Calculator'></img>
                <div >
                    
                    <h1 className='intro_title'>{title}</h1>
                    <p className='intro_paragraph'>
                        Привіт, Я Щудлик Ярослав, студент ІКТА групи ІР-22. <br />
                        Представляю свій курсовий проект на тему "Калькулятор". <br />
                        <h1>{thirdTitle}</h1>
                    </p>
                    
                    <Link to='/calculate'><button className='button'>Start</button></Link>        
                </div>
            </div>
        </div>
    )
}

export default Intro;