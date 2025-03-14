import{ useState } from "react";

function AdicionarHorarioModal({ onClose, onAddHorario, dia, errorMessage }) {
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFim, setHorarioFim] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoHorario = {
      id_dia_semana: dia.id,
      horario_inicial: horarioInicio,
      horario_final: horarioFim,
      preco: parseFloat(preco),
    };

    onAddHorario(novoHorario);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
          Adicionar Horário -{" "}
          {dia.desc_dia
            .replace("SEG", "Segunda-feira")
            .replace("TER", "Terça-feira")
            .replace("QUA", "Quarta-feira")
            .replace("QUI", "Quinta-feira")
            .replace("SEX", "Sexta-feira")
            .replace("SAB", "Sábado")
            .replace("DOM", "Domingo")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group-modal">
            <label>Horário Início:</label>
            <input
              type="time"
              value={horarioInicio}
              onChange={(e) => setHorarioInicio(e.target.value)}
              required
            />
          </div>
          <div className="input-group-modal">
            <label>Horário Fim:</label>
            <input
              type="time"
              value={horarioFim}
              onChange={(e) => setHorarioFim(e.target.value)}
              required
            />
          </div>
          <div className="input-group-modal">
            <label>Preço:</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
          <div className="btn-container-modal">
            <button type="submit" className="btn-modal">
              Adicionar
            </button>
            <button type="button" className="btn-modal" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default AdicionarHorarioModal;
