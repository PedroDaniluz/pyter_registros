import './InputField.css';
import InputMask from '@mona-health/react-input-mask';

export default function InputField({title, placeholder, type, id, telMask, width = 100}) {
    return (
        <div className='textField' style={{ width: `${width}%` }}>
            <label htmlFor={id} className='textField--title'>{title}</label>
            {telMask && (
                <InputMask mask={'(99) 99999-9999'} type={type} id={id} placeholder={placeholder} className='textField--field'/>
            )}
            {!telMask && (
                <input type={type} id={id} placeholder={placeholder} className='textField--field'/>
            )}
        </div>
    )
}