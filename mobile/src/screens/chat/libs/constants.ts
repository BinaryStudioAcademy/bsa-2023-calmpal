const PREVIOUS_USER = 1;

const DEFAULT_VALUES = {
  text: '',
};

const MOCKED_DATA = [
  {
    id: 1,
    isUser: true,
    message:
      'Hi, Doctor. I’ve been feeling really down lately, and I’m not sure why. Can you help me? 😢😭',
  },
  {
    id: 2,
    isUser: false,
    message:
      'Of course! I’m here to support you. 🙂 Can you tell me more about how you’ve been feeling? Any specific symptoms or changes in your daily life?',
  },
  {
    id: 3,
    isUser: true,
    message: 'Ok, here’s the symptoms for me',
  },
  {
    id: 4,
    isUser: true,
    message: 'I’ll be there in 2 mins ⏰',
  },
  {
    id: 5,
    isUser: false,
    message:
      'I’ve been experiencing persistent sadness, loss of interest in things I used to enjoy. It’s been affecting my work and relationships too!! 💊❌😵',
  },
  {
    id: 6,
    isUser: true,
    message: '😵',
  },
];

export { DEFAULT_VALUES, MOCKED_DATA, PREVIOUS_USER };
