import { useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import ProgressBar from "./ProgressBar/ProgressBar";
import CNPJForm from "./CNPJForm";
import AdminForm from "./AdminForm";
import CourtLocationForm from "./LocationForm";
import Completion from "./Completion";
import ImageStep01 from "../../assets/images/step1.png";
import ImageStep02 from "../../assets/images/step2.png";
import ImageStep03 from "../../assets/images/step3.png";
import ImageStep04 from "../../assets/images/step4.png";

const Register = () => {
  const [step, setStep] = useState(0);
  const [cnpj, setCnpj] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [adminData, setAdminData] = useState({
    nomeUsuario: null,
    email: null,
    senha: null,
    confirmarSenha: null,
    idComplexoEsportivo: null
  });
  const [locationData, setLocationData] = useState({
    nome: null,
    cep: null,
    rua: null,
    bairro: null,
    numero: null,
    complemento: null,
    uf: null,
    cidade: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleNextStep = () => {
    setErrorMessage("");
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setErrorMessage("");
    setStep(step - 1);
  };

  const handleCnpjSubmit = async (e) => {
    e.preventDefault();
    try{
      setIsLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}valid-cnpj/${cnpj}`)

      if(response.data.isValid == false){
        alert('Informe um CNPJ válido.')
      }
      else{
        handleNextStep();
      }

    }catch(error){
      alert('Informe um CNPJ válido.')
      console.log(error)
    }finally{
      setIsLoading(false);
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try{

      if (adminData.senha !== adminData.confirmarSenha) {
        setErrorMessage("As senhas são diferentes.")
        throw new Error(errorMessage)
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}administrador/singup/`, {
        nomeUsuario: adminData.nomeUsuario,
        email: adminData.email,
        senha: adminData.senha,
        idComplexoEsportivo: adminData.idComplexoEsportivo
      })

      localStorage.setItem("token", response.data.token)

      handleNextStep();
    }catch(error){
      console.log(error)
    }finally{
      setIsLoading(false);
    }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try{
      const response = await axios.post(`${import.meta.env.VITE_API_URL}complexo-esportivo/add/`, {
        cnpj,
        nome: locationData.nome,
        rua: locationData.rua,
        bairro: locationData.bairro,
        cidade: locationData.cidade,
        complemento: locationData.complemento,
        numero: locationData.numero,
        cep: locationData.cep,
      })

      setAdminData((prevState) => ({
        ...prevState,
        idComplexoEsportivo: response.data.new_sports_complex.id
      }))

      handleNextStep()
    }catch(error){
      console.log(error)
    }finally{
      setIsLoading(false);
    }
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const images = [ImageStep01, ImageStep03, ImageStep02, ImageStep04];
  const imagesAlt = [
    "Etapa 1 - Dados da empresa",
    "Etapa 2 - Endereço do Complexo Esportivo",
    "Etapa 3 - Usuário",
    "Etapa 4 - Conclusão",
  ];
  const stepDescriptions = [
    <p className="text-register">
      Vamos começar com o <strong>CNPJ</strong> da empresa
    </p>,
    <p className="text-register">
        Digite o <strong>endereço</strong> do seu{" "}
        <strong>complexo esportivo</strong>.
    </p>,
    <p className="text-register">
      Escolha um <strong>Email</strong> e uma <strong>Senha</strong> para
      entrar.
    </p>,
    <p className="text-register">
      Cadastro <strong>concluído</strong>
    </p>,
  ];

  return (
    <div className="register-container">
      <div className="register-left">
        {stepDescriptions[step]}
        <img src={images[step]} alt={imagesAlt[step]} />
      </div>
      <div className="register-right">
        <ProgressBar step={step} />
        {step === 0 && (
          <CNPJForm
            cnpj={cnpj}
            handleChange={(e) => setCnpj(e.target.value)}
            handleSubmit={handleCnpjSubmit}
            errorMessage={errorMessage}
          />
        )}
        {step === 1 && (
          <CourtLocationForm
            {...locationData}
            handleChange={handleLocationChange}
            handleSubmit={handleCompanySubmit}
            errorMessage={errorMessage}
            handlePrevStep={handlePrevStep}
          />
        )}
        {step === 2 && (
          <AdminForm
            {...adminData}
            handleChange={(e) =>
              setAdminData({ ...adminData, [e.target.name]: e.target.value })
            }
            handleSubmit={handleAdminSubmit}
            errorMessage={errorMessage}
            handlePrevStep={handlePrevStep}
          />
        )}
        {isLoading && <Loading isLoading={isLoading} />}
        {step === 3 && <Completion />}
      </div>
    </div>
  );
};

export default Register;

/*
useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const quadra = localStorage.getItem("idQuadra");
        const response = await axios.get(
          `${process.env.BASE_URL}quadra/alugueis/${quadra}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setHorarios(response.data);
        console.log(response.data);
      } catch (error) {
        if (
          error.response &&
          (error.response.data.error === "Token expired" ||
            error.response.data.error === "jwt malformed")
        ) {
          localStorage.removeItem("token");
        }
        console.error("Erro ao buscar horários:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHorarios();

    const intervalId = setInterval(fetchHorarios, 10000);
    return () => clearInterval(intervalId);
  }, [token]);
  */