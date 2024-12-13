import { useState, useMemo } from 'react'

import { Button } from '@renderer/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'

import { Skeleton } from '../ui/skeleton'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@renderer/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import {
  Pokemon,
  getTypeColor,
  capitalizeFirstLetter,
  formatMoveName
} from '@renderer/utils/pokemonUtils'

import pokemonData from '../../data/pokemon_data.json'

import bugIcon from '../../assets/pokemon_types/bug_icon.png'
import darkIcon from '../../assets/pokemon_types/dark_icon.png'
import dragonIcon from '../../assets/pokemon_types/dragon_icon.png'
import electricIcon from '../../assets/pokemon_types/electric_icon.png'
import fairyIcon from '../../assets/pokemon_types/fairy_icon.png'
import fightingIcon from '../../assets/pokemon_types/fighting_icon.png'
import fireIcon from '../../assets/pokemon_types/fire_icon.png'
import flyingIcon from '../../assets/pokemon_types/flying_icon.png'
import ghostIcon from '../../assets/pokemon_types/ghost_icon.png'
import grassIcon from '../../assets/pokemon_types/grass_icon.png'
import groundIcon from '../../assets/pokemon_types/ground_icon.png'
import iceIcon from '../../assets/pokemon_types/ice_icon.png'
import normalIcon from '../../assets/pokemon_types/normal_icon.png'
import poisonIcon from '../../assets/pokemon_types/poison_icon.png'
import psychicIcon from '../../assets/pokemon_types/psychic_icon.png'
import rockIcon from '../../assets/pokemon_types/rock_icon.png'
import steelIcon from '../../assets/pokemon_types/steel_icon.png'
import waterIcon from '../../assets/pokemon_types/water_icon.png'

function PokemonCard(): JSX.Element {
  // Map type names to their corresponding icons
  const typeIcons: { [key: string]: string } = {
    bug: bugIcon,
    dark: darkIcon,
    dragon: dragonIcon,
    electric: electricIcon,
    fairy: fairyIcon,
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
      {Array.from({ length: 6 }).map((_, index) => {
        const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
        const [openPokemon, setOpenPokemon] = useState(false)
        const [selectedMoves, setSelectedMoves] = useState<string[]>(Array(4).fill(''))
        const [openMoves, setOpenMoves] = useState<boolean[]>(Array(4).fill(false))

        const handleMoveSelect = (moveIndex: number, move: string): void => {
          setSelectedMoves((prev) => {
            const newMoves = [...prev]
            newMoves[moveIndex] = move
            return newMoves
          })
          setOpenMoves((prev) => {
            const newOpen = [...prev]
            newOpen[moveIndex] = false
            return newOpen
          })
        }

        return (
          <Card key={index} className="shadow-lg flex flex-col relative">
            <div className="absolute -top-3 left-5 flex gap-1 z-10">
              {selectedPokemon?.types.map((type, index) => (
                <img
                  key={index}
                  src={typeIcons[type] || ''}
                  alt={`${type} icon`}
                  className="w-6 h-6"
                />
              ))}
            </div>
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <CardTitle className="text-xl font-semibold mb-2">
                    <Popover open={openPokemon} onOpenChange={setOpenPokemon}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[150px] justify-start">
                          {selectedPokemon
                            ? capitalizeFirstLetter(selectedPokemon.name)
                            : 'Select Pokémon'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search Pokémon..." className="h-9" />
                          <CommandList>
                            <CommandEmpty>No Pokémon found.</CommandEmpty>
                            <CommandGroup>
                              {pokemonData.map((pokemon) => (
                                <CommandItem
                                  key={pokemon.name}
                                  onSelect={() => {
                                    setSelectedPokemon(pokemon)
                                    setOpenPokemon(false)
                                    setSelectedMoves(Array(4).fill(''))
                                  }}
                                >
                                  {capitalizeFirstLetter(pokemon.name)}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </CardTitle>
                  <CardDescription className="text-lg  mb-4 select-none">
                    {selectedPokemon ? (
                      <div className="flex flex-wrap gap-1">
                        {selectedPokemon.types.map((type, index) => (
                          <Button
                            key={index}
                            className={`${getTypeColor(type)} disabled:opacity-100 select-none w-20 h-6`}
                            disabled
                          >
                            {capitalizeFirstLetter(type)}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      'Select a Pokémon to view its details'
                    )}
                  </CardDescription>
                </div>
                {selectedPokemon ? (
                  <img src={selectedPokemon.sprites} alt="Pokemon Sprite" />
                ) : (
                  <Skeleton className="h-[125px] w-[250px] bg-gray-300" />
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end p-4">
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, moveIndex) => (
                  <Popover
                    key={moveIndex}
                    open={openMoves[moveIndex]}
                    onOpenChange={(open) => {
                      setOpenMoves((prev) => {
                        const newOpen = [...prev]
                        newOpen[moveIndex] = open
                        return newOpen
                      })
                    }}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        className={`${
                          selectedMoves[moveIndex]
                            ? 'bg-gradient-to-r from-gray-600 to-gray-800 hover:bg-gradient-to-r'
                            : 'bg-gray-500'
                        } disabled:opacity-100 select-none`}
                        disabled={!selectedPokemon}
                      >
                        {selectedMoves[moveIndex]
                          ? formatMoveName(selectedMoves[moveIndex])
                          : `Move ${moveIndex + 1}`}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search moves..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>No moves found.</CommandEmpty>
                          <CommandGroup>
                            {selectedPokemon?.moves
                              .filter((move) => !selectedMoves.includes(move))
                              .map((move) => (
                                <CommandItem
                                  key={move}
                                  onSelect={() => handleMoveSelect(moveIndex, move)}
                                >
                                  {formatMoveName(move)}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default PokemonCard
