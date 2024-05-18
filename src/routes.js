import SignIn from "layouts/authentication/sign-in";
import Icon from "@mui/material/Icon";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BankAccounts from "layouts/bankAccounts";
import CompaniesRecommandations from "layouts/companiesRecommandations/companiesRecommandations";
import Users from "layouts/users";
import Companies from "layouts/companies";
import Feedbacks from "layouts/feedbacks";



  

const routes = [
  { 
    type: "collapse",
    name: "Manage Users",
    key: "Users",
    icon: <AccountBalanceWalletIcon>compte</AccountBalanceWalletIcon>,
    route: "users",
   component: <Users/>,
   isPrivate: true,
  },
  
  { 
    type: "collapse",
    name: "Manage Companies",
    key: "Companies",
    icon: <AccountBalanceWalletIcon>compte</AccountBalanceWalletIcon>,
    route: "companies",
   component: <Companies/>,
   isPrivate: true,
  },

  { 
  type: "collapse",
  name: "Manage BankAccounts",
  key: "BankAccounts",
  icon: <AccountBalanceWalletIcon>compte</AccountBalanceWalletIcon>,
  route: "bankAccounts",
 component: <BankAccounts/>,
 isPrivate: true,
},

{ 
  type: "collapse",
  name: "Manage Feedbacks",
  key: "Feedbacks",
  icon: <AccountBalanceWalletIcon>compte</AccountBalanceWalletIcon>,
  route: "feedbacks",
 component: <Feedbacks/>,
 isPrivate: true,
},

{
  type: "collapse",
  name: "Recommandations",
  key: "Recommandations",
  icon: <Icon fontSize="small">receipt_long</Icon>,
  route: "recommandations",
  component: <CompaniesRecommandations/>,
  isPrivate: true,
  },
  
{
  type: "collapse",
  name: "logout",
  key: "logout",
  icon: <Icon fontSize="small">login</Icon>,
  route: "/authentication/sign-in",
  component: <SignIn />,
  isPrivate: false,
},

  
   
];

export default routes;
