const { names, roles, hp } = require('./ow.json')

console.log('Hey Sharon')

const getHeroes = () => names.map((e,i) => ({name: e, role: roles[i], hp: hp[i]}));

console.log(getHeroes());

const groupBy = (heroes, soryBy = 'role') => heroes.reduce((acc, val) => ({...acc, [val[soryBy]]: acc[val[soryBy]] ? [...acc[val[soryBy]], val] : [val]}) ,{});

console.log(groupBy(getHeroes()));
console.log(groupBy(getHeroes(), 'name'));
console.log(groupBy(getHeroes(), 'hp'));

const getByRoles = (heroes, ...roles) => heroes.filter((hero) => roles.includes(hero['role']));

console.log(getByRoles(getHeroes()))
console.log(getByRoles(getHeroes(), 'Support'))
console.log(getByRoles(getHeroes(), 'Support', 'Offense'))

const makeHeroesNice = (heroes) =>  heroes.map(hero =>({...hero, sayHello: () => console.log(`Hi! My name is ${hero.name}`)}));

const niceHeroes = makeHeroesNice(getHeroes());
niceHeroes[0].sayHello();
niceHeroes[1].sayHello();
niceHeroes[5].sayHello();






