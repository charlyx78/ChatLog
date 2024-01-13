import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./shared/views/login/login.component";
import { SignUpComponent } from "./shared/views/sign-up/sign-up.component";
import { HomeComponent } from "./shared/views/home/home.component";
import { NavbarComponent } from "./shared/views/navbar/navbar.component";
import { AccountComponent } from "./shared/views/account/account.component";
import { ChatComponent } from "./shared/views/chat/chat.component";

//array de configuracion de rutas
const appRoutes: Routes = [
    {path: 'Login', component: LoginComponent},
    {path: 'SignUp', component: SignUpComponent},
    {path: 'Home', component: HomeComponent , children: [
        {path: 'Account', component: AccountComponent},
        {path: 'Chat', component: ChatComponent}
    ]},
    {path: 'Account', component: AccountComponent}
];

//Exportar el modulo del router
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders <any> = RouterModule.forRoot(appRoutes);