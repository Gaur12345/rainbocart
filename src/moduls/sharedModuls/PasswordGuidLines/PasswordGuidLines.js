import tick from './tick.png'
import cross from './cross.png'
import './PasswordGuidLines.css'
const PasswordGuidLines = (props) => {

    const { returnCapital, returnSmall, returnDigit, returnSpecial, returnLength } = props.passwordGuidLines;

    return (
        <div className='passwordDivLineComponent'>
             {returnCapital && returnSmall && returnDigit && returnSpecial && returnLength ? <p  style={{ color: 'green' }}><img src={tick} className='PasswordGuidLinesImageSize' />Password is Strong</p>
                :
                <><h3 style={{ color: '#111111' }} className='passwordGuidline'>Password must follow these guidelines.</h3><hr/></>
            }
            {returnCapital ? <></>
                :
                <p><img src={cross} className='PasswordGuidLinesImageSize' />Password must have include one capital letter. EX:- A,B,C,D..</p>
            }
            {returnSmall ? <></>
                :
                <p><img src={cross} className='PasswordGuidLinesImageSize' />Password must have include one small letter. EX:- a,b,c,d...</p>
            }

            {returnDigit ? <></>
                :
                <p><img src={cross} className='PasswordGuidLinesImageSize' />Password must have include one digit. EX:- 1,2,3,4...</p>
            }
            {returnSpecial ? <></>
                :
                <p><img src={cross} className='PasswordGuidLinesImageSize' />Password must have include one special character. EX:- @,#,$,*</p>
            }
            {returnLength ? <></>
                :
                <p><img src={cross} className='PasswordGuidLinesImageSize' />Password length must be grater than 7.</p>
            }
        </div>
    )
}

export default PasswordGuidLines;