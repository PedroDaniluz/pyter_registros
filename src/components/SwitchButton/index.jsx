import '../../components/InputField/InputField.css'
import './SwitchButton.css'

export default function SwitchButton({ title, placeholder, onToggleChange, width = 100, value = false }) {
    const handleToggle = () => {
        if (onToggleChange) {
            onToggleChange(!value);
        }
    };

    return (
        <div className='textField' style={{ width: `${width}%` }}>
            <span className='textField--title'>{title}</span>
            <div className='switch'>
                <span>{placeholder}</span>
                <button
                    type='button'
                    className={`toggleBtn ${value ? 'toggled' : ''}`}
                    onClick={handleToggle}
                >
                    <div className='ball'></div>
                </button>
            </div>
        </div>
    );
}
