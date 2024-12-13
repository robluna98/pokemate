import { Menubar, MenubarMenu, MenubarTrigger } from '@renderer/components/ui/menubar'
import eggIcon from '../../../../../resources/pokemonEgg.png'
import battleIcon from '../../../../../resources/pokemonBattle.png'

function AppBar(): JSX.Element {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <img src={battleIcon} className="mr-2 size-5" />
          Battle
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <img src={eggIcon} className="mr-2 size-5" />
          Breeding
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  )
}

export default AppBar
