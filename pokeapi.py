import requests
import json

def fetch_pokemon_generation(pokemon_species_url):
    # Fetching the species data to determine the generation
    response = requests.get(pokemon_species_url)
    species_data = response.json()

    # Returning the generation of the Pokémon species
    generation = species_data['generation']['name']
    return generation

def fetch_pokemon_data(pokemon_url):
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
    pokemon_info = {
        "name": data['name'],
        "types": [t['type']['name'] for t in data['types']],  # List of types
        "abilities": [a['ability']['name'] for a in data['abilities']],  # List of abilities
        "moves": [m['move']['name'] for m in data['moves']],  # List of moves
        "sprites": data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']  # Sprites URL
    }

    return pokemon_info

def fetch_all_pokemon_data():
    url = "https://pokeapi.co/api/v2/pokemon?limit=1000"  # Fetching the first 1000 Pokémon
    all_pokemon_data = []

    while url:
        response = requests.get(url)
        data = response.json()

        # Collecting data for each Pokémon, but only if they have sprite data from Gen 5 or earlier
        for pokemon in data['results']:
            pokemon_data = fetch_pokemon_data(pokemon['url'])
            if pokemon_data and pokemon_data['sprites'] is not None:  # Only append if there's sprite data for this Pokémon
                all_pokemon_data.append(pokemon_data)

        # Handling pagination
        url = data['next']

    return all_pokemon_data

def save_to_json(data, filename="pokemon_data.json"):
    with open(filename, 'w') as json_file:
        json.dump(data, json_file, indent=4)

def main():
    pokemon_data = fetch_all_pokemon_data()
    save_to_json(pokemon_data)
    print("Pokemon data has been saved to 'pokemon_data.json'.")

if __name__ == "__main__":
    main()
