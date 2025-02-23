import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

const CourtLocationForm = ({
  nome,
  cep,
  rua,
  bairro,
  numero,
  complemento,
  uf,
  cidade,
  handleChange,
  handleSubmit,
  errorMessage,
  handlePrevStep,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const previousCep = useRef(cep);

  const formatarCEP = (value) => {
    return value.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const formattedCep = formatarCEP(cep);
      if (formattedCep.length === 9 && formattedCep !== previousCep.current) {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_URL_CONSULTA_CEP}/${formattedCep}/json`
          );
          const { logradouro, bairro, localidade, uf } = response.data;
          handleChange({ target: { name: "rua", value: logradouro } });
          handleChange({ target: { name: "bairro", value: bairro } });
          handleChange({ target: { name: "cidade", value: localidade } });
          handleChange({ target: { name: "uf", value: uf } });
          previousCep.current = formattedCep;
        } catch (error) {
          console.error("Error fetching address:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(fetchAddress, 500);

    return () => clearTimeout(timeoutId);
  }, [cep, handleChange]);

  return (
    <form onSubmit={handleSubmit} className="register-form-container">
      <h2>Dados do Complexo Esportivo</h2>
      <input
        type="text"
        name="nome"
        placeholder="Nome Complexo Esportivo"
        value={nome}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="cep"
        placeholder="CEP"
        value={cep}
        onChange={(e) =>
          handleChange({
            target: { name: "cep", value: formatarCEP(e.target.value) },
          })
        }
        minLength={9}
        maxLength={9}
        required
      />
      {isLoading && <Loading isLoading={isLoading} />}
      <input
        type="text"
        name="rua"
        placeholder="Rua"
        value={rua}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="bairro"
        placeholder="Bairro"
        value={bairro}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="numero"
        placeholder="Número"
        value={numero}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="complemento"
        placeholder="Complemento"
        value={complemento}
        onChange={handleChange}
      />
      <input
        type="text"
        name="uf"
        placeholder="UF"
        value={uf}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="cidade"
        placeholder="Cidade"
        value={cidade}
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
};

export default CourtLocationForm;
