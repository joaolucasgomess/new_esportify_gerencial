const AdminForm = ({
  nomeUsuario,
  email,
  senha,
  confirmarSenha,
  handleChange,
  handleSubmit,
  errorMessage,
  handlePrevStep,
}) => (
  <form onSubmit={handleSubmit} className="register-form-container">
    <h2>Usuário Administrador</h2>
    <input
      type="text"
      name="nomeUsuario"
      placeholder="Nome de usuário"
      value={nomeUsuario}
      onChange={handleChange}
      required
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={email}
      onChange={handleChange}
      required
    />
    <input
      type="password"
      name="senha"
      placeholder="Senha"
      value={senha}
      onChange={handleChange}
      required
    />
    <input
      type="password"
      name="confirmarSenha"
      placeholder="Confirme a Senha"
      value={confirmarSenha}
      onChange={handleChange}
      required
    />
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    <div className="div-btn-register">
      <button onClick={handlePrevStep} className="btn-register">
        Voltar
      </button>
      <button type="submit" className="btn-register">
        Avançar
      </button>
    </div>
  </form>
);

export default AdminForm;
