import { Question } from '../types';
import { questionsSimulado1 } from './questionsSimulado1';
import { questionsSimulado2 } from './questionsSimulado2';
import { questionsSimulado3 } from './questionsSimulado3';
import { questionsOneNote } from './questionsOneNote';

export { questionsSimulado1 } from './questionsSimulado1';
export { questionsSimulado2 } from './questionsSimulado2';
export { questionsSimulado3 } from './questionsSimulado3';
export { questionsOneNote } from './questionsOneNote';

/**
 * Coleção completa dos 150 itens de avaliação reformulados para a certificação AZ-104.
 * Cada um dos 3 simulados oficiais possui exatamente 50 questões estruturadas de acordo com
 * os pesos oficiais dos 5 domínios do exame:
 * - Domínio 1: Identidade & Governança (11 questões)
 * - Domínio 2: Armazenamento (9 questões)
 * - Domínio 3: Computação (11 questões)
 * - Domínio 4: Redes Virtuais (10 questões)
 * - Domínio 5: Monitoramento & Manutenção (9 questões)
 * 
 * - Simulado 1: Questões 1 a 50 (Exame Oficial 1)
 * - Simulado 2: Questões 51 a 100 (Exame Oficial 2)
 * - Simulado 3: Questões 101 a 150 (Exame Oficial 3)
 * 
 * Todas as questões foram estruturadas para nível elevado de análise técnica com cenários corporativos,
 * restrições de menor privilégio/custo e justificativas técnicas aprofundadas.
 */
export const allSimuladosQuestions: Question[] = [
  ...questionsSimulado1,
  ...questionsSimulado2,
  ...questionsSimulado3
];
