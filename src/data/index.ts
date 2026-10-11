import type { Category } from '../game'
import animals from './animals.json'
import brands from './brands.json'
import celebrities from './celebrities.json'
import characters from './characters.json'
import cities from './cities.json'
import clothes from './clothes.json'
import countries from './countries.json'
import food from './food.json'
import fruits from './fruits.json'
import jobs from './jobs.json'
import landmarks from './landmarks.json'
import moviesTv from './movies-tv.json'
import musicians from './musicians.json'
import objects from './objects.json'
import places from './places.json'
import songs from './songs.json'
import sports from './sports.json'

export const categories: Category[] = [
  // Pop culture
  musicians,
  celebrities,
  songs,
  moviesTv,
  characters,
  brands,
  // World
  countries,
  cities,
  landmarks,
  // Everyday
  food,
  fruits,
  animals,
  jobs,
  places,
  objects,
  sports,
  clothes,
]
