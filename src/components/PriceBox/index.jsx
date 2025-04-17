import '../InputField/InputField.css';

export default function PriceBox({ id, title, value, width = 100, disabled = false }) {
    const formatCurrency = (input) => {
        const num = parseFloat(input) || 0;
        return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="textField" style={{ width: `${width}%` }}>
            <label htmlFor={id} className="textField--title" disabled={disabled}>{title}</label>
            <input id={id} className="textField--field" value={formatCurrency(value)} readOnly/>
        </div>
    );
}
