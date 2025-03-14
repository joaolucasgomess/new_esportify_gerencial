import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const ConfirmarExclusaoModal = ({ onClose, onConfirm, horario }) => {
  return (
    <div className="modal-overlay-delete">
      <div className="modal-content-delete">
        <h2 className="modal-title-delete">Confirmar Exclusão</h2>
        <p className="modal-description-delete">
          Você tem certeza que deseja excluir o horário das{" "}
          {horario.horario_inicial.slice(11, 16)} às{" "}
          {horario.horario_final.slice(11, 16)}? Você pode apenas desativar
          temporariamente.
        </p>
        <div className="modal-buttons-delete">
          <button className="btn-delete" onClick={onConfirm}>
            <CheckIcon />
            Confirmar
          </button>
          <button className="btn-delete" onClick={onClose}>
            <ClearIcon />
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarExclusaoModal;
