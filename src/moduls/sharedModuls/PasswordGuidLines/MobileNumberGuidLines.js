import tick from './tick.png'
import cross from './cross.png'
import './PasswordGuidLines.css'
const MobileNumberGuidLines = (props) => {

    const {returnStartNumber,returnLengthNumber } = props.MobileNumberGuidLines;
    return (
        <div className='mobileDivLineComponent'>
            <h3 style={{color:'#111111'}} className='mobileGuidline'>Mobile number must follow these guidelines.</h3>
            <hr/>
            {returnStartNumber ? <p><img src={tick} className='PasswordGuidLinesImageSize' />Mobile number should  start between 6 - 9.</p>
                :
                <p><img src={cross} className='PasswordGuidLinesImageSize' />Mobile number should  start between 6 - 9.</p>
            }

            {returnLengthNumber ? <p> <img src={tick} className='PasswordGuidLinesImageSize' />Mobile number length should be also 10 digit</p>
                :
                <p><img src={cross}  className='PasswordGuidLinesImageSize'/>Mobile number length should be also 10 digit</p>
            }
        </div>
    )
}

export default MobileNumberGuidLines;