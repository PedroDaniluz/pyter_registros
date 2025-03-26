import '../InputField/InputField.css';

export default function PriceBox({ id, title, value, width = 100 }) {
    const formatCurrency = (input) => {
        // Garantir que o valor seja numérico e formatado como moeda
        const num = parseInt(input, 10) || 0; // Converte para número, ou 0 se inválido
        return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="textField" style={{ width: `${width}%` }}>
            {title && <label htmlFor={id} className="textField--title">{title}</label>}
            <span id={id} className="textField--field">{formatCurrency(value)}</span>
        </div>
    );
}
