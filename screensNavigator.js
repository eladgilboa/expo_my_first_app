import {TabNavigator, StackNavigator} from 'react-navigation';
import styleVariables from './style/styleVariables'

import FormPlayer     from './container/FormPlayer.js';
import FormMatch      from './container/FormMatch';
import MatchView      from './container/MatchView'
import AllPlayersList from './container/AllPlayersList';
import PlayerView     from './container/PlayerView';
import MatchesHistoryList from './container/MatchesHistory/List';
import MatchesHistorySingle from './container/MatchesHistory/Single';

const stackOptions = {
  headerMode: 'float',
  cardStyle : {
    backgroundColor:styleVariables.darkblue,
  },
  navigationOptions: {
    headerStyle: {
      backgroundColor : styleVariables.nivel2,
      //borderColor: styleVariables.lineColor,
      borderBottomWidth:1,
    },
    headerTintColor: styleVariables.primeYellow,
    headerTitleStyle: {
      fontWeight: '100',
      fontFamily:styleVariables.font_light,
    }
  }
}
const FormMatchStack = StackNavigator(
    {
      form : { screen : FormMatch },
      matchView  : { screen : MatchView },
    },
    stackOptions
);

const PlayersStack = StackNavigator(
  {
    list : { screen : AllPlayersList },
    PlayerView  : { screen : PlayerView  },
    form : { screen : FormPlayer }
  },
  stackOptions
);

const MatchesStack = StackNavigator(
  {
    list : { screen : MatchesHistoryList },
    single  : { screen : MatchesHistorySingle },
  },
  stackOptions
);

const MainScreenNavigator = TabNavigator({
  FormMatch   : { screen : FormMatchStack   },
  MatchesHistory  : { screen : MatchesStack  },
  PlayersList : { screen : PlayersStack },
},{
  tabBarOptions: {
    style: {
      backgroundColor : styleVariables.darkblue,
    },
    indicatorStyle: {
      backgroundColor: styleVariables.primeBlue,
    },
    activeTintColor : styleVariables.primeBlue,
    inactiveTintColor : styleVariables.primeYellow,
    showIcon : true,
    showLabel : false
  },
});

export default MainScreenNavigator;