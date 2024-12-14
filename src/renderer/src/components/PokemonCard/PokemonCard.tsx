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
  Move,
  Pokemon,
  getTypeColor,
  capitalizeFirstLetter,
  formatMoveName,
  getTypeIcons,
  getMoveTypeIcon
} from '@renderer/utils/pokemonUtils'

import pokemonData from '../../data/pokemon_data.json'

function PokemonCard(): JSX.Element {
  // Call the function to get the type icons
  const typeIcons = getTypeIcons()
  const moveTypeIcons = getMoveTypeIcon()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
      {Array.from({ length: 6 }).map((_, index) => {
        const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
        const [openPokemon, setOpenPokemon] = useState(false)
        const [selectedMoves, setSelectedMoves] = useState<Move[]>(Array(4).fill(''))
        const [openMoves, setOpenMoves] = useState<boolean[]>(Array(4).fill(false))

        const handleMoveSelect = (moveIndex: number, move: Move): void => {
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
          <Card
            key={index}
            className="shadow-lg flex flex-col relative bg-white border border-gray-200 rounded-lg"
          >
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
                              {(pokemonData as Pokemon[]).map((pokemon: Pokemon) => (
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
                            className={`${getTypeColor(type).bg} disabled:opacity-100 select-none w-20 h-6`}
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
                            ? `bg-gray-600 border-4 ${getTypeColor(selectedMoves[moveIndex].type).border} hover:${getTypeColor(selectedMoves[moveIndex].type).bg} hover:brightness-110`
                            : 'bg-gray-500'
                        } disabled:opacity-100 select-none`}
                        disabled={!selectedPokemon}
                      >
                        {selectedMoves[moveIndex] ? (
                          <div className="flex items-center gap-2">
                            <span>{formatMoveName(selectedMoves[moveIndex].name)}</span>
                            <img
                              src={moveTypeIcons[selectedMoves[moveIndex].type]}
                              alt={`${selectedMoves[moveIndex].type} icon`}
                            />
                          </div>
                        ) : (
                          `Move ${moveIndex + 1}`
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search moves..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>No moves found.</CommandEmpty>
                          <CommandGroup>
                            {selectedPokemon?.moves
                              .filter(
                                (move) =>
                                  !selectedMoves.some(
                                    (selectedMove) =>
                                      selectedMove && selectedMove.name === move.name
                                  )
                              )
                              .map((move) => (
                                <CommandItem
                                  key={move.name}
                                  onSelect={() => handleMoveSelect(moveIndex, move)}
                                >
                                  {formatMoveName(move.name)}
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
