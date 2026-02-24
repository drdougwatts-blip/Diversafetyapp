import { SymptomCategory } from '../types';

export const symptomCategories: SymptomCategory[] = [
  {
    name: 'Musculoskeletal',
    symptoms: [
      { id: 'joint_pain', label: 'Joint or limb pain', isNeurological: false },
      { id: 'shoulder_pain', label: 'Shoulder pain', isNeurological: false },
      { id: 'fatigue', label: 'Unusual fatigue or exhaustion', isNeurological: false },
    ],
  },
  {
    name: 'Neurological',
    symptoms: [
      { id: 'numbness', label: 'Numbness or tingling (pins and needles)', isNeurological: true },
      { id: 'weakness', label: 'Weakness in arms or legs', isNeurological: true },
      { id: 'balance', label: 'Difficulty walking or balance problems', isNeurological: true },
      { id: 'dizziness', label: 'Dizziness or vertigo', isNeurological: true },
      { id: 'visual', label: 'Visual disturbance (blurred vision, blind spots)', isNeurological: true },
      { id: 'speech', label: 'Difficulty speaking or confusion', isNeurological: true },
      { id: 'bladder', label: 'Bladder difficulty (inability to urinate)', isNeurological: true },
      { id: 'consciousness', label: 'Loss of consciousness (even briefly)', isNeurological: true },
    ],
  },
  {
    name: 'Skin',
    symptoms: [
      { id: 'rash', label: 'Skin rash or mottling (marbling pattern)', isNeurological: false },
      { id: 'itching', label: 'Itching', isNeurological: false },
    ],
  },
  {
    name: 'Cardiopulmonary',
    symptoms: [
      { id: 'chest_pain', label: 'Chest pain or tightness', isNeurological: false },
      { id: 'breathing', label: 'Difficulty breathing or shortness of breath', isNeurological: false },
      { id: 'cough', label: 'Cough (especially with blood)', isNeurological: false },
    ],
  },
  {
    name: 'Other',
    symptoms: [
      { id: 'nausea', label: 'Nausea or vomiting', isNeurological: false },
      { id: 'headache', label: 'Headache', isNeurological: false },
      { id: 'hearing', label: 'Hearing changes or ringing in ears', isNeurological: false },
    ],
  },
];
