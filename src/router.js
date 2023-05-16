import React from 'react'
import { Router, Scene, ActionConst, Actions } from 'react-native-router-flux'
import HomePage from './pages/homepage'
import Loading from './pages/loadinpage'
import UserLogin from './pages/user_login'
import VisitorType from './pages/visitortype_page'
import VisitorInfo from './pages/visitor_info_page'
import LegalTerm from './pages/legalterm_page'
import PolicyPage from './pages/policy_page'
import UserModal from './pages/user_login/user_modal'
import CameraPage from './pages/camera_page'
import LastPage from './pages/last_page'
import PairPage from './pages/pair_page'
import Deneme from './pages/deneme'
import SplashPage from './pages/splash_page'
import PhoneAndEmailPage from './pages/phone_and_email_page'
import HesMainPage from './pages/hes_page/hes_main_page'
import HesResultPage from './pages/hes_page/hes_result_page'
import HesCameraPage from './pages/hes_page/hes_camera_page'


const Routes = () => (
   <Router>
      <Scene key="root">
         <Scene key="homePage" component={HomePage} onEnter={() => Actions.refresh({ 'key': Math.random() })} title="" type={ActionConst.REPLACE} hideNavBar={true} />
         <Scene key="loadingPage" component={Loading} type={ActionConst.REPLACE} title="" hideNavBar={true} />
         <Scene key="splashpage" component={SplashPage} type={ActionConst.REPLACE} title="" initial={true} hideNavBar={true} />
         <Scene key="userLogin" component={UserLogin} onEnter={() => UserLogin.onEnter()} onExit={() => UserLogin.onExit()} title="" hideNavBar={true} />
         <Scene key="visitorType" component={VisitorType} onEnter={() => VisitorType.onEnter()} onExit={() => VisitorType.onExit()} title="" hideNavBar={true} />
         <Scene key="visitorInfo" component={VisitorInfo} onEnter={() => VisitorInfo.onStaticEnter()} onExit={() => VisitorInfo.onStaticExit()} title="" hideNavBar={true} />
         <Scene key="legalTerm" component={LegalTerm} onEnter={() => LegalTerm.onEnter()} onExit={() => LegalTerm.onExit()} title="" hideNavBar={true} />
         <Scene key="policypage" component={PolicyPage} title="" hideNavBar={true} />
         <Scene key="userModal" component={UserModal} title="" hideNavBar={true} />
         <Scene key="camera" component={CameraPage} onEnter={() => CameraPage.onEnter()} onExit={() => CameraPage.onExit()} title="" hideNavBar={true} />
         <Scene key="lastPage" component={LastPage} title="" hideNavBar={true} />
         <Scene key="hesMainPage" component={HesMainPage} title="" hideNavBar={true} />
         <Scene key="hesResultPage" component={HesResultPage} title="" hideNavBar={true} />
         <Scene key="hesCameraPage" component={HesCameraPage} title="" hideNavBar={true} />
         {/* <Scene key="deneme" component={Deneme} title="" hideNavBar={true} /> */}
         {/* <Scene key="pairPage" component={PairPage} title="" hideNavBar={true} type={ActionConst.RESET} /> */}
         <Scene key="pairPage" component={PairPage} title="" hideNavBar={true} type={ActionConst.RESET} />
         <Scene key="phoneAndEmailPage" component={PhoneAndEmailPage} onEnter={() => PhoneAndEmailPage.onEnter()} onExit={() => PhoneAndEmailPage.onExit()} title="" hideNavBar={true} />
      </Scene>
   </Router>
)

export default Routes
