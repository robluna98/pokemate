import bugIcon from '../assets/pokemon_types/bug_icon.png'
import darkIcon from '../assets/pokemon_types/dark_icon.png'
import dragonIcon from '../assets/pokemon_types/dragon_icon.png'
import electricIcon from '../assets/pokemon_types/electric_icon.png'
import fightingIcon from '../assets/pokemon_types/fighting_icon.png'
import fireIcon from '../assets/pokemon_types/fire_icon.png'
import flyingIcon from '../assets/pokemon_types/flying_icon.png'
import ghostIcon from '../assets/pokemon_types/ghost_icon.png'
import grassIcon from '../assets/pokemon_types/grass_icon.png'
import groundIcon from '../assets/pokemon_types/ground_icon.png'
import iceIcon from '../assets/pokemon_types/ice_icon.png'
import normalIcon from '../assets/pokemon_types/normal_icon.png'
import poisonIcon from '../assets/pokemon_types/poison_icon.png'
import psychicIcon from '../assets/pokemon_types/psychic_icon.png'
import rockIcon from '../assets/pokemon_types/rock_icon.png'
import steelIcon from '../assets/pokemon_types/steel_icon.png'
import waterIcon from '../assets/pokemon_types/water_icon.png'

import bugMoveIcon from '../assets/pokemon_move_types/bug_move_icon.png'
import darkMoveIcon from '../assets/pokemon_move_types/dark_move_icon.png'
import dragonMoveIcon from '../assets/pokemon_move_types/dragon_move_icon.png'
import electricMoveIcon from '../assets/pokemon_move_types/electric_move_icon.png'
import fightingMoveIcon from '../assets/pokemon_move_types/fighting_move_icon.png'
import fireMoveIcon from '../assets/pokemon_move_types/fire_move_icon.png'
import flyingMoveIcon from '../assets/pokemon_move_types/flying_move_icon.png'
import ghostMoveIcon from '../assets/pokemon_move_types/ghost_move_icon.png'
import grassMoveIcon from '../assets/pokemon_move_types/grass_move_icon.png'
import groundMoveIcon from '../assets/pokemon_move_types/ground_move_icon.png'
import iceMoveIcon from '../assets/pokemon_move_types/ice_move_icon.png'
import normalMoveIcon from '../assets/pokemon_move_types/normal_move_icon.png'
import poisonMoveIcon from '../assets/pokemon_move_types/poison_move_icon.png'
import psychicMoveIcon from '../assets/pokemon_move_types/psychic_move_icon.png'
import rockMoveIcon from '../assets/pokemon_move_types/rock_move_icon.png'
import steelMoveIcon from '../assets/pokemon_move_types/steel_move_icon.png'
import waterMoveIcon from '../assets/pokemon_move_types/water_move_icon.png'

export type Move = {
  name: string
  type: string
}

export type Pokemon = {
  name: string
  types: string[]
  abilities: string[]
  moves: Move[]
  sprites: string
}

export const getTypeColor = (type: string): { bg: string; border: string } => {
  const typeColors = {
    bug: { bg: 'bg-lime-600', border: 'border-lime-600' },
    dark: { bg: 'bg-gray-800', border: 'border-gray-800' },
    dragon: { bg: 'bg-cyan-700', border: 'border-cyan-700' },
    electric: { bg: 'bg-yellow-500', border: 'border-yellow-500' },
    fairy: { bg: 'bg-pink-500', border: 'border-pink-500' },
    fighting: { bg: 'bg-orange-700', border: 'border-orange-700' },
    fire: { bg: 'bg-red-600', border: 'border-red-600' },
    flying: { bg: 'bg-sky-500', border: 'border-sky-500' },
    ghost: { bg: 'bg-violet-900', border: 'border-violet-900' },
    grass: { bg: 'bg-green-600', border: 'border-green-600' },
    ground: { bg: 'bg-amber-500', border: 'border-amber-500' },
    ice: { bg: 'bg-cyan-500', border: 'border-cyan-500' },
    normal: { bg: 'bg-gray-700', border: 'border-gray-700' },
    poison: { bg: 'bg-purple-600', border: 'border-purple-600' },
    psychic: { bg: 'bg-pink-500', border: 'border-pink-500' },
    rock: { bg: 'bg-amber-700', border: 'border-amber-700' },
    steel: { bg: 'bg-sky-700', border: 'border-sky-700' },
    water: { bg: 'bg-blue-600', border: 'border-blue-600' }
  }

  return typeColors[type.toLowerCase()] || { bg: 'bg-gray-700', border: 'border-gray-700' }
}

// Map type names to their corresponding icons
export const getTypeIcons = (): { [key: string]: string } => {
  return {
    bug: bugIcon,
    dark: darkIcon,
    dragon: dragonIcon,
    electric: electricIcon,
    fighting: fightingIcon,
    fire: fireIcon,
    flying: flyingIcon,
    ghost: ghostIcon,
    grass: grassIcon,
    ground: groundIcon,
    ice: iceIcon,
    normal: normalIcon,
    poison: poisonIcon,
    psychic: psychicIcon,
    rock: rockIcon,
    steel: steelIcon,
    water: waterIcon
  }
}

export const getMoveTypeIcon = (): { [key: string]: string } => {
  return {
    bug: bugMoveIcon,
    dark: darkMoveIcon,
    dragon: dragonMoveIcon,
    electric: electricMoveIcon,
    fighting: fightingMoveIcon,
    fire: fireMoveIcon,
    flying: flyingMoveIcon,
    ghost: ghostMoveIcon,
    grass: grassMoveIcon,
    ground: groundMoveIcon,
    ice: iceMoveIcon,
    normal: normalMoveIcon,
    poison: poisonMoveIcon,
    psychic: psychicMoveIcon,
    rock: rockMoveIcon,
    steel: steelMoveIcon,
    water: waterMoveIcon
  }
}

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const formatMoveName = (move: Move | string): string => {
  // Handle both the new Move type and the old string type
  const moveName = typeof move === 'string' ? move : move.name
  return moveName.split('-').map(capitalizeFirstLetter).join(' ')
}
