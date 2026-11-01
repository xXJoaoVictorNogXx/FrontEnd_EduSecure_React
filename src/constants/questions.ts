
export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'fácil':
    case 'facil':
      return 'text-green-600 dark:text-green-400'
    case 'médio':
    case 'medio':
      return 'text-orange-500 dark:text-orange-400'
    case 'difícil':
    case 'dificil':
      return 'text-red-500 dark:text-red-400'
    default:
      return 'text-muted-foreground'
  }
}


export const getMockTags = (category: string) => {
  if (category === 'AED-301') return ['#Complexidade', '#Ordenação']
  if (category === 'ENG-204') return ['#SOLID', '#POO']
  if (category === 'BDI-102') return ['#Normalização', '#SQL']
  if (category === 'MAT-101') return ['#Limites', '#Cálculo']
  return ['#Geral']
}
