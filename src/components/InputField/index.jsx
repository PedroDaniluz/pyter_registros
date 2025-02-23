import './InputField.css'

export default function InputField() {
    return (
        <div className='textField'>
            <label for='clientNameIn' className='textField--title'>Nome</label>
            <input id='clientNameIn' placeholder='aaaaaaaaaa' className='textField--field'/>
        </div>
    )
}