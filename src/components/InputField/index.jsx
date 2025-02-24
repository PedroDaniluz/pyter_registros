import './InputField.css'

export default function InputField({title, placeholder, type, id, pattern}) {
    return (
        <div className='textField'>
            <label for={id} className='textField--title'>{title}</label>
            <input type={type} id={id} placeholder={placeholder} className='textField--field'/>
        </div>
    )
}