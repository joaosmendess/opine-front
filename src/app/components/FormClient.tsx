"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const FormClient: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    numero: '',
    veiculo: ''
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/clientes', formData);
      console.log('Dados enviados com sucesso:', response.data);
      router.push('/RatingService')

      // Adicione aqui o código para atualizar o dashboard ou redirecionar o usuário
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  return (
    <div className="w-96 mx-auto mt-36">
        <div className="bg-blue-500 p-2 text-white text-center">
            <h2 className="text-2xl font-bold">Bem vindo(a)</h2> <p className='indent-1 text-center text-nowrap'>para continuar valide seus dados</p> 
        </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-96">
        <div className="mb-4">
            <h2 className='text-black text-center font-bold'>Insira seu dados:</h2>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
            Nome
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
focus:outline-none focus:shadow-outline"
id="nome"
type="text"
placeholder="Nome do Cliente"
name="nome"
value={formData.nome}
onChange={handleChange}
required
/>
</div>
<div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numero">
        Número de Contato
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="numero"
        type="text"
        placeholder="Número de Contato"
        name="numero"
        value={formData.numero}
        onChange={handleChange}
required

      />
    </div>

    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="veiculo">
        Modelo do Veículo
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="veiculo"
        type="text"
        placeholder="Modelo do Veículo"
        name="veiculo"
        value={formData.veiculo}
        onChange={handleChange}
required

      />
    </div>

    <div className="flex items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Continuar
      </button>
    </div>
  </form>
</div>);
};

export default FormClient;