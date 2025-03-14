import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const DesativarHorarioModal = ({ onClose, onDesativar, horario }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Desativar Horário</h2>
        <p className="modal-description">
          Você tem certeza que deseja desativar o horário das{" "}
          {horario.horario_inicial.slice(11, 16)} às{" "}
          {horario.horario_final.slice(11, 16)}?
        </p>
        <div className="modal-buttons">
          <button className="btn" onClick={onDesativar}>
            <CheckIcon />
            Confirmar
          </button>
          <button className="btn" onClick={onClose}>
            <ClearIcon />
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesativarHorarioModal;
