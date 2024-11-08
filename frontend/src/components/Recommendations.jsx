import React, { useState, useCallback } from 'react';
import Survey from './Survey';
import InfoCard from './InfoCard';
import { useGetInventoryEntries } from '../hooks/useAcude';
import "../styles/Recomendations.css"
const RecommendationSystem = () => {
  const [showSurvey, setShowSurvey] = useState(true); // Nuevo estado para controlar la visibilidad de la encuesta
  const [recommendations, setRecommendations] = useState([]);
  const { entries: acudes, loading } = useGetInventoryEntries();

  const calculateRecommendations = useCallback((answers) => {
    // console.log('Calculating recommendations with answers:', answers);

    if (acudes.length === 0) {
      console.log('No hay ACUDEs disponibles para recomendar');
      return;
    }

    const scoredAcudes = acudes.map(acude => {
      let score = 0;

      Object.entries(answers).forEach(([_, answerData]) => {
        const { answer, category } = answerData;

        switch (category) {
          case 'preferencia':
            if (
              (answer.toLowerCase().includes('deporte') && acude.category === 'Deporte') ||
              (answer.toLowerCase().includes('artísticos') && acude.category === 'Cultura') ||
              answer.toLowerCase().includes('ambas')
            ) {
              score += 1;
            }
            break;
          case 'horario':
            if (
              (answer.toLowerCase().includes('mañana') && acude.schedule.some(s => s.time.toLowerCase().includes('am'))) ||
              (answer.toLowerCase().includes('tarde') && acude.schedule.some(s => s.time.toLowerCase().includes('pm'))) ||
              answer.toLowerCase().includes('noche')
            ) {
              score += acude.weights.horario;
            }
            break;
          case 'modalidad':
            if (
              (answer.toLowerCase().includes('cuenta') && acude.weights.dependencies < 0.5) ||
              (answer.toLowerCase().includes('grupo') && acude.weights.dependencies >= 0.5) ||
              answer.toLowerCase().includes('depende')
            ) {
              score += acude.weights.modalidad;
            }
            break;
          case 'compromiso':
            const commitmentLevel = acude.weights.modalidad;
            if (
              (answer.toLowerCase().includes('casual') && commitmentLevel < 0.4) ||
              (answer.toLowerCase().includes('varias horas') && commitmentLevel >= 0.4 && commitmentLevel < 0.7) ||
              (answer.toLowerCase().includes('sumergirme') && commitmentLevel >= 0.7)
            ) {
              score += acude.weights.modalidad;
            }
            break;
        }
      });

      return { ...acude, score };
    });

    const topRecommendations = scoredAcudes
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    console.log('Top recommendations:', topRecommendations);
    setRecommendations(topRecommendations);
    setShowSurvey(false); // Oculta el formulario después de enviar
  }, [acudes]);

  if (loading) {
    return <div>Cargando ACUDEs...</div>;
  }

  return (
    <div className="recomendations-container">
      <h1 className="text-2xl font-bold">Sistema de Recomendación de ACUDEs</h1>
      {showSurvey ? (
        <Survey onSubmit={calculateRecommendations} />
      ) : (
        recommendations.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Recomendaciones para ti:</h2>
            <div >
              <div className='recommendations-list'>
                {recommendations.map(acude => (
                  <InfoCard key={acude.id} {...acude} />
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default RecommendationSystem;
