import { wordsArr as words } from './words';

export function getRandomWord(): string[] {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].toUpperCase().split('');
}

export function getFarewellText(language: string): string {
  const options: string[] = [
    `🫡 Farewell, ${language}`,
    `💨 Adios, ${language}`,
    `😮‍💨 ${language}… it’s been a ride`,
    `🕊️ Rest easy, ${language}`,
    `😎 ${language}, you were cool`,
    `🎤 ${language} has left the building`,
    `🫶 We’ll miss you, ${language}`,
    `🌬️ ${language} faded into the air`,
    `🧢 ${language}, you did your thing`,
    `🌅 ${language} rode off into the sunset`,
    `🛡️ ${language}, your watch has ended`,
    `💥 ${language} bites the dust`,
  ];

  const randomIndex: number = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
