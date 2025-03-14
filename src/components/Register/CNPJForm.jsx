const CNPJForm = ({ cnpj, handleChange, handleSubmit, errorMessage }) => (
  
  <form onSubmit={handleSubmit} className="register-form-container">
    <h2>Digite o CNPJ:</h2>
    <input
      type="text"
      name="cnpj"
      placeholder="CNPJ"
      value={cnpj}
      onChange={handleChange}
      required
    />
    <div className="div-btn-register">
      <button type="submit" className="btn-register">
        Avançar
      </button>
    </div>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
  </form>
);

export default CNPJForm;
