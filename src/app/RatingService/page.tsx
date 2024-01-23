"use client"
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';



  interface AvaliacaoData {
   
    id_servico: number;
    comentario: string;
    classificacao: number;
    
  }

  interface Servico {
    id: string;
    nome: string
  }

const RatingService: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any>('');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [services, SetServices] = useState<Servico[]>([]);
   

  const router = useRouter();

  useEffect (() => {
    const LoadingService = async () => {
      try {
        const response = await axios.get('hhttps://opine-back.onrender.com//api/servicos');
        SetServices(response.data);

        
      } catch (error) {
        console.error("Erro ao carregar os serviços:", error) ;
        
        
      }
    };
LoadingService();


  },[]);

  const handleServiceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value);
  };
  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedService || !rating ) {
      console.error('Campos obrigatórios não preenchidos.');
      return;
    }
    const avaliacaoData: AvaliacaoData = {
      
      id_servico: parseInt(selectedService),
      comentario: comment,
      classificacao: rating,
     
    };

    try {
      const response = await axios.post('http://localhost:8080/api/avaliacoes', avaliacaoData);
      console.log('Avaliação enviada com sucesso:', response.data);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Dados enviados com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      router.push('/');
    } catch (error) {
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao enviar os dados.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      console.error('Erro ao enviar avaliação:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-28  ">
         <div className="bg-blue-500 p-2 h-20">
           <h2 className='text-2xl font-bold text-center mt-5 '>Avaliação</h2>
        </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
      <h2 className=" font-bold text-black text-center mb-5"> por favor preencha os campos abaixo:</h2>

        <div className="mb-4">
          <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">
            Escolha um Serviço:
          </label>
          <select
            id="service"
            value={selectedService}
            onChange={handleServiceChange}
            className="shadow border rounded py-2 px-3 form-select text-black cursor-pointer"
          >
            
            <option value="">Selecione um Serviço</option>
        {services.map(services => (
          <option key={services.id} value={services.id} className='text-black '>Serviço {services.id}</option>
        ))}
          
            {/* Adicione mais opções conforme necessário */}
          </select>
        </div> 

        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
            Comentário:
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={handleCommentChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder='Comente o que achou do serviço, produto, empresa...'
          />
        </div>
        <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Avaliação:
      </label>
      <StarRatings
            rating={rating}
            starRatedColor="gold"
            changeRating={setRating}
            numberOfStars={5}
            name='rating'
          />
    </div>

    <div className="flex items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Enviar Avaliação
      </button>
    </div>
  </form>
</div>
);
};

export default RatingService