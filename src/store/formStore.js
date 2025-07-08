import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Default (trimmed) initial state – keep it short, we can extend gradually.
const validations = {
  1: {
    required: ['vorname', 'nachname', 'email', 'telefon'],
    email: ['email'],
    maxLength: {
      vorname: 60,
      nachname: 60,
      telefon: 30
    }
  },
  2: {
    required: ['kreditBetrag', 'laufzeit'],
    numeric: ['kreditBetrag', 'laufzeit'],
    ranges: {
      kreditBetrag: { min: 500, max: 100000 },
      laufzeit: { min: 6, max: 120 }
    }
  },
  // Diğer sayfalar için kurallar
};

const validateCurrentPage = (formData, step) => {
  const rules = validations[step];
  if (!rules) return { valid: true };

  // Zorunlu alanlar
  for (const field of rules.required) {
    if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
      return { valid: false, message: `Bitte geben Sie ${field} ein.` };
    }
  }

  // Email formatı
  if (rules.email) {
    for (const field of rules.email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field])) {
        return { valid: false, message: `Bitte geben Sie eine gültige E-Mail-Adresse ein.` };
      }
    }
  }

  // Sayısal alanlar
  if (rules.numeric) {
    for (const field of rules.numeric) {
      if (isNaN(parseFloat(formData[field]))) {
        return { valid: false, message: `${field} muss eine Zahl sein.` };
      }
    }
  }

  // Sayısal aralıklar
  if (rules.ranges) {
    for (const [field, { min, max }] of Object.entries(rules.ranges)) {
      const value = parseFloat(formData[field]);
      if (value < min || value > max) {
        return { valid: false, message: `${field} muss zwischen ${min} und ${max} liegen.` };
      }
    }
  }

  // Maksimum uzunluklar
  if (rules.maxLength) {
    for (const [field, max] of Object.entries(rules.maxLength)) {
      if (formData[field] && formData[field].length > max) {
        return { valid: false, message: `${field} darf nicht länger als ${max} Zeichen sein.` };
      }
    }
  }

  return { valid: true };
};

const defaultFormData = {
  applicants: '1',
  maritalStatus: 'ledig',
  blzPayout: '',
  adults: 1,
  children: 0,
  housingStatus: '',
  immobilieArt: '',
  immobilieFlaeche: '',
  hasRentalProperty: '',
  warmMiete: '',
  // Step 6 – Income
  berufsgruppe: '',
  nettoEinkommen: '',
  einkommensAbweichung: '',
  nebentaetigkeiten: 'nein',
  anzahlNebentaetigkeiten: 0,
  // Step 8 – Contact
  anrede: '',
  vorname: '',
  nachname: '',
  telefon: '',
  email: '',
  datenschutz: false,
  // Step 9 – Personal data
  geburtsdatum: '',
  // Step 10 – Address
  wohnland: '',
  strasse: '',
  plz: '',
  wohnort: '',
  wohnhaftSeit: '',
  // Step 11 – Professional activity
  employmentStatus: '',
  // Step 11 mandatory fields
  firmaArbeitgeber: '',
  plzArbeitgeber: '',
  beschaeftigung: '',
  // Step 14 bank details
  kontoinhaber: '',
  bankData: null, // IBAN API'sinden gelen banka verilerini tutmak için,
  ibanPayout: '',
  bankConnectionPayout: 'iban',
  kontoinhaber: '',
  bestehendeKrediteAnzahl: 0,
  kreditDetails: [],
  submissionId: null, // Will be filled upon successful submission
  // TODO: add the remaining ~150 fields step-by-step
};

const useFormStore = create(
  immer((set) => ({
    step: 1,
    formData: defaultFormData,
    submissionStatus: 'idle', // 'idle', 'submitting', 'success', 'error'
    errorNotification: '',

    // actions
    goToNextStep: () => {
      const validation = validateCurrentPage(get().formData, get().step);
      if (!validation.valid) {
        set({ errorNotification: validation.message });
        return;
      }
      set({ errorNotification: '' });
      set((state) => ({ step: state.step + 1 }));
    },
    goToPrevStep: () => {
      set((state) => ({ step: Math.max(1, state.step - 1) }));
    },
    // aliases for backward compatibility
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: state.step - 1 })),
    // direct set
    setStep: (newStep) => set({ step: newStep }),
    updateFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
    setSubmissionStatus: (status) => set({ submissionStatus: status }),
    resetForm: () => set({ formData: defaultFormData, step: 1, submissionStatus: 'idle' }),
  }))
);

export const selectFormData = (state) => state.formData;
export const selectStep = (state) => state.step;
export const selectSubmissionStatus = (state) => state.submissionStatus;
export { useFormStore };
export default useFormStore;
