import requests
import json

# Fetch all move types at once and store them in a dictionary
def fetch_all_move_types(start_id=1, end_id=559): # 559 is the last move ID for Gen 5
    move_types = {}
    allowed_generations = {'generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v'}

    for i in range(start_id, end_id + 1):
        move_url = f"https://pokeapi.co/api/v2/move/{i}/"
        print(f"Fetching move type for {move_url}")
        response = requests.get(move_url)
        move_data = response.json()

        # Check if the move is from Generations 1 to 5
        generation = move_data['generation']['name']
        if generation in allowed_generations:
            # Store move name and type in the dictionary
            move_name = move_data['name']
            move_type = move_data['type']['name']
            move_types[move_name] = move_type
            print(f"Added move: {move_name}, type: {move_type}, generation: {generation}")
        else:
            print(f"Skipped move: {move_data['name']} (generation: {generation})")

    return move_types

def fetch_pokemon_generation(pokemon_species_url):
    # Fetching the species data to determine the generation
    response = requests.get(pokemon_species_url)
    species_data = response.json()

    # Returning the generation of the Pokémon species
    generation = species_data['generation']['name']
    return generation

def fetch_pokemon_data(pokemon_url, move_types):
    # Fetching detailed data for a specific Pokémon
    response = requests.get(pokemon_url)
    data = response.json()

    # Fetch the generation of this Pokémon
    generation = fetch_pokemon_generation(data['species']['url'])

    # Only process Pokémon from generation 5 or earlier
    if generation not in ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v']:
        return None  # Skip Pokémon from later generations

    # Check if the Pokémon has sprite data
    if 'generation-v' not in data['sprites']['versions']:
        return None  # Skip if no sprite data exists for Gen 5 or earlier

    # Extracting relevant details for Pokémon from Gen 5 or earlier
    moves_with_types = []
    for move in data['moves']:
        move_name = move['move']['name']
        move_type = move_types.get(move_name, "unknown")  # Use pre-fetched move types
        if move_type != "unknown":  # Filter out unknown moves
            moves_with_types.append({"name": move_name, "type": move_type})
    
    # Creating a dictionary with the extracted information
    pokemon_info = {
        "name": data['name'],
        "types": [t['type']['name'] for t in data['types']],  # List of types
        "abilities": [a['ability']['name'] for a in data['abilities']],  # List of abilities
        "moves": moves_with_types,  # List of moves with types
        "sprites": data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']  # Sprites URL
    }

    print(f"Added pokemon: {pokemon_info['name']}")

    return pokemon_info

def fetch_all_pokemon_data(move_types):
    url = "https://pokeapi.co/api/v2/pokemon?limit=1000"  # Fetching the first 1000 Pokémon
    all_pokemon_data = []

    while url:
        response = requests.get(url)
        data = response.json()

        # Collecting data for each Pokémon, but only if they have sprite data from Gen 5 or earlier
        for pokemon in data['results']:
            pokemon_data = fetch_pokemon_data(pokemon['url'], move_types)
            if pokemon_data and pokemon_data['sprites'] is not None:  # Only append if there's sprite data for this Pokémon
                all_pokemon_data.append(pokemon_data)
                if pokemon_data['name'] == 'keldeo-resolute':  # Stop at keldeo-resolute as it's the last one
                    return all_pokemon_data

        # Handling pagination
        url = data['next']

    return all_pokemon_data

def save_to_json(data, filename="pokemon_data.json"):
    with open(filename, 'w') as json_file:
        json.dump(data, json_file, indent=4)

def main():
    print("Fetching all move types...")
    move_types = fetch_all_move_types()  # Pre-fetch all move types
    print("Finished fetching move types. Fetching Pokémon data...")

    pokemon_data = fetch_all_pokemon_data(move_types)  # Pass move types to Pokémon fetcher
    save_to_json(pokemon_data)
    print("Pokemon data has been saved to 'pokemon_data.json'.")

if __name__ == "__main__":
    main()
