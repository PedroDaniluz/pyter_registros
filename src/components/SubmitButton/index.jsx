import './SubmitButton.css'

export default function SubmitButton({ text, onclick }) {
    return(
        <button className='submit-button' onclick={onclick}>{text}</button>
    )
}