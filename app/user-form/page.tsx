"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'animate.css';
import anime from 'animejs';
import styles from './form.module.css';

const UserForm = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    responses: string;
    firstName: string;
    lastName: string;
    age: string;
    postalCode: string;
    educationPreference: string;
    willingToRelocate: string;
    favoriteClasses: string[];
    toolSkill: string;
    physicalTaskComfort: string;
    mechanicalSkill: string;
    manualToolSkill: string;
    manualDexterity: string;
    machineComfort: string;
    dirtyHandsWillingness: string;
    programmingToolsInterest: string;
    specializedMachineInterest: string;
    taskMeticulousness: string;
    equipmentMaintenanceInterest: string;
    physicalEffortValue: string;
    personalProtectionComfort: string;
    emotionalExpression: string;
    writingSkill: string;
    imaginationSkill: string;
    newIdeasInterest: string;
    artisticActivities: string;
    musicalSkill: string;
    artisticWorkComfort: string;
    artInspiration: string;
    creativeFreedomValue: string;
    artisticToolsInterest: string;
    innovativeProblemSolving: string;
    originality: string;
    creativityMotivation: string;
    empathy: string;
    careForOthers: string;
    socialSkills: string;
    patience: string;
    socialServicesWillingness: string;
    interpersonalSkills: string;
    knowledgeSharing: string;
    emotionalExhaustion: string;
    humanitarianism: string;
    emotionalSupportWork: string;
    openCommunicationPreference: string;
    experimentComfort: string;
    learningDrive: string;
    mathPhysicsSkill: string;
    academicPerformance: string;
    researchCareerInterest: string;
    factFindingInterest: string;
    continuousLearningSatisfaction: string;
    softwareToolsSatisfaction: string;
    practicalApplicationConfidence: string;
    examPreparation: string;
    analyticalSkill: string;
    debateInterest: string;
    attentionToDetail: string;
    followingInstructions: string;
    goalPrecision: string;
    officeEquipmentSkill: string;
    proceduresComfort: string;
    administrativeSkill: string;
    fileManagementSkill: string;
    logisticsSkill: string;
    routineTaskComfort: string;
    organizationSkill: string;
    officeWorkInterest: string;
    structuredEnvironmentComfort: string;
    careerStabilityValue: string;
    entrepreneurInterest: string;
    salesSkill: string;
    influenceAbility: string;
    leadershipConfidence: string;
    socialStatusEffort: string;
    growthOpportunityIdentification: string;
    ideaTransformationMotivation: string;
    independentWorkPreference: string;
    negotiationSkill: string;
    businessTrendsInterest: string;
    materialSuccessValue: string;
    authorityPreference: string;
    ambitionPursuit: string;
    decisionMaking: string;
  }>({
    name: '',
    email: '',
    responses: '',
    firstName: '',
    lastName: '',
    age: '',
    postalCode: '',
    educationPreference: '',
    willingToRelocate: '',
    favoriteClasses: [],
    toolSkill: '',
    physicalTaskComfort: '',
    mechanicalSkill: '',
    manualToolSkill: '',
    manualDexterity: '',
    machineComfort: '',
    dirtyHandsWillingness: '',
    programmingToolsInterest: '',
    specializedMachineInterest: '',
    taskMeticulousness: '',
    equipmentMaintenanceInterest: '',
    physicalEffortValue: '',
    personalProtectionComfort: '',
    emotionalExpression: '',
    writingSkill: '',
    imaginationSkill: '',
    newIdeasInterest: '',
    artisticActivities: '',
    musicalSkill: '',
    artisticWorkComfort: '',
    artInspiration: '',
    creativeFreedomValue: '',
    artisticToolsInterest: '',
    innovativeProblemSolving: '',
    originality: '',
    creativityMotivation: '',
    empathy: '',
    careForOthers: '',
    socialSkills: '',
    patience: '',
    socialServicesWillingness: '',
    interpersonalSkills: '',
    knowledgeSharing: '',
    emotionalExhaustion: '',
    humanitarianism: '',
    emotionalSupportWork: '',
    openCommunicationPreference: '',
    experimentComfort: '',
    learningDrive: '',
    mathPhysicsSkill: '',
    academicPerformance: '',
    researchCareerInterest: '',
    factFindingInterest: '',
    continuousLearningSatisfaction: '',
    softwareToolsSatisfaction: '',
    practicalApplicationConfidence: '',
    examPreparation: '',
    analyticalSkill: '',
    debateInterest: '',
    attentionToDetail: '',
    followingInstructions: '',
    goalPrecision: '',
    officeEquipmentSkill: '',
    proceduresComfort: '',
    administrativeSkill: '',
    fileManagementSkill: '',
    logisticsSkill: '',
    routineTaskComfort: '',
    organizationSkill: '',
    officeWorkInterest: '',
    structuredEnvironmentComfort: '',
    careerStabilityValue: '',
    entrepreneurInterest: '',
    salesSkill: '',
    influenceAbility: '',
    leadershipConfidence: '',
    socialStatusEffort: '',
    growthOpportunityIdentification: '',
    ideaTransformationMotivation: '',
    independentWorkPreference: '',
    negotiationSkill: '',
    businessTrendsInterest: '',
    materialSuccessValue: '',
    authorityPreference: '',
    ambitionPursuit: '',
    decisionMaking: ''
  });

  useEffect(() => {
    anime({
      targets: '.form-container input, .form-container textarea, .form-container button',
      translateY: [20, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      delay: anime.stagger(100),
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (e.target instanceof HTMLInputElement && type === 'checkbox') {
      const checked = e.target.checked;
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? [...prevData[name], value] : prevData[name].filter((item: string) => item !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName) {
      alert('Por favor, completa los campos de nombre y apellido.');
      return;
    }

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    const dataToSend = {
      ...formData,
      name: fullName,
    };

    console.log("Datos enviados:", dataToSend);

    // Guardar datos en localStorage
    localStorage.setItem('formData', JSON.stringify(dataToSend));

    try {
      const response = await fetch('/api/saveresponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        alert('¡Formulario enviado exitosamente!');
        router.push('/examples/all');
      } else {
        alert('Error al enviar el formulario.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  return (
    <form className="form-container animate__animated animate__fadeIn" onSubmit={handleSubmit} style={formStyles}>
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="firstName"
        placeholder="Nombre(s)"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Apellido(s)"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="age"
        placeholder="Edad"
        value={formData.age}
        onChange={handleChange}
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Código Postal"
        value={formData.postalCode}
        onChange={handleChange}
      />
      
      <label>¿Qué tipo de educación te interesa tener?</label>
      <select name="educationPreference" value={formData.educationPreference} onChange={handleChange}>
        <option value="">Selecciona una opción</option>
        <option value="Presencial">Presencial</option>
        <option value="En línea">En línea</option>
        <option value="Mixta">Mixta</option>
        <option value="Sin preferencia">Sin preferencia</option>
      </select>

      <label>¿Estarías dispuesto a trasladarte a otro estado o municipio en busca de oportunidades escolares y laborales?</label>
      <div>
        <input
          type="radio"
          id="relocateYes"
          name="willingToRelocate"
          value="Sí"
          checked={formData.willingToRelocate === 'Sí'}
          onChange={handleChange}
        />
        <label htmlFor="relocateYes">Sí</label>
        <input
          type="radio"
          id="relocateNo"
          name="willingToRelocate"
          value="No"
          checked={formData.willingToRelocate === 'No'}
          onChange={handleChange}
        />
        <label htmlFor="relocateNo">No</label>
      </div>

      <label>¿Cuáles son las clases que más se te facilitan y las que más te gustan?</label>
      <div>
        {[
          'Física', 'Química', 'Estadística y probabilidad', 'Informática aplicada', 'Geografía',
          'Álgebra', 'Biología', 'Biología humana', 'Matemáticas', 'Cálculo diferencial',
          'Cálculo integral', 'Sociología', 'Filosofía', 'Historia', 'Derecho', 'Comunicación y medios',
          'Educación Física', 'Salud integral del adolescente', 'Metodología de la investigación',
          'Ética', 'Taller de lectura y redacción', 'Inglés', 'Psicología', 'Economía', 'Ecología y Medio Ambiente',
          'Introducción de Ciencias Sociales', 'Administración empresarial', 'Contabilidad', 'Electrónica Industrial',
          'Expresión gráfica industrial', 'Informática', 'Mecatrónica', 'Sistemas automáticos',
          'Sistemas electrónicos', 'Artes', 'Etimologías grecolatinas', 'Estructura socioeconómica y política de México',
          'Lógica', 'Dibujo', 'Orientación educativa', 'Lenguaje adicional al español', 'Problemas sociales, políticos y económicos de México'
        ].map((classItem) => (
          <div key={classItem}>
            <input
              type="checkbox"
              name="favoriteClasses"
              value={classItem}
              checked={formData.favoriteClasses.includes(classItem)}
              onChange={handleChange}
            />
            <label>{classItem}</label>
          </div>
        ))}
      </div>
      <label>¿Cómo te desenvuelves usando herramientas como destornilladores, llaves inglesas o martillos?</label>
<select name="toolSkill" value={formData.toolSkill} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy mal">Muy mal</option>
  <option value="Mal">Mal</option>
  <option value="Neutral">Neutral</option>
  <option value="Bien">Bien</option>
  <option value="Muy bien">Muy bien</option>
</select>
<label>Si tu trabajo requiere levantar y mover objetos pesados o realizar tareas como cavar y cargar, ¿cómo te sentirías al respecto?</label>
<select name="physicalTaskComfort" value={formData.physicalTaskComfort} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Cómo describirías tu habilidad mecánica si te piden arreglar una bicicleta descompuesta?</label>
<select name="mechanicalSkill" value={formData.mechanicalSkill} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy limitada">Muy limitada</option>
  <option value="Limitada">Limitada</option>
  <option value="Neutral">Neutral</option>
  <option value="Buena">Buena</option>
  <option value="Muy buena">Muy buena</option>
</select>
<label>¿Qué tan bueno(a) eres para usar herramientas manuales o eléctricas como usar un taladro o una sierra?</label>
<select name="manualToolSkill" value={formData.manualToolSkill} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy malo(a)">Muy malo(a)</option>
  <option value="Malo(a)">Malo(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Bueno(a)">Bueno(a)</option>
  <option value="Muy bueno(a)">Muy bueno(a)</option>
</select>
<label>¿Qué tan bueno(a) eres para utilizar tu destreza manual si estás trabajando en un proyecto que requiere precisión?</label>
<select name="manualDexterity" value={formData.manualDexterity} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy malo(a)">Muy malo(a)</option>
  <option value="Malo(a)">Malo(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Bueno(a)">Bueno(a)</option>
  <option value="Muy bueno(a)">Muy bueno(a)</option>
</select>
<label>¿Qué tan cómodo(a) te sientes trabajando con maquinaria motorizada?</label>
<select name="machineComfort" value={formData.machineComfort} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy incómodo(a)">Muy incómodo(a)</option>
  <option value="Incómodo(a)">Incómodo(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Cómodo(a)">Cómodo(a)</option>
  <option value="Muy cómodo(a)">Muy cómodo(a)</option>
</select>
<label>¿Qué tan dispuesto(a) estás a ensuciarte las manos para completar tareas laborales si tu trabajo implicara manejar grasas de automóviles, tierra o pintura?</label>
<select name="dirtyHandsWillingness" value={formData.dirtyHandsWillingness} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Nada dispuesto(a)">Nada dispuesto(a)</option>
  <option value="Poco dispuesto(a)">Poco dispuesto(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Dispuesto(a)">Dispuesto(a)</option>
  <option value="Muy dispuesto(a)">Muy dispuesto(a)</option>
</select>
<label>¿Cuánto deseas trabajar con herramientas como lenguajes de programación, de Inteligencia Artificial, hardware y software?</label>
<select name="programmingToolsInterest" value={formData.programmingToolsInterest} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy desinteresado(a)">Muy desinteresado(a)</option>
  <option value="Desinteresado(a)">Desinteresado(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Deseoso(a)">Deseoso(a)</option>
  <option value="Muy deseoso(a)">Muy deseoso(a)</option>
</select>
<label>¿Qué tan interesado(a) estarías en desempeñar un trabajo que involucre el manejo de maquinaria especializada?</label>
<select name="specializedMachineInterest" value={formData.specializedMachineInterest} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy desinteresado(a)">Muy desinteresado(a)</option>
  <option value="Desinteresado(a)">Desinteresado(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Interesado(a)">Interesado(a)</option>
  <option value="Muy interesado(a)">Muy interesado(a)</option>
</select>
<label>¿Qué tan importante es para ti ser meticuloso(a) y cuidadoso(a) en la ejecución de tus tareas diarias en un entorno laboral o académico?</label>
<select name="taskMeticulousness" value={formData.taskMeticulousness} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy insignificante">Muy insignificante</option>
  <option value="Insignificante">Insignificante</option>
  <option value="Neutral">Neutral</option>
  <option value="Importante">Importante</option>
  <option value="Muy importante">Muy importante</option>
</select>
<label>¿Te interesa encargarte del mantenimiento regular de equipos de cómputo y sistemas electrónicos?</label>
<select name="equipmentMaintenanceInterest" value={formData.equipmentMaintenanceInterest} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy desinteresado(a)">Muy desinteresado(a)</option>
  <option value="Desinteresado(a)">Desinteresado(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Interesado(a)">Interesado(a)</option>
  <option value="Muy interesado(a)">Muy interesado(a)</option>
</select>
<label>¿Cuánto valoras el esfuerzo físico en el trabajo?</label>
<select name="physicalEffortValue" value={formData.physicalEffortValue} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy infravalorado">Muy infravalorado</option>
  <option value="Infravalorado">Infravalorado</option>
  <option value="Neutral">Neutral</option>
  <option value="Valorado">Valorado</option>
  <option value="Muy valorado">Muy valorado</option>
</select>
<label>¿Qué tan cómodo(a) te sientes utilizando equipo de protección personal?</label>
<select name="personalProtectionComfort" value={formData.personalProtectionComfort} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy incómodo(a)">Muy incómodo(a)</option>
  <option value="Incómodo(a)">Incómodo(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Cómodo(a)">Cómodo(a)</option>
  <option value="Muy cómodo(a)">Muy cómodo(a)</option>
</select>
<label>¿Cómo evaluarías tu capacidad para expresar tus emociones?</label>
<select name="emotionalExpression" value={formData.emotionalExpression} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy baja">Muy baja</option>
  <option value="Baja">Baja</option>
  <option value="Neutral">Neutral</option>
  <option value="Alta">Alta</option>
  <option value="Muy alta">Muy alta</option>
</select>
<label>¿Cómo evaluarías tus destrezas para escribir literatura como poesía, prosa, cuentos o humor?</label>
<select name="writingSkill" value={formData.writingSkill} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy bajas">Muy bajas</option>
  <option value="Bajas">Bajas</option>
  <option value="Neutras">Neutras</option>
  <option value="Altas">Altas</option>
  <option value="Muy altas">Muy altas</option>
</select>
<label>¿Cómo evaluarías tu capacidad para utilizar la imaginación?</label>
<select name="imaginationSkill" value={formData.imaginationSkill} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy baja">Muy baja</option>
  <option value="Baja">Baja</option>
  <option value="Neutral">Neutral</option>
  <option value="Alta">Alta</option>
  <option value="Muy alta">Muy alta</option>
</select>
<label>¿Disfrutas explorar nuevas ideas y conceptos que no han sido explorados por otros antes?</label>
<select name="newIdeasInterest" value={formData.newIdeasInterest} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Qué tanto disfrutas tomar parte en actividades artísticas como obras de teatro, bandas musicales o clubes de lectura, etc.?</label>
<select name="artisticActivities" value={formData.artisticActivities} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Es muy aburrido">Es muy aburrido</option>
  <option value="Es aburrido">Es aburrido</option>
  <option value="Neutral">Neutral</option>
  <option value="Lo disfruto">Lo disfruto</option>
  <option value="Lo disfruto mucho">Lo disfruto mucho</option>
</select>
<label>¿Qué tan desarrollada sientes tu habilidad para ejecutar un instrumento musical?</label>
<select name="musicalSkill" value={formData.musicalSkill} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy subdesarrollada">Muy subdesarrollada</option>
  <option value="Subdesarrollada">Subdesarrollada</option>
  <option value="Neutral">Neutral</option>
  <option value="Desarrollada">Desarrollada</option>
  <option value="Muy desarrollada">Muy desarrollada</option>
</select>
<label>¿Te sentirías cómodo(a) trabajando en una galería de arte, un estudio de música o una casa editorial en el que todo el tiempo tratarías con creaciones artísticas?</label>
<select name="artisticWorkComfort" value={formData.artisticWorkComfort} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy incómodo(a)">Muy incómodo(a)</option>
  <option value="Incómodo(a)">Incómodo(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Cómodo(a)">Cómodo(a)</option>
  <option value="Muy cómodo(a)">Muy cómodo(a)</option>
</select>
<label>¿Te sientes inspirado cuando estás rodeado de obras de arte y cultura?</label>
<select name="artInspiration" value={formData.artInspiration} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Valoras más la libertad creativa en el trabajo que la estabilidad financiera?</label>
<select name="creativeFreedomValue" value={formData.creativeFreedomValue} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Disfrutas usar herramientas artísticas, como pinceles, cámaras o software de diseño?</label>
<select name="artisticToolsInterest" value={formData.artisticToolsInterest} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Prefieres resolver problemas a través de métodos innovadores y no convencionales?</label>
<select name="innovativeProblemSolving" value={formData.innovativeProblemSolving} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Consideras que la originalidad es una de tus principales características?</label>
<select name="originality" value={formData.originality} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Te motiva usar la creatividad para generar ideas únicas y atractivas en proyectos?</label>
<select name="creativityMotivation" value={formData.creativityMotivation} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Qué tan fácil te resulta ponerte en el lugar de los demás y comprender sus sentimientos y perspectivas?</label>
<select name="empathy" value={formData.empathy} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy difícil">Muy difícil</option>
  <option value="Difícil">Difícil</option>
  <option value="Neutral">Neutral</option>
  <option value="Fácil">Fácil</option>
  <option value="Muy fácil">Muy fácil</option>
</select>
<label>¿Qué tan importante es para ti mostrar preocupación y cuidado por los demás como ayudar a tus amigos o familiares cuando necesitan apoyo emocional o práctico?</label>
<select name="careForOthers" value={formData.careForOthers} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy insignificante">Muy insignificante</option>
  <option value="Insignificante">Insignificante</option>
  <option value="Neutral">Neutral</option>
  <option value="Importante">Importante</option>
  <option value="Muy importante">Muy importante</option>
</select>
<label>¿Consideras que tus destrezas sociales te permiten relacionarte fácilmente con las personas?</label>
<select name="socialSkills" value={formData.socialSkills} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Te consideras capaz de escuchar y entender a los demás con paciencia, especialmente en situaciones de asesoramiento?</label>
<select name="patience" value={formData.patience} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Evitas tomar decisiones precipitadas cuando sabes que puedes afectar a otras personas?</label>
<select name="decisionMaking" value={formData.decisionMaking} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Estás dispuesto(a) a trabajar en una carrera que implique prestar servicios sociales como la asistencia social o la enseñanza?</label>
<select name="socialServicesWillingness" value={formData.socialServicesWillingness} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy indispuesto(a)">Muy indispuesto(a)</option>
  <option value="Indispuesto(a)">Indispuesto(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Dispuesto(a)">Dispuesto(a)</option>
  <option value="Muy dispuesto(a)">Muy dispuesto(a)</option>
</select>
<label>¿Qué tan fuertes consideras tus dotes para las relaciones interpersonales como el resolver conflictos entre amigos o colegas y mantener buenas relaciones a pesar de las diferencias?</label>
<select name="interpersonalSkills" value={formData.interpersonalSkills} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy carente">Muy carente</option>
  <option value="Carente">Carente</option>
  <option value="Neutral">Neutral</option>
  <option value="Dotado(a)">Dotado(a)</option>
  <option value="Muy dotado(a)">Muy dotado(a)</option>
</select>
<label>¿Disfrutas compartir conocimientos y experiencias con otros para ayudarles a aprender y crecer?</label>
<select name="knowledgeSharing" value={formData.knowledgeSharing} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Consideras que dedicarte a ayudar a las personas puede ser emocionalmente agotador?</label>
<select name="emotionalExhaustion" value={formData.emotionalExhaustion} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
</select>
<label>¿Qué tan importante es para ti el humanitarismo?</label>
<select name="humanitarianism" value={formData.humanitarianism} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy insignificante">Muy insignificante</option>
  <option value="Insignificante">Insignificante</option>
  <option value="Neutral">Neutral</option>
  <option value="Importante">Importante</option>
  <option value="Muy importante">Muy importante</option>
</select>
<label>¿Te gustaría estar en una situación de empleo donde puedas brindar apoyo emocional y psicológico a las personas?</label>
<select name="emotionalSupportWork" value={formData.emotionalSupportWork} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Prefieres trabajar en entornos que fomenten la comunicación abierta y la colaboración entre colegas?</label>
<select name="openCommunicationPreference" value={formData.openCommunicationPreference} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Qué tan cómodo te sientes llevando a cabo experimentos?</label>
<select name="experimentComfort" value={formData.experimentComfort} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy incómodo">Muy incómodo</option>
  <option value="Incómodo">Incómodo</option>
  <option value="Neutral">Neutral</option>
  <option value="Cómodo">Cómodo</option>
  <option value="Muy cómodo">Muy cómodo</option>
</select>
<label>¿Qué tan fuerte es tu impulso por explorar, aprender y descubrir cosas en sitios como internet, libros, artículos científicos, cursos, revistas de divulgación, etc.?</label>
<select name="learningDrive" value={formData.learningDrive} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy bajo">Muy bajo</option>
  <option value="Bajo">Bajo</option>
  <option value="Neutral">Neutral</option>
  <option value="Alto">Alto</option>
  <option value="Muy alto">Muy alto</option>
</select>
<label>¿Cómo calificarías tu habilidad para resolver problemas de matemáticas y física de manera efectiva?</label>
<select name="mathPhysicsSkill" value={formData.mathPhysicsSkill} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy baja">Muy baja</option>
  <option value="Baja">Baja</option>
  <option value="Neutral">Neutral</option>
  <option value="Alta">Alta</option>
  <option value="Muy alta">Muy alta</option>
</select>
<label>¿Te consideras alguien destacado en tus estudios académicos al resto de tus compañeros?</label>
<select name="academicPerformance" value={formData.academicPerformance} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Qué tan interesado(a) estás en trabajar en una carrera que implique investigación y análisis de datos?</label>
<select name="researchCareerInterest" value={formData.researchCareerInterest} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy desinteresado(a)">Muy desinteresado(a)</option>
  <option value="Poco interesado(a)">Poco interesado(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Interesado(a)">Interesado(a)</option>
  <option value="Muy interesado(a)">Muy interesado(a)</option>
</select>
<label>¿Qué tan interesado(a) estás en descubrir hechos y obtener información precisa?</label>
<select name="factFindingInterest" value={formData.factFindingInterest} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Nada interesado(a)">Nada interesado(a)</option>
  <option value="Poco interesado(a)">Poco interesado(a)</option>
  <option value="Moderadamente interesado(a)">Moderadamente interesado(a)</option>
  <option value="Interesado(a)">Interesado(a)</option>
  <option value="Muy interesado(a)">Muy interesado(a)</option>
</select>
<label>¿Encuentras satisfactorio el proceso de aprender continuamente y expandir tus conocimientos?</label>
<select name="continuousLearningSatisfaction" value={formData.continuousLearningSatisfaction} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy insatisfecho(a)">Muy insatisfecho(a)</option>
  <option value="Insatisfecho(a)">Insatisfecho(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Satisfecho(a)">Satisfecho(a)</option>
  <option value="Muy satisfecho(a)">Muy satisfecho(a)</option>
</select>
<label>¿Encuentras gratificante usar herramientas de software para analizar información y realizar investigaciones?</label>
<select name="softwareToolsSatisfaction" value={formData.softwareToolsSatisfaction} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy desagradable">Muy desagradable</option>
  <option value="Desagradable">Desagradable</option>
  <option value="Neutral">Neutral</option>
  <option value="Gratificante">Gratificante</option>
  <option value="Muy gratificante">Muy gratificante</option>
</select>
<label>¿Qué tan seguro(a) te sientes aplicando tus conocimientos escolares y académicos en situaciones prácticas?</label>
<select name="practicalApplicationConfidence" value={formData.practicalApplicationConfidence} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy inseguro(a)">Muy inseguro(a)</option>
  <option value="Inseguro(a)">Inseguro(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Seguro(a)">Seguro(a)</option>
  <option value="Muy seguro(a)">Muy seguro(a)</option>
</select>
<label>¿Qué tan bien comprendes y retienes la información necesaria para prepararte y rendir bien en el examen?</label>
<select name="examPreparation" value={formData.examPreparation} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy mal">Muy mal</option>
  <option value="Mal">Mal</option>
  <option value="Neutral">Neutral</option>
  <option value="Bien">Bien</option>
  <option value="Muy bien">Muy bien</option>
</select>
<label>¿Qué tan analítico(a) te consideras al resolver problemas o tomar decisiones?</label>
<select name="analyticalSkill" value={formData.analyticalSkill} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy sintético(a)">Muy sintético(a)</option>
  <option value="Sintético(a)">Sintético(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Analítico(a)">Analítico(a)</option>
  <option value="Muy analítico(a)">Muy analítico(a)</option>
</select>
<label>¿Disfrutas participar en debates y discusiones que requieren un análisis profundo y reflexivo?</label>
<select name="debateInterest" value={formData.debateInterest} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Cómo evaluarías tu nivel de atención a los detalles y tu capacidad para ser minucioso en tus tareas y proyectos?</label>
<select name="attentionToDetail" value={formData.attentionToDetail} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy baja">Muy baja</option>
  <option value="Baja">Baja</option>
  <option value="Neutral">Neutral</option>
  <option value="Alta">Alta</option>
  <option value="Muy alta">Muy alta</option>
</select>
<label>¿Qué tan bien crees que sigues instrucciones y procedimientos en diferentes tareas y proyectos?</label>
<select name="followingInstructions" value={formData.followingInstructions} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy mal">Muy mal</option>
  <option value="Mal">Mal</option>
  <option value="Neutral">Neutral</option>
  <option value="Bien">Bien</option>
  <option value="Muy bien">Muy bien</option>
</select>
<label>¿Cómo evaluarías tu capacidad para ajustarte a modelos o metas precisas en tus tareas y proyectos?</label>
<select name="goalPrecision" value={formData.goalPrecision} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy baja">Muy baja</option>
  <option value="Baja">Baja</option>
  <option value="Neutral">Neutral</option>
  <option value="Alta">Alta</option>
  <option value="Muy alta">Muy alta</option>
</select>
<label>¿Cómo calificarías tu habilidad para manejar aparatos de oficina como laptops, impresoras, fotocopiadoras, etc.?</label>
<select name="officeEquipmentSkill" value={formData.officeEquipmentSkill} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy baja">Muy baja</option>
  <option value="Baja">Baja</option>
  <option value="Neutral">Neutral</option>
  <option value="Alta">Alta</option>
  <option value="Muy alta">Muy alta</option>
</select>
<label>¿Te sientes cómodo(a) trabajando en entornos donde se requiere seguir procedimientos establecidos y cumplir con reglas y normativas específicas?</label>
<select name="proceduresComfort" value={formData.proceduresComfort} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy incómodo(a)">Muy incómodo(a)</option>
  <option value="Incómodo(a)">Incómodo(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Cómodo(a)">Cómodo(a)</option>
  <option value="Muy cómodo(a)">Muy cómodo(a)</option>
</select>
<label>¿Qué tan hábil te consideras para realizar tareas administrativas con orden y precisión en un entorno profesional como organizar documentos, llenar formularios con información precisa y mantener un registro actualizado de las actividades diarias?</label>
<select name="administrativeSkill" value={formData.administrativeSkill} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy inhábil">Muy inhábil</option>
  <option value="Inhábil">Inhábil</option>
  <option value="Neutral">Neutral</option>
  <option value="Hábil">Hábil</option>
  <option value="Muy hábil">Muy hábil</option>
</select>
<label>¿Qué tan efectivo(a) te consideras en el manejo ordenado y sistemático de archivos y registros utilizando software de gestión?</label>
<select name="fileManagementSkill" value={formData.fileManagementSkill} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Nada efectivo(a)">Nada efectivo(a)</option>
  <option value="Algo efectivo(a)">Algo efectivo(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Efectivo(a)">Efectivo(a)</option>
  <option value="Muy efectivo(a)">Muy efectivo(a)</option>
</select>
<label>Eres el responsable de la logística en una empresa de distribución de alimentos. Debes coordinar la recepción de mercancías, la gestión de almacenes y la entrega puntual a clientes en toda la región. ¿Cómo calificarías tu habilidad para llevar a cabo tareas administrativas de manera práctica y eficiente en una situación como esta?</label>
<select name="logisticsSkill" value={formData.logisticsSkill} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy baja">Muy baja</option>
  <option value="Baja">Baja</option>
  <option value="Neutral">Neutral</option>
  <option value="Alta">Alta</option>
  <option value="Muy alta">Muy alta</option>
</select>
<label>¿Qué tan cómodo(a) te sientes al llevar a cabo actividades rutinarias en tu trabajo o estudio diario, como ingresar datos en un sistema o verificar inventarios?</label>
<select name="routineTaskComfort" value={formData.routineTaskComfort} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy incómodo(a)">Muy incómodo(a)</option>
  <option value="Incómodo(a)">Incómodo(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Cómodo(a)">Cómodo(a)</option>
  <option value="Muy cómodo(a)">Muy cómodo(a)</option>
</select>
<label>¿Disfrutas organizar y planificar tu trabajo para asegurarte de cumplir con los objetivos establecidos?</label>
<select name="organizationSkill" value={formData.organizationSkill} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Te interesa trabajar en campos como la contabilidad, la administración o la gestión de oficinas que requieren actitudes como ser concreto y preciso?</label>
<select name="officeWorkInterest" value={formData.officeWorkInterest} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Qué tan cómodo(a) te sientes al trabajar en un ambiente estructurado y organizado donde todas las tareas están claramente definidas?</label>
<select name="structuredEnvironmentComfort" value={formData.structuredEnvironmentComfort} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy incómodo(a)">Muy incómodo(a)</option>
  <option value="Incómodo(a)">Incómodo(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Cómodo(a)">Cómodo(a)</option>
  <option value="Muy cómodo(a)">Muy cómodo(a)</option>
</select>
<label>¿Qué tanto valoras la estabilidad y seguridad en tu carrera o vida profesional?</label>
<select name="careerStabilityValue" value={formData.careerStabilityValue} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy infravalorado">Muy infravalorado</option>
  <option value="Infravalorado">Infravalorado</option>
  <option value="Neutral">Neutral</option>
  <option value="Valorado">Valorado</option>
  <option value="Muy valorado">Muy valorado</option>
</select>
<label>Si tienes una idea para un nuevo producto y la oportunidad de crear tu propia empresa para desarrollarlo y venderlo, ¿qué tan interesado(a) estarías en hacerlo?</label>
<select name="entrepreneurInterest" value={formData.entrepreneurInterest} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy desinteresado(a)">Muy desinteresado(a)</option>
  <option value="Desinteresado(a)">Desinteresado(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Interesado(a)">Interesado(a)</option>
  <option value="Muy interesado(a)">Muy interesado(a)</option>
</select>
<label>¿Qué tan eficaz te consideras en el arte de las ventas y en la persuasión de clientes?</label>
<select name="salesSkill" value={formData.salesSkill} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy ineficaz">Muy ineficaz</option>
  <option value="Ineficaz">Ineficaz</option>
  <option value="Neutral">Neutral</option>
  <option value="Eficaz">Eficaz</option>
  <option value="Muy eficaz">Muy eficaz</option>
</select>
<label>¿Cómo te sientes con respecto a tu capacidad para influir y generar impacto en situaciones y decisiones importantes?</label>
<select name="influenceAbility" value={formData.influenceAbility} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy limitado(a)">Muy limitado(a)</option>
  <option value="Limitado(a)">Limitado(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Amplio(a)">Amplio(a)</option>
  <option value="Muy amplio(a)">Muy amplio(a)</option>
</select>
<label>¿Qué tan seguro(a) te sientes al asumir roles de liderazgo como tomar decisiones, mantener una buena comunicación, ser empático, motivar a los trabajadores, resolver conflictos y tener visión estratégica?</label>
<select name="leadershipConfidence" value={formData.leadershipConfidence} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy inseguro(a)">Muy inseguro(a)</option>
  <option value="Inseguro(a)">Inseguro(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Seguro(a)">Seguro(a)</option>
  <option value="Muy seguro(a)">Muy seguro(a)</option>
</select>
<label>¿Te esfuerzas por mejorar tu posición social y ser visto(a) como una persona de éxito?</label>
<select name="socialStatusEffort" value={formData.socialStatusEffort} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>Imagina que eres dueño de una pequeña empresa, ¿serías capaz de identificar oportunidades y amenazas para impulsar su crecimiento?</label>
<select name="growthOpportunityIdentification" value={formData.growthOpportunityIdentification} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy incapaz">Muy incapaz</option>
  <option value="Incapaz">Incapaz</option>
  <option value="Neutral">Neutral</option>
  <option value="Capaz">Capaz</option>
  <option value="Muy capaz">Muy capaz</option>
</select>
<label>¿Te motiva el desafío de transformar ideas en realidades concretas y exitosas?</label>
<select name="ideaTransformationMotivation" value={formData.ideaTransformationMotivation} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Prefieres trabajar de manera independiente y tomar tus propias decisiones en lugar de seguir instrucciones?</label>
<select name="independentWorkPreference" value={formData.independentWorkPreference} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Te consideras una persona con habilidades para negociar y cerrar acuerdos?</label>
<select name="negotiationSkill" value={formData.negotiationSkill} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Disfrutas aprender sobre nuevas tendencias y tecnologías en el ámbito empresarial?</label>
<select name="businessTrendsInterest" value={formData.businessTrendsInterest} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Qué tan importante consideras la adquisición de bienes materiales y el éxito económico en tu vida como comprar una casa, adquirir un auto, vestir con ropa de calidad, etc.?</label>
<select name="materialSuccessValue" value={formData.materialSuccessValue} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy irrelevante">Muy irrelevante</option>
  <option value="Irrelevante">Irrelevante</option>
  <option value="Neutral">Neutral</option>
  <option value="Importante">Importante</option>
  <option value="Muy importante">Muy importante</option>
</select>
<label>¿Prefieres posiciones de autoridad donde puedas influir significativamente en el rumbo de una organización o grupo?</label>
<select name="authorityPreference" value={formData.authorityPreference} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy en desacuerdo">Muy en desacuerdo</option>
  <option value="En desacuerdo">En desacuerdo</option>
  <option value="Neutral">Neutral</option>
  <option value="De acuerdo">De acuerdo</option>
  <option value="Muy de acuerdo">Muy de acuerdo</option>
</select>
<label>¿Qué tan dispuesto(a) estás a perseguir metas ambiciosas y a esforzarte para lograr resultados destacados en tu carrera o estudios?</label>
<select name="ambitionPursuit" value={formData.ambitionPursuit} onChange={handleChange}>
  <option value="">Selecciona una opción</option>
  <option value="Muy indispuesto(a)">Muy indispuesto(a)</option>
  <option value="Indispuesto(a)">Indispuesto(a)</option>
  <option value="Neutral">Neutral</option>
  <option value="Dispuesto(a)">Dispuesto(a)</option>
  <option value="Muy dispuesto(a)">Muy dispuesto(a)</option>
</select>

      
      <button type="submit" style={buttonStyles}>
        Enviar
      </button>
    </form>
  );
};
const formStyles: React.CSSProperties = {
  maxWidth: '500px',
  margin: '50px auto',
  padding: '20px',
  background: '#f4f4f9',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
};

const inputStyles: React.CSSProperties = {
  padding: '10px',
  margin: '10px 0',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '16px',
};

const textareaStyles: React.CSSProperties = {
  ...inputStyles,
  resize: 'none',
  height: '100px',
};

const buttonStyles: React.CSSProperties = {
  padding: '10px',
  backgroundColor: '#5a67d8',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s',
};

export default UserForm;
