const ProgressBar = ({ step }) => {
  const steps = [
    "Dados da empresa ",
    "Dados do Complexo Esportivo",
    "Usuário Administrador",
    "Concluído",
  ];
  const progress = (step / (steps.length - 1)) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="progress-steps">
        {steps.map((stepName, index) => (
          <span
            key={index}
            className={`progress-step ${step === index ? "active" : ""}`}
          >
            {stepName}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
