<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{lang}', function () {
    return view('home');
});
Route::get('/', function () {
    return view('home');
});

Route::get('{lang}/personales/', function () {
    return view('home');
});
Route::get('{lang}/habilidades/', function () {
    return view('home');
});
Route::get('{lang}/formacion/', function () {
    return view('home');
});
Route::get('{lang}/experiencia/', function () {
    return view('home');
});
