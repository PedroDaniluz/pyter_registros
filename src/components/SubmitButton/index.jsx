import './SubmitButton.css'

export default function SubmitButton({ text, onclick, type = 'fill', icon, marginTop }) {
    return (
        <button className={`submit-button ${type}`} onClick={onclick} style={{ marginTop:`${marginTop}` }}>
            <span className='icon'>{ icon }</span>
            <span>{ text }</span>
        </button>
    )
}