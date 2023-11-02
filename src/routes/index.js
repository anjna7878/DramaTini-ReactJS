import React from "react";
import { Router, Switch, } from "react-router-dom";
import { history } from "../helpers";
import CustomRoute from "./RouteWrapper";
import ScrollToTop from "../components/elements/ScrollToTop"

import {
  HomePage,
  SignUpPage, SignInPage, ResetPasswordPage,
  DashBoardsPage, ProfilePage,
  SearchPage, SearchResultPage,
  BusinessDashBoardPage, CouponPage,
  TheaterDashBoardPage, TheaterEventCreatePage, TheaterEventsListPage,
  TiniFollowListPage,
  NotFound, LogOutPage,
} from "../pages/index";




const routes = [

  { path: "/home", component: HomePage },
  { path: "/sign-in", component: SignInPage, guard: 'public' },
  { path: "/sign-up", component: SignUpPage, guard: 'public' },
  { path: "/reset-password", component: ResetPasswordPage, guard: 'public' },
  { path: "/logout", component: LogOutPage, guard: 'private' },
  { path: "/search", component: SearchPage, guard: 'private' },
  { path: "/search-result", component: SearchResultPage, guard: 'private' },

  {
    path: "/dashboard", component: DashBoardsPage,
    routes: [
      { path: "/dashboard/profile", component: ProfilePage },

      { path: "/dashboard/business", component: BusinessDashBoardPage },
      { path: "/dashboard/coupons", component: CouponPage },

      { path: "/dashboard/theater", component: TheaterDashBoardPage },
      { path: "/dashboard/theater-events", component: TheaterEventsListPage },
      { path: "/dashboard/create-event", component: TheaterEventCreatePage },

      { path: "/dashboard/tini-follow-list", component: TiniFollowListPage },


      { path: "/", redirect: 'dashboard/profile', component: ProfilePage, },
    ]
  },
  { path: "/", component: HomePage },
  { path: "/*", component: NotFound },
];



function AppRouter({ props }) {
  return (
    <Router basename={process.env.REACT_APP_ROUTE_BASE_URL} history={history}>
      <ScrollToTop />
      <div>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter;

function RouteWithSubRoutes(route) {
  return (
    <CustomRoute
      path={route.path}
      authType={route.guard}
      redirect={route.redirect}
      render={props => (<route.component {...props} routes={route.routes} />)}
    />
  );
}
// function AppRouter({ props }) {
//   return (
//     <Router basename={process.env.REACT_APP_ROUTE_BASE_URL} history={history}>
//       <Switch>
//         <Route exact path="/" component={HomePage} isGuest />
//         <Route path="/home" component={HomePage} isGuest />
//         <Route path="/sign-in" component={SignInPage} isPublic />
//         <Route path="/reset-password" component={ResetPasswordPage} isPublic />
//         <Route path="/sign-up" component={SignUpPage} isPublic />
//         <Route path="/search" component={SearchPage} isPrivate />
//         <Route path="/search-result" component={SearchResultPage} isPrivate />
//         <Route path="/dashboard" component={DashBoardsPage} isPrivate />
//         <Route path="/logout" component={LogOutPage} isPrivate />
//         {/* <Redirect exact from="/" to="searchDashboard" /> */}
//         <Route component={NotFound} />
//       </Switch>
//     </Router>
//   )
// }
// export default AppRouter;
