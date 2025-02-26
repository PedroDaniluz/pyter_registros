import { useState } from 'react'
import '../../components/InputField/InputField.css'
import './SwitchButton.css'

export default function SwitchButton({title, placeholder, width = 100, onToggleChange}) {
    const [toggled, setToggled] = useState(false);

    const handleToggle = () => {
        setToggled((prev) => {
            const newState = !prev;
            if (onToggleChange) {
                setTimeout(() => onToggleChange(newState), 0);
            }
            return newState;
        });
    };

    return (
        <div className='textField' style={{ width: `${width}%` }}>
            <label className='textField--title'>{title}</label>
            <div className='switch'>
                <span>{placeholder}</span>
                <button 
                    className={`toggleBtn ${toggled? 'toggled' : ''}`}
                    onClick={handleToggle}
                >
                    <div className='ball'></div>
                </button>
            </div>
        </div>
    )
}