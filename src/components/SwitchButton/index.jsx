import { useState } from 'react'
import '../../components/InputField/InputField.css'
import './SwitchButton.css'

export default function SwitchButton({title, placeholder, width = 100}) {
    const [toggled, setToggled] = useState();

    return (
        <div className='textField' style={{ width: `${width}%` }}>
            <label className='textField--title'>{title}</label>
            <div className='switch'>
                <span>{placeholder}</span>
                <button 
                    className={`toggleBtn ${toggled? 'toggled' : ''}`}
                    onClick={() => setToggled(!toggled)}
                >
                    <div className='ball'></div>
                </button>
            </div>
        </div>
    )
}