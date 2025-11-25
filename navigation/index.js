import { userAuthentication } from "../config/userAuthentication";
import HomeTabs from './HomeTabs';
import WelcomeStack from './WelcomeStack';

const RootNavigation = () => {
    const { user } = userAuthentication();

    return user ? <HomeTabs /> : <WelcomeStack />
}

export default RootNavigation;