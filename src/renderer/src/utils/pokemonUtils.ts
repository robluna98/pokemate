export type Pokemon = {
  name: string
  types: string[]
  abilities: string[]
  moves: string[]
  sprites: string
}

export const getTypeColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'bug':
      return 'bg-lime-600'
    case 'dark':
      return 'bg-gray-800'
    case 'dragon':
      return 'bg-cyan-700'
    case 'electric':
      return 'bg-yellow-500'
    case 'fairy':
      return 'bg-pink-500'
    case 'fighting':
      return 'bg-orange-700'
    case 'fire':
      return 'bg-red-600'
    case 'flying':
      return 'bg-sky-500'
    case 'ghost':
      return 'bg-violet-900'
    case 'grass':
      return 'bg-green-600'
    case 'ground':
      return 'bg-amber-500'
    case 'ice':
      return 'bg-cyan-500'
    case 'normal':
      return 'bg-gray-700'
    case 'poison':
      return 'bg-purple-600'
    case 'psychic':
      return 'bg-pink-500'
    case 'rock':
      return 'bg-amber-700'
    case 'steel':
      return 'bg-sky-700'
    case 'water':
      return 'bg-blue-600'
    default:
      return 'bg-gray-700'
  }
}

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const formatMoveName = (move: string): string => {
  return move.split('-').map(capitalizeFirstLetter).join(' ')
}
