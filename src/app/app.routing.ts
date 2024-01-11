import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./shared/views/login/login.component";
import { SignUpComponent } from "./shared/views/sign-up/sign-up.component";
import { HomeComponent } from "./shared/views/home/home.component";
import { NavbarComponent } from "./shared/views/navbar/navbar.component";

//array de configuracion de rutas
const appRoutes: Routes = [
    {path: 'Login', component: LoginComponent},
    {path: 'SignUp', component: SignUpComponent},
    {path: 'Home', component: HomeComponent},
    {path: 'Navbar', component: NavbarComponent},
];

//Exportar el modulo del router
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders <any> = RouterModule.forRoot(appRoutes);